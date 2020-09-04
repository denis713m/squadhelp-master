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

module.exports.findUser = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction: transaction });
  if ( !result) {
    throw new NotFound(CONSTANTS_ERROR_MESSAGES.USER_DIDNT_FIND);
  } else {
    return result.get({ plain: true });
  }
};

module.exports.userCreation = async (data) => {
  const newUser = await bd.Users.create(data);
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

module.exports.findAllUser = async (predicate) => {
  const result = await bd.Users.findAll({ where: predicate, raw: true});
  if ( !result) {
    throw new NotFound(CONSTANTS_ERROR_MESSAGES.USER_DIDNT_FIND);
  } else {
    return result;
  }
};