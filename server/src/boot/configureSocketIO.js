const socketIO = require('socket.io');
const ChatController = require('../controllers/sockets/ChatController');
const NotificationController = require(
    '../controllers/sockets/NotificationController');
import httpServer from "./configureHTTPServer";

const io = socketIO.listen(httpServer);

const notificationController = new NotificationController();
const chatController = new ChatController();

notificationController.connect('/notifications', io);
chatController.connect('/chat', io);

module.exports = {
    getChatController: () => {
        return chatController;
    },
    getNotificationController: () => {
        return notificationController;
    },
};