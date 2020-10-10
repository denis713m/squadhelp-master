const db = require('../../models/postgreModel');
const ServerError = require('../../errors/ServerError');
const NotFound = require('../../errors/UserNotFoundError');
const sequelize = require('sequelize');

const Op = sequelize.Op;

module.exports.createConversation = async (participants,transaction) => {
    const conversation = await db.Conversations.create(
        {
            participant1: participants[0],
            participant2: participants[1]
        }, {transaction: transaction});
    return conversation.get({ plain: true });
};


module.exports.createMessage = async (conversation, text, sender) => {
    const message = await db.Messages.create(
        {
            conversation: conversation,
            body: text,
            sender: sender
        });
    return message.get({ plain: true });
};

module.exports.createCatalog = async (userId, catalogName, chat) => {
    const catalog = await db.Catalogs.create({
        userId: userId,
        catalogName: catalogName,
        chats: [chat]
    });
    return catalog.get({ plain: true });
};

module.exports.renameCatalog = async (newName, catalogId, transaction) => {
    const [updatedCount,] = await db.Catalogs.update(
        {catalogName:newName},
        { where: {_id: catalogId},
            returning: true,
            transaction
        });
    if (updatedCount !== 1) {
        throw new ServerError('cannot update catalog');
    }
};

module.exports.changeChatsInCatalog = async (newData, catalogId) => {
    const [updatedCount] = await db.Catalogs.update(
        {chats: newData},
        { where: { _id: catalogId},
            returning: true,
        });
    if (updatedCount !== 1) {
        throw new ServerError('cannot update chats in catalog');
    }
};

module.exports.changeChatStatus = async (newStatus, chatId, userId) => {
    const [updatedCount] = await db.UserInConversation.update(
        {status: newStatus},
        { where:
                {
                    conversation: chatId,
                    userId: userId},
            returning: true,
        });
    if (updatedCount !== 1) {
        throw new ServerError('cannot update chat status');
    }
};

module.exports.findCatalog = async (catalogId) => {
    const catalog = await db.Catalogs.findOne({where: {_id: catalogId}});
    if ( !catalog ) {
         throw new NotFound('catalog is not exist');}
    return catalog.get({plain:true});
};

module.exports.findAllUsersCatalog = async (userId) => {
    return await db.Catalogs.findAll(
        {
            where: {userId: userId},
            attributes: ['_id', 'catalogName', 'chats'],
            raw: true,
        });
};

module.exports.deleteCatalog = async(data) =>{
    const deleteCatalog = await db.Catalogs.destroy({
        where: {
            _id: data}
    });
    if(deleteCatalog !==1)
        throw new ServerError('can not delete catalog');
};

module.exports.findAllMessagesInChat = async (chat) => {
    return await db.Messages.findAll(
        {
            where: {conversation: chat},
            order: [['createdAt', 'ASC']],
            raw: true,
        });
};

module.exports.findLastUserMessagesInConversations = async (userId ) => {
    const result =  await db.Messages.findAll(
        {
            include: [{
                model: db.Conversations,
                where: {
                    [Op.or]:{
                        participant1: userId,
                        participant2: userId}},
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                },
                include: [
                    {
                        model: db.UserInConversation,
                        where: {
                            userId: userId
                        },
                        attributes: ['status']
                    }
                ]
            },

            ],
            order: [['conversation', 'ASC'],['createdAt', 'DESC']],
            attributes: [sequelize.literal('DISTINCT ON("Messages"."conversation")  "Messages"."conversation"'),
            'body', 'sender', 'createdAt'],
            raw: true,
        });
    return allMessagesDataParse(result)
};

const allMessagesDataParse = (messages) => {
    messages.forEach((item) => {
        item.participants = [item['Conversation.participant1'], item['Conversation.participant2']];
        item.interlocutor =
            item['Conversation.UserInConversations.userId'] === item['Conversation.participant1'] ?
                item['Conversation.participant2']:
                item['Conversation.participant1'];
        delete item['Conversation.UserInConversations.userId'];
        delete item['Conversation.participant2'];
        delete item['Conversation.participant1'];
        item.status = item['Conversation.UserInConversations.status'];
        delete item['Conversation.UserInConversations.status'];
        item.text = item.body;
        delete item.body;
        item._id = item.conversation;
        delete item.conversation;
    });
    return messages
};


module.exports.createUserInConversation = async (conversation, userId, transaction) => {
    await db.UserInConversation.create(
        {
            conversation: conversation,
            userId: userId
        }, {transaction: transaction});
};