const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require ('../controllers/queries/userQueries');
const sessionController = require ('../boot/sessionStore');


module.exports.checkAuth = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUserById(req.tokenData.userId);
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
    next(err);
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
    next(new TokenError(err));
  }
};


module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if ( !accessToken) {
    next(new TokenError('need token'));
  }
  try {
    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const userId = req.tokenData.userId;
    const sessionStillActive = sessionController.checkUserAtSessionStore(accessToken, userId);
    if(!sessionStillActive){
      next(new TokenError('need authentication'));
    }
    sessionController.updateLastRequest(userId);
    next();
  } catch (err) {
    next(err);
  }
};