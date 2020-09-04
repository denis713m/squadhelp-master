const ApplicationError = require('./ApplicationError');
const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class NotEnoughMoney extends ApplicationError{
  constructor (message) {
    super(message || CONSTANTS_ERROR_MESSAGES.NotEnoughMoney, 417);
  }
}

module.exports = NotEnoughMoney;

