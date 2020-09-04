const db = require('../../models');
const ServerError = require('../../errors/ServerError');
const NotFound = require('../../errors/UserNotFoundError');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.createConversation = async (data) => {
    const [conversation] = await db.Conversations.findOrCreate(
        {
            where: {
                participant1: data[0],
                participant2: data[1],
            }
        });
    if (!conversation) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CONVERSATION_CREATE);
    }
    return conversation;
};

module.exports.createChatElementModel = async (modelName, data) => {
    const model = await db[modelName].create(data);
    if ( !model) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CREATE(modelName));
    }
    return model.get({ plain: true });
};

module.exports.updateChatElementModel = async (modelName, newData, where, transaction) => {
    const [updatedCount, [updatedRow]] = await db[modelName].update(
        newData,
        { where: where,
            returning: true,
            transaction
        });
    if (updatedCount !== 1) {
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_UPDATE(modelName));
    }
    return updatedRow.dataValues;
};

module.exports.findOneChatElementModel = async (modelName, where) => {
    const result = await db[modelName].findOne({where: where});
    if ( !result ) {
        new NotFound(CONSTANTS_ERROR_MESSAGES.CHAT_FIND);}
    return result;
};

module.exports.findAllChatElementModel = async (modelName, where, order, attributes) => {
    const result = await db[modelName].findAll(
        {
            where: where,
            order: order,
            attributes: attributes,
            raw: true,
        });
    if ( !result ) {
        new NotFound(CONSTANTS_ERROR_MESSAGES.CHAT_FIND);}
    return result;
};

module.exports.deleteCatalog = async(data) =>{
    const deleteCatalog = await db.Catalogs.destroy({
        where: data
    });
    if(deleteCatalog !==1)
        new ServerError(CONSTANTS_ERROR_MESSAGES.CHAT_CATALOG_DELETE);
};

module.exports.findAllDBElementWithAggregate = async (modelName, includes, where, order, attributes, limit, offset ) => {
    const include = [];
    includes.forEach(item => include.push({
        model: db[item.modelName],
        where: item.where,
        attributes: item.attributes,
    }));
    const result = await db[modelName].findAll(
        {
            include: include,
            where: where,
            order: order,
            attributes: attributes,
            limit: limit,
            offset: offset,
            raw: true,
        });
    if ( !result ) {
        throw new NotFound(CONSTANTS_ERROR_MESSAGES.CHAT_FIND);}
    return result;
};