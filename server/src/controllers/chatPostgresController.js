const db = require('../models');
const ServerError = require('../errors/ServerError');

module.exports.addMessage = async (req, res, next) => {
    const participants = [req.tokenData.userId, req.body.recipient];
    participants.sort(
        (participant1, participant2) => participant1 - participant2);
    try {
        const [conver, created] = await db.Conversations.findOrCreate(
            {
                where: {
                        participant1: participants[0],
                        participant2: participants[1],
                    }
            });
        const message = await db.Messages.create(
            {
                conversation: conver.id,
                body: req.body.messageBody,
                sender: req.tokenData.userId,
        }
        );
        if ( !message) {
            new ServerError('server error on user creation');
        } else {
            console.log(message/*.get({ plain: true })*/);
        }
        next();
    } catch (err) {
        next(err);
    }
};


