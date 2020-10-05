import React from 'react';
import {connect} from 'react-redux';
import {backToDialogList, changeChatFavorite, changeChatBlock} from "../../../../actions/actionCreator";
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';
import classNames from 'classnames';
import { addDefaultSrc } from '../../../../api/utils';

const ChatHeader = (props) => {
    const setChatFavorite = (data, event) => {
        props.changeChatFavorite(data);
        event.stopPropagation();
    };

    const setChatBlock = (data, event) => {
        props.changeChatBlock(data);
        event.stopPropagation();
    };


    const isFavorite = (chatData) => {
        return chatData.status === 'favorite'
    };

    const isBlocked = (chatData) => {
        return chatData.status === 'block'
    };


    const {avatar, firstName, id} = props.interlocutor;
    const {backToDialogList, chatData} = props;
    return (
        <div className={styles.chatHeader}>
            <div className={styles.buttonContainer} onClick={() => backToDialogList()}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`} alt='back'/>
            </div>
            <div className={styles.infoContainer}>
                <div>
                    <img src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
                         onError={(e) => addDefaultSrc(e)}
                         alt='user'/>
                    <span>{firstName}</span>
                </div>
                {chatData &&
                <div>
                    <i onClick={(event) => setChatFavorite({
                        id: chatData._id,
                        status: chatData.status,
                    }, event)}
                       className={classNames({
                           'far fa-heart': !isFavorite(chatData),
                           'fas fa-heart': isFavorite(chatData)
                       })}/>
                    <i onClick={(event) => setChatBlock({
                        id: chatData._id,
                        status: chatData.status,
                        interlocutor: id,
                    }, event)}
                       className={classNames({
                           'fas fa-user-lock': !isBlocked(chatData),
                           'fas fa-unlock': isBlocked(chatData)
                       })}/>
                </div>
                }
            </div>
        </div>
    )
};


const mapStateToProps = (state) => {
    const {interlocutor, chatData} = state.chatStore;
    return {interlocutor, chatData};
};

const mapDispatchToProps = (dispatch) => {
    return {
        backToDialogList: () => dispatch(backToDialogList()),
        changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
        changeChatBlock: (data) => dispatch(changeChatBlock(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);