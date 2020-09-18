const eventsQueries = require('./queries/eventsQueries');
const eventTimerController = require('../middlewares/eventsTimer');

module.exports.getUserEvents = async (req, res, next) => {
    try {
        const user = req.tokenData.userId;
        const events = await eventsQueries.findAllUserEvents(user);
        res.send(events);
    }
    catch (err) {
        next(err);
    }
};

module.exports.createEvent = async (req, res, next) => {
    try{
        const user = req.tokenData.userId;
        const name = req.body.name;
        const date = req.body.date;
        const remind = req.body.remind;
        const newEvent = await eventsQueries.createEvent(user,remind, name,date);
        eventTimerController.checkUserEvents(user);
        res.send(newEvent.id.toString());
    }
    catch(e){
       next(e)
    }
};

module.exports.deleteEvent = async (req, res, next) => {
    try{
        const event = req.body.id;
        const result = await eventsQueries.deleteEvent(event);
        res.send(JSON.stringify(result));
    }
    catch (e){
        next(e)
    }
};

