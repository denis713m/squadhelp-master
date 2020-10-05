import React from 'react';
import {connect} from 'react-redux';
import {getDialogMessages, clearMessageList} from "../../../../actions/actionCreator";
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import moment from 'moment';
import className from 'classnames';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';


class Dialog extends React.Component {

    componentDidMount() {
        this.props.getDialog({interlocutor: this.props.interlocutor,
                                    chatId: this.props.chatData ? this.props.chatData._id: null});
        this.scrollToBottom();
    }

    messagesEnd = React.createRef();

    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({behavior: 'smooth'})
    };

    scrollToBottomNormal = () => {
        this.messagesEnd.current && this.messagesEnd.current.scrollIntoView({behavior: 'auto'})
    };


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.interlocutor && nextProps.interlocutor.id !== this.props.interlocutor.id)
            this.props.getDialog({interlocutorId: nextProps.interlocutor.id,
                                        chatId: this.props.chatData._id});
        this.scrollToBottomNormal();
    }

    componentWillUnmount() {
        this.props.clearMessageList();
    }

    componentDidUpdate() {
        if (this.messagesEnd.current)
            this.scrollToBottom();
    }

    renderMainDialog = () => {
        const messagesArray = [];
        const {messages, userId} = this.props;
        let currentTime = moment();
        messages.forEach((message, i) => {
            if (!currentTime.isSame(message.createdAt, 'date')) {
                messagesArray.push(
                    <div key={message.createdAt} className={styles.date}>
                        {moment(message.createdAt).format('MMMM DD, YYYY')}
                    </div>
                );
                currentTime = moment(message.createdAt);
            }
            messagesArray.push(
                <div key={i}
                     className={className(userId === message.sender ? styles.ownMessage : styles.message)}>
                    <span>{message.body}</span>
                    <span className={styles.messageTime}>{moment(message.createdAt).format('HH:mm')}</span>
                    <div ref={this.messagesEnd}/>
                </div>
            )
        });
        return (
            <div className={styles.messageList}>
                {messagesArray}
            </div>
        )
    };


    blockMessage = () => {
        const {chatData,interlocutor} = this.props;
        let message;
        if (chatData && chatData.status === 'block') {
            message = 'You block him';
        } else if (chatData &&  interlocutor.isBlockedConversation) {
            message = 'He block you';
        }
        return (
            <span className={styles.messageBlock}>{message}</span>
        )
    };


    render() {
        const {chatData, userId, interlocutor} = this.props;
        return (
            <>
                <ChatHeader userId={userId}/>
                {this.renderMainDialog()}
                <div ref={this.messagesEnd}/>
                {(chatData && (chatData.status === 'block' || interlocutor.isBlockedConversation)) ? this.blockMessage() : <ChatInput/>}
            </>
        )
    }

}


const mapStateToProps = (state) => {
    return state.chatStore;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDialog: (data) => dispatch(getDialogMessages(data)),
        clearMessageList: () => dispatch(clearMessageList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);