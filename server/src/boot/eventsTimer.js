import moment from 'moment';
const eventsQueries = require('../controllers/queries/eventsQueries');
const controller = require('./configureSocketIO');
const CONSTANTS = require('../constants');

const maxDelay = Math.pow(2,31)-1;
const timerStore = new Map();

module.exports.startTimer = async () => {
    const events = await eventsQueries.findAllEvents();
    events.forEach((event)=>
        {
            startTimer(event);
        }
    );
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


module.exports.startEventTimer = (event) =>
{
    startTimer(event);
};

const startTimer = (event) =>
{
    const now = moment();
    const timeToEventRemind = moment(event.date, 'YYYY-MM-DDTHH:mm').diff(now, 'd') - event.remind;
    const timerDelay = timeToEventRemind > 0 ? timeToEventRemind*24*60*60*1000 : 0;
    if (timerDelay > maxDelay) {
        timerStore.set(event.id, setTimeout(()=>{startTimer(event)}, maxDelay))
    }
    else {
        timerStore.set(event.id, setTimeout(()=>{
                                            controller.getNotificationController().emitOneEventRemind(event.user_id,
                                            CONSTANTS.EVENTS_REMIND_MESSAGE);
                                            }, timerDelay)
        )
    }
};

module.exports.deleteEventTimer = (eventId) =>
{
    clearInterval(timerStore.get(eventId));
    timerStore.delete(eventId);
};
