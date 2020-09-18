import { generateTokens } from '../utils/generateTockens';

const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require ('../controllers/queries/userQueries');
const sessionController = require ('../controllers/activeUsersController');


module.exports.checkAuth = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ id: req.tokenData.userId });
    if (!foundUser.accessToken === req.headers.authorization){
      next(new TokenError());
    }
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
    res.send(sendData);
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  const refreshToken = req.headers.authorization;
  if ( !refreshToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = jwt.verify(refreshToken, CONSTANTS.REFRESH_JWT_SECRET);
    next();
  } catch (err) {
    next(new TokenError());
  }
};


module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if ( !accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const sessionStillActive = sessionController.checkUserAtSessionCache(accessToken);
    if(sessionStillActive !== 'active') {
      const foundUser = await userQueries.findUserById(req.tokenData.userId );
      if (!foundUser.accessToken === req.headers.authorization){
        next(new TokenError());}
      if(sessionStillActive === 'notActive'){sessionController.updateLastRequest(foundUser.id);}
      else {
        sessionController.addUser(
          {id:foundUser.id, lastRequest: Date.now(), accessToken: foundUser.accessToken});

      }
    }
    next();
  } catch (err) {
    next(new TokenError());
  }
};