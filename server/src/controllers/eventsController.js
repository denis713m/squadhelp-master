import ServerError from '../errors/ServerError';
const db = require('../models');

module.exports.getUserEvents = (req, res, next) => {
    db.Events.findAll(
        {
            where: {
                user_id: req.tokenData.userId
            },
        }
    )
        .then(events => {
            res.send(events);
        })
        .catch(err => {
            next(new ServerError());
        })
};

module.exports.createEvent = async (req, res, next) => {
    try{
        const newEvent = await db.Events.create({
            remind: req.body.remind,
            name: req.body.name,
            date: req.body.date,
            user_id: req.tokenData.userId,
        });
        if ( !newEvent) {
            new ServerError('server error on user creation');
        } else {
            res.send(newEvent.get({plain:true}).id.toString());
        }
    }
    catch(e){
       next(e)
    }
};

module.exports.deleteEvent = async (req, res, next) => {

    try{
        const result = await db.Events.destroy(
            {
                where:{
                    user_id: req.tokenData.userId,
                    id : req.body.id
                },
                returning: true
            })
        res.send(JSON.stringify(result));
    }
    catch (err){
        next(new ServerError())
    }
};

