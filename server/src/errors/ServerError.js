const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class ServerError extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.ServerError, 500);
  }
}

module.exports = ServerError;