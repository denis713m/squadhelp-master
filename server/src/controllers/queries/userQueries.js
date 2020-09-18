const bd = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data,
    { where: { id: userId }, returning: true, transaction: transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_UPDATE);
  }
  return updatedUser.dataValues;
};

module.exports.updateUserPassword = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(
      { password: data.password, accessToken: data.accessToken, refreshToken: data.refreshToken },
      { where: { id: userId }, returning: true, transaction: transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_UPDATE);
  }
  return updatedUser.dataValues;
};

module.exports.updateUserRating = async (rating, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update({ rating: rating },
      { where: { id: userId }, returning: true, transaction: transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_UPDATE);
  }
  return updatedUser.dataValues;
};

module.exports.updateUserTokens = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(
      { accessToken: data.accessToken, refreshToken: data.refreshToken },
      { where: { id: userId }, returning: true, transaction: transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_UPDATE);
  }
  return updatedUser.dataValues;
};

module.exports.updateUserCashOut = async (sum, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(
      { balance: bd.sequelize.literal('balance - ' + sum) },
      { where: { id: userId }, returning: true, transaction: transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_UPDATE);
  }
  return updatedUser.dataValues;
};

module.exports.findUserByEmail = async (email, transaction) => {
  const result = await bd.Users.findOne({ where: { email: email }, transaction: transaction });
  if ( !result) {
    throw new NotFound(CONSTANTS_ERROR_MESSAGES.USER_DIDNT_FIND);
  } else {
    return result.get({ plain: true });
  }
};

module.exports.findUserById = async (userId) => {
  const result = await bd.Users.findOne({ where: { id: userId }});
  if ( !result) {
    throw new NotFound(CONSTANTS_ERROR_MESSAGES.USER_DIDNT_FIND);
  } else {
    return result.get({ plain: true });
  }
};


module.exports.userCreation = async (userData, password) => {
  const newUser = await bd.Users.create({...userData, password: password});
  if ( !newUser) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_CREATE);
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if ( !passwordCompare) {
    throw new NotFound(CONSTANTS_ERROR_MESSAGES.WRONG_PASSWORD);
  }
};

module.exports.findAllUser = async (users) => {
  const result = await bd.Users.findAll({ where: {id: users}, raw: true});
  if ( result.length === 0) {
    throw new NotFound(CONSTANTS_ERROR_MESSAGES.USERS_DIDNT_FIND);
  } else {
    return result;
  }
};

module.exports.updateUserBalance = async (prize, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(
      {balance: bd.sequelize.literal('balance + ' + prize)},
      { where: { id: userId }, returning: true, transaction: transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.USER_UPDATE);
  }
  return updatedUser.dataValues;
};
