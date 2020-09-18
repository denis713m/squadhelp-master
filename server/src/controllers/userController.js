import { sendMessageToEmail } from '../utils/sendMessageToEmail';
import { generateTokens, generateRecoverAccesToken } from '../utils/generateTockens';
import * as ipaddr from 'ipaddr.js';

const TokenError = require('../errors/TokenError');
const eventTimer = require('../middlewares/eventsTimer');
const transactionsQueries = require('./queries/transactionsQueries');
const contestQueries = require('./queries/contestQueries');
const commonQueries = require('./queries/commonQueries');

const CONSTANTS = require('../constants');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const uuid = require('uuid/v1');
const controller = require('../boot/configureSocketIO');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const Dinero = require('dinero.js');
const activeUsers = require('./activeUsersController');

module.exports.login = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const foundUser = await userQueries.findUserByEmail(userEmail);
    const enterPassword = req.body.password;
    await userQueries.passwordCompare(enterPassword, foundUser.password);
    const tokens = generateTokens(foundUser);
    await userQueries.updateUser({ accessToken: tokens.token, refreshToken: tokens.refreshToken }, foundUser.id);
    activeUsers.addUser({id:foundUser.id, lastRequest: Date.now(), accessToken: tokens.token});
    res.send(tokens);
  } catch (err) {
    next(err);
  }
};
module.exports.registration = async (req, res, next) => {
  try {
    const password = req.hashPass;
    const userData = {...req.body};
    const newUser = await userQueries.userCreation(userData, password);
    const tokens = generateTokens(newUser);
    await userQueries.updateUserTokens({ accessToken: tokens.token, refreshToken: tokens.refreshToken }, newUser.id);
    res.send(tokens);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery (offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () => ratingQueries.createRating({
    offerId,
    mark,
    userId,
  }, transaction);
  const getUpdateQuery = () => ratingQueries.updateRating({ mark },
    { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await commonQueries.createTransaction_READ_UNCOMMITTED();
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await ratingQueries.findRating( creatorId, transaction);
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[ i ].mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUserRating(avg, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await commonQueries.createTransaction();
    const cardFrom = {
        number:req.body.number.replace(/ /g,''),
        cvc:req.body.cvc,
        expiry: req.body.expiry};
    const cardTo = {
        number:CONSTANTS.SQUADHELP_BANK_NUMBER,
        cvc:CONSTANTS.SQUADHELP_BANK_CVC,
        expiry: CONSTANTS.SQUADHELP_BANK_EXPIRY};
    const transactionSum = req.body.price;
    const creatorId = req.tokenData.userId;
    await bankQueries.updateBankBalance(cardFrom,cardTo, transactionSum, transaction);
    const orderId = uuid();
    const ratios = [];
    for (let i = 0; i<req.body.contests.length; i++ ){
      ratios[i]= 100/ req.body.contests.length;
    }
    const price = Dinero({amount:transactionSum*100}).allocate(ratios);
    req.body.contests.forEach((contest, index, contests) => {
      const prize = price[index].getAmount() / 100;
      contests[index] = {...contest,
        status: index === 0 ? 'active' : 'pending',
        userId: creatorId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      };
    });
    await contestQueries.createContests(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(req.body,
      req.tokenData.userId);
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await commonQueries.createTransaction();
    const userId = req.tokenData.userId;
    const transactionSum = req.body.sum;
    const updatedUser = await userQueries.updateUserCashOut(transactionSum, userId, transaction);
    const cardFrom = {
      number:req.body.number.replace(/ /g,''),
      cvc:req.body.cvc,
      expiry: req.body.expiry};
    const cardTo = {
      number:CONSTANTS.SQUADHELP_BANK_NUMBER,
      cvc:CONSTANTS.SQUADHELP_BANK_CVC,
      expiry: CONSTANTS.SQUADHELP_BANK_EXPIRY};

    await bankQueries.updateBankBalance(cardFrom, cardTo, transactionSum, transaction);
    await transactionsQueries.transactionCreation( false, transactionSum, userId, transaction);
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.recoverPassword = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const foundUser = await userQueries.findUserByEmail(userEmail);
    const accessToken = generateRecoverAccesToken(foundUser.id, req.hashPass);
    const ip = ipaddr.process(req.ip).range();
    const message = CONSTANTS.LOST_PASS_MESSAGE(ip, accessToken);
    sendMessageToEmail(message, req.body.email);
    res.send('ok');
  } catch (err) {
    next(err);
  }
};

module.exports.getTokens = async (req, res, next) => {
  try {
    const userEmail = req.tokenData.email;
    const foundUser = await userQueries.findUserByEmail(userEmail);
    if (!foundUser.refreshToken === req.headers.authorization){
      next(new TokenError());
    }
    const tokens = generateTokens(foundUser);
    await userQueries.updateUserTokens({ accessToken: tokens.token, refreshToken: tokens.refreshToken }, foundUser.id);
    activeUsers.addUser({id:foundUser.id, lastRequest: Date.now(), accessToken: tokens.token});
    eventTimer.checkUserEvents(foundUser.id);
    res.send({...tokens,
              refresh: true});
  } catch (err) {
    next(err);
  }
};

module.exports.updatePass = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUserById(req.tokenData.userId );
    const sendData = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    };
    const newPassword = req.tokenData.hashPass;
    const userId = req.tokenData.userId;
    if ( !newPassword ) {
      next(new TokenError('absent password'))
    }
    const tokens = generateTokens(foundUser);
    await userQueries.updateUser({ password: req.tokenData.hashPass, accessToken: tokens.token, refreshToken: tokens.refreshToken }, userId);
    res.send({...sendData, ...tokens, update: '1'});
  } catch (err) {
    next(err);
  }
};