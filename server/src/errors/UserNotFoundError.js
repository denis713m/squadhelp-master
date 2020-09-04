const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class UserNotFoundError extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.UserNotFoundError, 404);
  }
}

module.exports = UserNotFoundError;