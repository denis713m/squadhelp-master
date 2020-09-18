const socketIO = require('socket.io');
const ChatController = require('../controllers/sockets/ChatController');
const NotificationController = require(
    '../controllers/sockets/NotificationController');
import httpServer from "./configureHTTPServer";
const eventTimer = require('../middlewares/eventsTimer');

const io = socketIO.listen(httpServer);

const notificationController = new NotificationController();
const chatController = new ChatController();

notificationController.connect('/notifications', io);
chatController.connect('/chat', io);
eventTimer.startTimer();

module.exports.getChatController = () => {
        return chatController;
    };
module.exports.getNotificationController = () => {
        return notificationController;
    };
