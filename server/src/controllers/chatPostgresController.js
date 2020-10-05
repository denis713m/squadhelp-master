import moment from 'moment';

const controller = require('../boot/configureSocketIO');
const commonQueries = require('./queries/commonQueries');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
    let transaction;
    try {
        const participants = [req.tokenData.userId, req.body.recipient];
        let conversation={};
        if (req.body.conversation) conversation.id = req.body.conversation;
        else {
            transaction = await commonQueries.createTransaction();
            conversation = await chatQueries.createConversation(participants, transaction);
            await chatQueries.createUserInConversation(conversation.id,participants[0], transaction);
            await chatQueries.createUserInConversation(conversation.id,participants[1], transaction);
            transaction.commit();
        }
        const text = req.body.messageBody;
        const sender = req.tokenData.userId;
        const message = await chatQueries.createMessage( conversation.id, text, sender);
        const preview = {
            _id: conversation.id,
            sender: req.tokenData.userId,
            text: req.body.messageBody,
            createAt: message.createdAt,
            participants,
            status: 'unset',
            isBlocked: false,
        };
        if (req.body.conversation) {
            controller.getChatController().emitNewMessage(req.body.recipient, {
                message: message});}
        else{
            controller.getChatController().emitNewMessage(req.body.recipient, {
                message: message,
                preview: {
                    ...preview,
                    interlocutor: {
                        id: req.tokenData.userId,
                        firstName: req.tokenData.firstName,
                        lastName: req.tokenData.lastName,
                        displayName: req.tokenData.displayName,
                        avatar: req.tokenData.avatar,
                    },
                },
            });
        }

        res.send({message:{
                conversation: message.conversation,
                createdAt:message.createdAt
            }})
    } catch (err) {
        await transaction.rollback();
        next(err);
    }
};

module.exports.createCatalog = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const catalogName = req.body.catalogName;
        const chat = req.body.chatId;
        const catalog = await chatQueries.createCatalog(userId, catalogName, chat);
        console.log(catalog)
        res.send({_id: catalog._id});
    }
    catch (err) {
        next(err);
    }
};

module.exports.deleteCatalog = async (req, res, next) => {
    try {
        const idCatalogToDelete = req.body.catalogId;
        await chatQueries.deleteCatalog(idCatalogToDelete);
        res.end();
    } catch (err) {
        next(err);
    }
};

module.exports.renameCatalog = async (req, res, next) => {
    try {
        const newName = req.body.catalogName;
        const catalogToUpdate = req.body.catalogId;
        await chatQueries.renameCatalog(newName, catalogToUpdate);
        res.end();
    } catch (err) {
        next(err);
    }
};

module.exports.changeChatsInCatalog = async (req, res, next) => {
    try {
        const catalogIdToUpdate = req.body.catalogId;
        const catalogToChange = await chatQueries.findCatalog(catalogIdToUpdate);
        const chatToAddRemove = req.body.chatId;
        const newChats = [];
        if (req.isAddChat)  {
            newChats.push(...catalogToChange.chats, chatToAddRemove)}
            else {
            catalogToChange.chats.forEach(chat => {if (chat !== chatToAddRemove) newChats.push(chat)});
        }
        await chatQueries.changeChatsInCatalog(newChats, catalogIdToUpdate);
        res.end();
    } catch (err) {
        next(err);
    }
};


module.exports.getCatalogs = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const catalogs = await chatQueries.findAllUsersCatalog(userId);
        res.send(catalogs);
    }
    catch (err) {
        next(err);
    }
};


module.exports.getAllMessagesInConversation = async (req, res, next) => {
    try {
        const chat = req.body.chatId;
        const messages = await chatQueries.findAllMessagesInChat(chat);
        res.send(messages);
    } catch (err) {
        next(err);
    }
};

module.exports.getPreview = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const conversations = await chatQueries.findLastUserMessagesInConversations(userId);
        const result =[];
        if(conversations.length > 0)
        {
            const interlocutors = [];
            const sortConversationsByTime = _.orderBy(conversations, (o)=> moment(o.createdAt, 'YYYY-MM-DDTHH:mm:ss'), ['desc'])
            sortConversationsByTime.forEach(conversation => {
                        interlocutors.push(conversation.interlocutor)
                });
                const senders = await userQueries.findAllUser(interlocutors);
                sortConversationsByTime.forEach((conversation) => {
                senders.forEach(sender => {
                    if ( conversation.interlocutor === sender.id){
                        conversation.interlocutor = sender;}
                });
                result.push(conversation);
            });
        }
        res.send(result);
    } catch (err) {
        next(err);
    }
};

module.exports.changeChatStatus = async (req, res, next) => {
    try {
        const newStatus = req.body.status;
        const chatId = req.body.id;
        const userId = req.tokenData.userId;
        await chatQueries.changeChatStatus(newStatus, chatId, userId);
        res.end();
        if(!req.markChatFavorite){
            const message = {
                _id: chatId,
                newStatus: newStatus === 'block'};
            const interlocutorId = req.body.interlocutor;
            controller.getChatController().emitChangeBlockStatus(interlocutorId, message);
        }
    } catch (err) {
        next(err);
    }
};

module.exports.markChatStatusFavorite = async (req, res, next) =>{
    req.markChatFavorite = true;
    next();
};

module.exports.isAddChatToCatalog = async (req, res, next) =>{
    req.isAddChat = true;
    next();
};

