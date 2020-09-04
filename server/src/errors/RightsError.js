const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class RightsError extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.RightsError, 423);
  }
}

module.exports = RightsError;