import moment from 'moment';
const eventsQueries = require('../controllers/queries/eventsQueries');
const controller = require('../boot/configureSocketIO');
const CONSTANTS = require('../constants');
const sessionController = require('../models/activeUsersController');

module.exports.startTimer = async () => {
    const timeToCheck = moment('12:00:10', 'HH:mm:ss').diff(moment());
    const firstCheck = timeToCheck > 0 ? timeToCheck : (24 * 60 * 60 * 1000 + timeToCheck);
    const eventsTimer = delay =>
        setTimeout(async () => {
            const activeUsers = sessionController.getActiveUsers();
            const events = await eventsQueries.findAllUsersEvents(activeUsers);
            const now = moment();
            const arrayRoomsId = [];
            events.forEach((event)=>
                {
                    if (moment(event.date, 'YYYY-MM-DDTHH:mm').diff(now, 'd') <= event.remind ) {
                        if(!arrayRoomsId.includes(event.user_id)) arrayRoomsId.push(event.user_id)
                    }
                }
            );
            controller.getNotificationController().emitEventRemind(arrayRoomsId,
                CONSTANTS.EVENTS_REMIND_MESSAGE);
            eventsTimer(24 * 60 * 60 * 1000);
        }, delay);

    eventsTimer(firstCheck);
};


module.exports.checkUserEvents = async (user) =>
{
    const events = await eventsQueries.findAllUserEvents(user);
    const now = moment();
    for(let i = 0; i< events.length; i++) {
        if ( moment(events[i].date, 'YYYY-MM-DDTHH:mm').diff(now, 'd') <= events[i].remind ) {
            controller.getNotificationController().emitEventRemind([user],
                CONSTANTS.EVENTS_REMIND_MESSAGE);
            return;
        }
    }
};


