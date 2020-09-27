import moment from 'moment';

const controller = require('../boot/configureSocketIO');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
    try {
        const participants = [req.tokenData.userId, req.body.recipient];
        let conversation={};
        console.log(req.body.conversation)
        if (req.body.conversation) conversation.id = req.body.conversation;
        else conversation = await chatQueries.createConversation(participants);
        //const conversation = await chatQueries.findOrCreateConversation(/*participantsHash,*/ participants);
        const text = req.body.messageBody;
        const sender = req.tokenData.userId;
        const message = await chatQueries.createMessage( conversation.id, text, sender);
        //message.participants = [participants];
        message.convers = conversation.id;
        const preview = {
            _id: conversation.id,
            sender: req.tokenData.userId,
            text: req.body.messageBody,
            createAt: message.createdAt,
            participants,
            blackList: [false, false],
            favoriteList: [false, false],
            //interlocutor: req.body.interlocutor
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

        res.send({message/*, preview*/})
    } catch (err) {
        next(err);
    }
};

module.exports.createCatalog = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const catalogName = req.body.catalogName;
        const chat = req.body.chatId;
        const catalog = await chatQueries.createCatalog(userId, catalogName, chat);
        res.send(catalog);
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

module.exports.updateNameCatalog = async (req, res, next) => {
    try {
        const newName = req.body.catalogName;
        const catalogToUpdate = req.body.catalogId;
        const updatedCatalog = await chatQueries.updateCatalogName(
             newName, catalogToUpdate);
        res.send(updatedCatalog);
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
        await chatQueries.changeConversationsInCatalog(newChats, catalogIdToUpdate);
        res.end();
    } catch (err) {
        next(err);
    }
};


module.exports.getCatalogs = async (req, res, next) => {
    try {
        const userIdCatalogOwner = req.tokenData.userId;
        const catalogs = await chatQueries.findAllUsersCatalog(userIdCatalogOwner);
        res.send(catalogs);
    }
    catch (err) {
        next(err);
    }
};


module.exports.getChat = async (req, res, next) => {
    try {
        const chat = req.body.chatId;
         const messages = await chatQueries.findAllMessagesInChat(chat);
         const interlocutorId = req.body.interlocutorId;
         const interlocutor = await userQueries.findUserById(interlocutorId );
        res.send({
            messages,
            interlocutor: {
                firstName: interlocutor.firstName,
                lastName: interlocutor.lastName,
                displayName: interlocutor.displayName,
                id: interlocutor.id,
                avatar: interlocutor.avatar,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports.getPreview = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const conversations = await chatQueries.findLastUserMessageInConversations(userId);
        const result =[];
        if(conversations.length > 0)
        {
        const interlocutors = [];
        const sortConversationsByTime = _.orderBy(conversations, (o)=> moment(o.createdAt, 'YYYY-MM-DDTHH:mm:ss'), ['desc'])
        sortConversationsByTime.forEach(conversation => {
                if(conversation['Conversation.participant1'] === userId) interlocutors.push(conversation['Conversation.participant2'])
                    else interlocutors.push(conversation['Conversation.participant1']);
            });
            const senders = await userQueries.findAllUser(interlocutors);
            sortConversationsByTime.forEach((conversation) => {
            senders.forEach(sender => {
                if ( (conversation['Conversation.participant1'] === sender.id)
                    || (conversation['Conversation.participant2'] === sender.id) ) {
                    conversation.interlocutor = {
                        id: sender.id,
                        firstName: sender.firstName,
                        lastName: sender.lastName,
                        displayName: sender.displayName,
                        avatar: sender.avatar,
                    };
                }
            });
            answer.push({
                blackList: [conversation['Conversation.blackList1'], conversation['Conversation.blackList2']],
                createAt: conversation.createdAt,
                favoriteList: [conversation['Conversation.favoriteList1'], conversation['Conversation.favoriteList1']],
                interlocutor: conversation.interlocutor,
                participants: [conversation['Conversation.participant1'], conversation['Conversation.participant2']],
                sender: conversation.sender,
                text: conversation.body,
                _id: conversation.conversation,
                }
            );
        });
        res.send(answer);
    } catch (err) {
        next(err);
    }
};

module.exports.moveChatToFavoriteBlackList = async (req, res, next) => {
    try {
        const isFavoriteOption = (req.route.path === '/favorite');
        const userIndexInConversation = req.body.participants.indexOf(req.tokenData.userId)+1;
        const newStatus = req.body.flag;
        const participants = req.body.participants;
        const chat = await chatQueries.markChatFavoriteOrBlock(isFavoriteOption, userIndexInConversation,participants, newStatus);
        res.send({
            blackList: [chat.blackList1, chat.blackList2],
            favoriteList: [chat.favoriteList1, chat.favoriteList2],
            participants: [chat.participant1, chat.participant2],
            updatedAt: chat.updatedAt,
            _id: chat.id
        });
    } catch (err) {
        next(err);
    }
};




