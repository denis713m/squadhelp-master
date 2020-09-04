const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class BankDeclineError extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.BankDeclineError, 403);
  }
}

module.exports = BankDeclineError;