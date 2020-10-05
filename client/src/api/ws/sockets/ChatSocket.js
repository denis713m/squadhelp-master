import WebSocket from './WebSocket';
import CONTANTS from "../../../constants";
import {addMessage, changeBlockStatusInStore} from "../../../actions/actionCreator";
import isEqual from 'lodash/isEqual';

class ChatSocket extends WebSocket {
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room);
    }

    anotherSubscribes = () => {
        this.onNewMessage();
        this.onChangeBlockStatus();
    };
    onChangeBlockStatus = () => {
        this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, (data) => {
            const {message} = data;
            const {messagesPreview, interlocutor} = this.getState().chatStore;
            messagesPreview.forEach(preview => {
                if (isEqual(preview._id, message._id))
                    preview.interlocutor.isBlockedConversation = message.newStatus;
                    interlocutor.isBlockedConversation = message.newStatus
            });
            this.dispatch(changeBlockStatusInStore({messagesPreview, interlocutor}));
        })
    };

    onNewMessage = () => {
        this.socket.on('newMessage', (data) => {
            const {message, preview} = data.message;
            const {messagesPreview} = this.getState().chatStore;
            let isNew = true;
            messagesPreview.forEach(preview => {
                if (isEqual(preview._id, message.conversation)) {
                    preview.text = message.body;
                    preview.sender = message.sender;
                    preview.createAt = message.createdAt;
                    isNew = false;
                }
            });
            if (isNew) {
                messagesPreview.splice(0, 0, preview);
            }
            this.dispatch(addMessage({message, messagesPreview}));
        })
    };

    subscribeChat = (id) => {
        this.socket.emit('subscribeChat', id);
    };

    unsubscribeChat = (id) => {
        this.socket.emit('unsubscribeChat', id);
    };
}

export default ChatSocket;