import React from 'react';
import styles from "./DialogBox.module.sass";
import CONSTANTS from "../../../../constants";
import classNames from 'classnames';


const DialogBox = (props) => {
    const {chatPreview, getTimeStr, changeFavorite, changeBlackList, catalogOperation,
        goToExpandedDialog, chatMode, interlocutor} = props;
    const {participants, _id, text, createAt, status } = chatPreview;
    const isFavorite = status === 'favorite';
    const isBlocked = status === 'block';
    return (
        <div className={styles.previewChatBox} onClick={() => goToExpandedDialog({
            interlocutor,
            conversationData: {
                participants: participants,
                _id: _id,
                status: status,
            }
        })}>
            <img src={interlocutor.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${interlocutor.avatar}`} alt='user'/>
            <div className={styles.infoContainer}>
                <div className={styles.interlocutorInfo}>
                    <span className={styles.interlocutorName}>{interlocutor.firstName}</span>
                    <span className={styles.interlocutorMessage}>{text}</span>
                </div>
                <div className={styles.buttonsContainer}>
                    <span className={styles.time}>{getTimeStr(createAt)}</span>
                    <i onClick={(event) => changeFavorite({
                        id: _id,
                        status: status
                    }, event)} className={classNames({'far fa-heart': !isFavorite, 'fas fa-heart': isFavorite})}/>
                    <i onClick={(event) => changeBlackList({
                        id: _id,
                        status: status,
                        interlocutor: interlocutor.id,
                    }, event)}
                       className={classNames({'fas fa-user-lock': !isBlocked, 'fas fa-unlock': isBlocked})}/>
                    <i onClick={(event) => catalogOperation(event, _id)} className={classNames({
                        'far fa-plus-square': chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
                        'fas fa-minus-circle': chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE
                    })}/>
                </div>
            </div>
        </div>
    )
};

export default DialogBox;
