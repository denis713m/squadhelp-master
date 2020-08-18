import { generateTokens } from '../utils/generateTockens';

const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
import userQueries from '../controllers/queries/userQueries';

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
    if ( tokenData.hashPass ) {
      const accessToken = jwt.sign({
        firstName: foundUser.firstName,
        userId: foundUser.id,
        role: foundUser.role,
        lastName: foundUser.lastName,
        avatar: foundUser.avatar,
        displayName: foundUser.displayName,
        balance: foundUser.balance,
        email: foundUser.email,
        rating: foundUser.rating,
      }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
      await userQueries.updateUser({ password: tokenData.hashPass, accessToken: accessToken }, tokenData.userId);
      sendData.token = accessToken;
    }
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
    next();
  } catch (err) {
    next(new TokenError());
  }
};