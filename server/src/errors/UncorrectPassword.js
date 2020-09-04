const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class UncorrectPassword extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.UncorrectPassword, 406);
  }
}

module.exports = UncorrectPassword;

