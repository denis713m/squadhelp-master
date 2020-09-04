const eventsQueries = require('./queries/eventsQueries');

module.exports.getUserEvents = async (req, res, next) => {
    try {
        const events = await eventsQueries.findAllEvents({ user_id: req.tokenData.userId });
        res.send(events);
    }
    catch (err) {
        next(err);
    }
};

module.exports.createEvent = async (req, res, next) => {
    try{
        const newEvent = await eventsQueries.createEvent(
            {
                remind: req.body.remind,
                name: req.body.name,
                date: req.body.date,
                user_id: req.tokenData.userId,
            }
        );
        res.send(newEvent.id.toString());
    }
    catch(e){
       next(e)
    }
};

module.exports.deleteEvent = async (req, res, next) => {
    try{
        const result = await eventsQueries.deleteEvent({
                    user_id: req.tokenData.userId,
                    id : req.body.id
                });
        res.send(JSON.stringify(result));
    }
    catch (e){
        next(e)
    }
};

