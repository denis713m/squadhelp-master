import moment from 'moment';

const controller = require('../boot/configureSocketIO');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const { Op } = require("sequelize");
const Sequelize = require('sequelize');

module.exports.addMessage = async (req, res, next) => {
    const participants = [req.tokenData.userId, req.body.recipient];
    participants.sort(
        (participant1, participant2) => participant1 - participant2);
    try {
        const conversation = await chatQueries.createConversation(participants);
        const message = await chatQueries.createChatElementModel('Messages',
            {
                conversation: conversation.id,
                body: req.body.messageBody,
                sender: req.tokenData.userId});
        message.participants = participants;
        const preview = {
            _id: conversation.id,
            sender: req.tokenData.userId,
            text: req.body.messageBody,
            createAt: message.createdAt,
            participants,
            blackList: [conversation.blackList1, conversation.blackList2],
            favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
            interlocutor: req.body.interlocutor};
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
                    email: req.tokenData.email,
                },
            },
        });
        res.send({message, preview})
    } catch (err) {
        next(err);
    }
};

module.exports.createCatalog = async (req, res, next) => {
    try {
        const catalog = await chatQueries.createChatElementModel('Catalogs',{
            userId: req.tokenData.userId,
            catalogName: req.body.catalogName,
            chats: [req.body.chatId]
        });
        res.send(catalog);
    }
    catch (err) {
        next(err);
    }
};

module.exports.deleteCatalog = async (req, res, next) => {
    try {
        await chatQueries.deleteCatalog(
            {
                _id: req.body.catalogId
            }
        );
        res.end();
    } catch (err) {
        next(err);
    }
};

module.exports.updateNameCatalog = async (req, res, next) => {
    try {
        const updatedCatalog = await chatQueries.updateChatElementModel(
            'Catalogs',
            {catalogName: req.body.catalogName},
            { _id: req.body.catalogId }
            );
        res.send(updatedCatalog);
    } catch (err) {
        next(err);
    }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
    try {
        const catalogToChange = await chatQueries.findOneChatElementModel(
            'Catalogs',
            {_id: req.body.catalogId });
        const updatedCatalog = await chatQueries.updateChatElementModel(
            'Catalogs',
            {chats: [...catalogToChange.chats, req.body.chatId]},
            { _id: req.body.catalogId });
        res.send(updatedCatalog);
    } catch (err) {
        next(err);
    }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
    try {
        const catalogToChange = await chatQueries.findOneChatElementModel(
            'Catalogs',
            {_id: req.body.catalogId });
        const newConversationsInCatalog=[];
        catalogToChange.chats.forEach(chat => {if (chat !== req.body.chatId) newConversationsInCatalog.push(chat)});
        const updatedCatalog = await chatQueries.updateChatElementModel(
            'Catalogs',
            {chats: [...newConversationsInCatalog]},
            {_id: req.body.catalogId });
        res.send(updatedCatalog);
    } catch (err) {
        next(err);
    }
};

module.exports.getCatalogs = async (req, res, next) => {
    try {
    const catalogs = await chatQueries.findAllChatElementModel(
        'Catalogs',
        { userId: req.tokenData.userId },
        null,
        ['_id', 'catalogName', 'chats'],
        );
        res.send(catalogs);
    }
    catch (err) {
        next(err);
    }
};


module.exports.getChat = async (req, res, next) => {
    try {
         const messages = await chatQueries.findAllChatElementModel(
             'Messages',
             {conversation: req.body.chatId},
             [['createdAt', 'ASC']]
         );
        const interlocutor = await userQueries.findUser(
            { id: req.body.interlocutorId });
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
        const conversations = await chatQueries.findAllDBElementWithAggregate(
            'Messages',
            [{
                modelName: 'Conversations',
                where: {
                    [Op.or]:{
                        participant1: req.tokenData.userId,
                        participant2: req.tokenData.userId}},
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                },
            }],
            null,
            [['conversation', 'ASC'],['createdAt', 'DESC']],
            [Sequelize.literal('DISTINCT ON(conversation) "body"'),
                'conversation', 'sender', 'createdAt'],);
        const interlocutors = [];
        conversations.sort(function(item1, item2) {
            const time1 = moment(item1.createdAt, 'YYYY-MM-DDTHH:mm:ss');
            const time2 = moment(item2.createdAt, 'YYYY-MM-DDTHH:mm:ss');
            if(time1.isAfter(time2))
                return -1;
            else if (time1.isBefore(time2))
                return 1;
            else return 0;
        });
        conversations.forEach(conversation => {
            if(conversation['Conversation.participant1'] === req.tokenData.userId) interlocutors.push(conversation['Conversation.participant2'])
                else interlocutors.push(conversation['Conversation.participant1']);
        });
        const senders = await userQueries.findAllUser({id: interlocutors});
        const answer =[];
        conversations.forEach((conversation) => {
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

module.exports.blackList = async (req, res, next) => {
    const predicate = req.body.participants.indexOf(req.tokenData.userId);
    try {
        const chat = await chatQueries.updateChatElementModel('Conversations',
                        {[`blackList${predicate+1}`]: req.body.blackListFlag},
                          {
                              [Op.and]:[
                                {participant1: req.body.participants[0]},
                                {participant2: req.body.participants[1]}]
                                });
        const message = {
            blackList: [chat.blackList1, chat.blackList2],
            favoriteList: [chat.favoriteList1, chat.favoriteList2],
            participants: [chat.participant1, chat.participant2],
            updatedAt: chat.updatedAt,
            _id: chat.id
        };
        res.send(message);
        const interlocutorId = req.body.participants.filter(
            (participant) => participant !== req.tokenData.userId)[ 0 ];
        controller.getChatController().emitChangeBlockStatus(interlocutorId, message);
    } catch (err) {
        res.send(err);
    }
};

module.exports.favoriteChat = async (req, res, next) => {
    const predicate = req.body.participants.indexOf(req.tokenData.userId);
    try {
        const chat = await chatQueries.updateChatElementModel('Conversations',
            {[`favoriteList${predicate+1}`]: req.body.favoriteFlag},
            {
                [Op.and]:[
                    {participant1: req.body.participants[0]},
                    {participant2: req.body.participants[1]}]
            });
        res.send({
            blackList: [chat.blackList1, chat.blackList2],
            favoriteList: [chat.favoriteList1, chat.favoriteList2],
            participants: [chat.participant1, chat.participant2],
            updatedAt: chat.updatedAt,
            _id: chat.id
        });
    } catch (err) {
        res.send(err);
    }
};




