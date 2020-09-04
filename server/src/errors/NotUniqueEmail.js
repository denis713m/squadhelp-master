const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class NotUniqueEmail extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.NotUniqueEmail, 409);
  }
}

module.exports = NotUniqueEmail;