const db = require('../../models');
const ServerError = require('../../errors/ServerError');
const NotFound = require('../../errors/UserNotFoundError');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');
const sequelize = require('sequelize');

const Op = sequelize.Op;

module.exports.findOrCreateConversation = async (participantsHash, participants) => {
    const [conversation] = await db.Conversations.findOrCreate(
        {
            where: {
                participantsHash: participantsHash
            },
        defaults:{
            participant1: participants[0],
            participant2: participants[1],}
        });
    if (!conversation) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CONVERSATION_CREATE);
    }
    return conversation;
};

module.exports.createMessage = async (conversation, text, sender) => {
    const message = await db.Messages.create(
        {
            conversation: conversation,
            body: text,
            sender: sender});
    if ( !message) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CREATE('Message'));
    }
    return message.get({ plain: true });
};

module.exports.createCatalog = async (userId, catalogName, chat) => {
    const message = await db.Catalogs.create({
        userId: userId,
        catalogName: catalogName,
        chats: [chat]
    });
    if ( !message) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CREATE('Catalog'));
    }
    return message.get({ plain: true });
};

module.exports.updateCatalogName = async (newData, where, transaction) => {
    const [updatedCount, [updatedRow]] = await db.Catalogs.update(
        {catalogName:newData},
        { where: {_id: where},
            returning: true,
            transaction
        });
    if (updatedCount !== 1) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_UPDATE('Catalog'));
    }
    return updatedRow.dataValues;
};

module.exports.changeConversationsInCatalog = async (newData, catalogId) => {
    const [updatedCount, [updatedRow]] = await db.Catalogs.update(
        {chats: newData},
        { where: { _id: catalogId},
            returning: true,
        });
    if (updatedCount !== 1) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_UPDATE('Catalog'));
    }
    return updatedRow.dataValues;
};

module.exports.markChatFavoriteOrBlock = async (isFavorite, userIndexInConversation, participants, newStatus) => {
    const columnToChange = `${isFavorite ? 'favoriteList' : 'blackList'}${userIndexInConversation}`;
    const [updatedCount, [updatedRow]] = await db.Conversations.update(
        {[columnToChange]: newStatus},
        { where:
                {[Op.and]:[
                            {participant1: participants[0]},
                            {participant2: participants[1]}],},
            returning: true,
        });
    if (updatedCount !== 1) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_UPDATE('Conversation'));
    }
    return updatedRow.dataValues;
};

module.exports.findCatalog = async (catalogId) => {
    const catalog = await db.Catalogs.findOne({catalogId: {_id: catalogId}});
    if ( !catalog ) {
        new NotFound(CONSTANTS_ERROR_MESSAGES.CHAT_FIND);}
    return catalog;
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
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CATALOG_DELETE);
};

module.exports.findAllMessagesInChat = async (chat) => {
    return await db.Messages.findAll(
        {
            where: {conversation: chat},
            order: [['createdAt', 'ASC']],
            raw: true,
        });
};

module.exports.findAllUserMessages = async ( userId ) => {
    return await db.Messages.findAll(
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
            }],
            order: [['conversation', 'ASC'],['createdAt', 'DESC']],
            attributes: [sequelize.literal('DISTINCT ON(conversation) "body"'),
            'conversation', 'sender', 'createdAt'],
            raw: true,
        });
};