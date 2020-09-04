const db = require('../../models');
const ServerError = require('../../errors/ServerError');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.createEvent = async (data) => {
    const event = await db.Events.create(data);
    if ( !event) {
        throw new ServerError(CONSTANTS_ERROR_MESSAGES.EVENT_CREATE);
    }
    return event.get({ plain: true });
};

module.exports.deleteEvent = async(data) =>{
    const deleteElement = await db.Events.destroy({
        where: data,
        returning: true
    });
    if(deleteElement !==1)
        throw new ServerError(CONSTANTS_ERROR_MESSAGES.EVENT_DELETE);
    return deleteElement;
};

module.exports.findAllEvents = async ( data) => {
    const result = await db.Events.findAll(
        {
            where: data,
            raw: true,
        });
    if ( !result ) {
        throw new ServerError(CONSTANTS_ERROR_MESSAGES.EVENT_FIND);}
    return result;
};