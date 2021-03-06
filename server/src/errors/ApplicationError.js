const CONSTANTS_ERROR_MESSAGES = require('../CONSTANTS_ERROR_MESSAGES');

class ApplicationError extends Error{

  constructor (message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    if( message instanceof Error) this.message = message.message;
    else this.message = message || CONSTANTS_ERROR_MESSAGES.ApplicationError;

    this.code = status || 500;
  }


}

module.exports = ApplicationError;