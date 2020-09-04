const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class TokenError extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.TokenError, 408);
  }
}

module.exports = TokenError;

