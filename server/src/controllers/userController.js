import { sendMessageToEmail } from '../utils/sendMessageToEmail';
import { generateTokens } from '../utils/generateTockens';

const TokenError = require('../errors/TokenError');
const transactionsQueries = require('./queries/transactionsQueries');
const contestQueries = require('./queries/contestQueries');
const commonQueries = require('./queries/commonQueries');

const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const bd = require('../models');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const uuid = require('uuid/v1');
const controller = require('../boot/configureSocketIO');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const Dinero = require('dinero.js');

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    await userQueries.passwordCompare(req.body.password, foundUser.password);
    const tokens = generateTokens(foundUser);
    await userQueries.updateUser({ accessToken: tokens.token, refreshToken: tokens.refreshToken }, foundUser.id);
    res.send(tokens);
  } catch (err) {
    next(err);
  }
};
module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
        {...req.body, password: req.hashPass} );
    const tokens = generateTokens(newUser);
    await userQueries.updateUser({ accessToken: tokens.token, refreshToken: tokens.refreshToken }, newUser.id);
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
    transaction = await bd.sequelize.transaction(
      { isolationLevel: bd.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await bd.Ratings.findAll({
      include: [
        {
          model: bd.Offers,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[ i ].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    await bankQueries.updateBankBalance({
        balance: bd.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${ req.body.number.replace(/ /g,
          '') }' AND "cvc"='${ req.body.cvc }' AND "expiry"='${ req.body.expiry }'
                THEN "balance"-${ req.body.price }
            WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }'
                THEN "balance"+${ req.body.price } END
        `),
      },
      {
        cardNumber: {
          [ bd.sequelize.Op.in ]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction);
    const orderId = uuid();
    const ratios = [];
    for (let i = 0; i<req.body.contests.length; i++ ){
      ratios[i]= 100/ req.body.contests.length;
    }
    const price = Dinero({amount:req.body.price*100}).allocate(ratios);
    req.body.contests.forEach((contest, index) => {
      const prize = price[index].getAmount() / 100;
      contests[index] = {...contest,
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await bd.Contests.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
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
    transaction = await bd.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: bd.sequelize.literal('balance - ' + req.body.sum) },
      req.tokenData.userId, transaction);
    await bankQueries.updateBankBalance({
        balance: bd.sequelize.literal(`CASE 
                WHEN "cardNumber"='${ req.body.number.replace(/ /g,
          '') }' AND "expiry"='${ req.body.expiry }' AND "cvc"='${ req.body.cvc }'
                    THEN "balance"+${ req.body.sum }
                WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }'
                    THEN "balance"-${ req.body.sum }
                 END
                `),
      },
      {
        cardNumber: {
          [ bd.sequelize.Op.in ]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction);
    await transactionsQueries.transactionCreation(
        {
          typeOperation: 'CONSUMPTION',
          sum: req.body.sum,
          userId: req.tokenData.userId,
        },
        {transaction: transaction});
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.recoverPassword = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    const accessToken = jwt.sign({
      userId: foundUser.id,
      hashPass: req.hashPass,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    const message = `<p>To complete update password click <a href="http://${
      req.hostname === 'localhost' ? req.hostname : req.ip 
    }:3000/recover/${accessToken}">here</a></p>`;
    sendMessageToEmail(message, req.body.email);
    res.send('ok');
  } catch (err) {
    next(err);
  }
};

module.exports.getTokens = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.tokenData.email });
    if (!foundUser.refreshToken === req.headers.authorization){
      next(new TokenError());
    }
    const tokens = generateTokens(foundUser);
    await userQueries.updateUser({ accessToken: tokens.token, refreshToken: tokens.refreshToken }, foundUser.id);
    res.send({...tokens,
              refresh: true});
  } catch (err) {
    next(err);
  }
};

module.exports.updatePass = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ id: req.tokenData.userId });
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
    if ( !req.tokenData.hashPass ) {
      next(new TokenError('absent password'))
    }
    const tokens = generateTokens(foundUser);
    await userQueries.updateUser({ password: req.tokenData.hashPass, accessToken: tokens.token, refreshToken: tokens.refreshToken }, req.tokenData.userId);
    res.send({...sendData, ...tokens, update: '1'});
  } catch (err) {
    next(new TokenError());
  }
};