const db = require('../../models/postgreModel');
const ServerError = require('../../errors/ServerError');

module.exports.createEvent = async (user,remind, name,date) => {
    const event = await db.Events.create(
        {
            user_id : user,
            name: name,
            date: date,
            remind: remind
        });
    return event.get({ plain: true });
};

module.exports.deleteEvent = async(data) =>{
    const deleteElement = await db.Events.destroy({
        where: {id: data},
        returning: true
    });
    if(deleteElement !==1)
        throw new ServerError(`problem with event delete`);
    return deleteElement;
};

module.exports.findAllUserEvents = async (data) => {
    return await db.Events.findAll(
        {
            where: {user_id:data},
            order: [['date', 'ASC']],
            raw: true,
        });
};

module.exports.findAllEvents =  async () => {
    return await db.Events.findAll(
        {
            raw: true,
        });
};

module.exports.findAllUsersEvents =  async (users) => {
    return await db.Events.findAll(
        {
            where:{
                user_id: users
            },
            raw: true,
        });
};