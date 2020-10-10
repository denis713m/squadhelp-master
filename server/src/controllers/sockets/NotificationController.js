const WebSocket = require('./WebSocket');
const CONSTANTS = require('../../constants');

class NotificationController extends WebSocket{

  emitEntryCreated (target) {
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark (target) {
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus (target, message, contestId) {
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_CHANGE_OFFER_STATUS,
      { message, contestId });
  }

  emitEventRemind (target, message) {
    target.forEach(recipient => this.io.to(recipient).emit(CONSTANTS.NOTIFICATION_EVENT_REMINDER,
        { message }));

  }
  emitOneEventRemind (target, message) {
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_EVENT_REMINDER,
        { message });

  }
}

module.exports = NotificationController;