import React from 'react';
import styles from './OfferBox.module.sass';
import CONSTANTS from '../../constants';
import {connect} from 'react-redux';
import Rating from 'react-rating';
import {
    changeMark,
    clearChangeMarkError,
    goToExpandedDialog,
    changeShowImage,
} from '../../actions/actionCreator';
import {withRouter} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import { addDefaultSrc } from '../../api/utils';


const OfferBox = (props) => {

    const findConversationInfo = () => {
        const {messagesPreview, id} = props;
        for (let i = 0; i < messagesPreview.length; i++) {
            if ( (messagesPreview[i].participants.includes(id)) && (messagesPreview[i].participants.includes(props.data.User.id))) {
                return {
                    participants: messagesPreview[i].participants,
                    _id: messagesPreview[i]._id,
                    status: messagesPreview[i].status
                };
            }
        }
        return null;
    };


    const resolveOffer = () => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'resolve')
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const rejectOffer = () => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'reject')
                },
                {
                    label: 'No',
                }
            ]
        });
    };


    const changeMark = (value) => {
        props.clearError();
        props.changeMark({
            mark: value,
            offerId: props.data.id,
            isFirst: !props.data.mark,
            creatorId: props.data.User.id
        });
    };

    const offerStatus = () => {
        const {status} = props.data;
        if (status === CONSTANTS.OFFER_STATUS_REJECTED || status === CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR) {
            return <i className={classNames("fas fa-times-circle", styles.reject)}/>
        } else if (status === CONSTANTS.OFFER_STATUS_WON) {
            return <i className={classNames("fas fa-check-circle", styles.resolve)}/>
        }
        else if (status === CONSTANTS.OFFER_STATUS_APPROVED) {
            return <i className={classNames("fas fa-spinner", styles.approve)}/>
        }
        return null;
    };


    const goChat = () => {
        props.goToExpandedDialog({interlocutor: props.data.User, conversationData: findConversationInfo()});
    };


    const {data, role, id, contestType} = props;
    const {avatar, firstName, lastName, email, rating} = props.data.User;
    return (
        <div className={styles.offerContainer}>
            {offerStatus()}
            <div className={styles.mainInfoContainer}>
                <div className={styles.userInfo}>
                    <div className={styles.creativeInfoContainer}>
                        <img
                            src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
                            onError={(e) => addDefaultSrc(e)}
                            alt='user'/>
                        <div className={styles.nameAndEmail}>
                            <span>{firstName + ' ' + lastName}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                    {props.role !== CONSTANTS.MODERATOR &&
                    <div className={styles.creativeRating}>
                        <span className={styles.userScoreLabel}>Creative Rating </span>
                        <Rating
                            initialRating={rating}
                            fractions={2}
                            fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                            placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                            emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                                              alt='star-outline'/>}
                            readonly={true}
                        />
                    </div>
                    }
                </div>
                <div className={styles.responseConainer}>
                    {
                        contestType === CONSTANTS.LOGO_CONTEST ?
                            <img onClick={() => props.changeShowImage({imagePath: data.fileName, isShowOnFull: true})}
                                 className={styles.responseLogo}
                                 src={`${CONSTANTS.publicURL}${data.fileName}`} alt='logo'/>
                            :
                            <span className={styles.response}>{data.text}</span>
                    }
                    {props.role !== CONSTANTS.MODERATOR && data.User.id !== id && <Rating
                        fractions={2}
                        fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                        placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt='star'/>}
                        emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt='star'/>}
                        onClick={changeMark}
                        placeholderRating={data.mark}
                    />}
                </div>
                {role !== CONSTANTS.CREATOR && <i onClick={goChat} className="fas fa-comments"/>}
            </div>
            {props.needButtons(data.status) && <div className={styles.btnsContainer}>
                {(props.data.status !== CONSTANTS.OFFER_STATUS_APPROVED || props.role === CONSTANTS.CUSTOMER )&& <div onClick={resolveOffer} className={styles.resolveBtn}>{(props.btnNames&&props.btnNames[0]) || 'Resolve'}</div>}
                {props.data.status !== CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR && <div onClick={rejectOffer} className={styles.rejectBtn}>{(props.btnNames&&props.btnNames[1]) || 'Reject'}</div>}
            </div>}
        </div>
    )
};


const mapDispatchToProps = (dispatch) => {
    return {
        changeMark: (data) => dispatch(changeMark(data)),
        clearError: () => dispatch(clearChangeMarkError()),
        goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
        changeShowImage: (data) => dispatch(changeShowImage(data))
    }
};

const mapStateToProps = (state) => {
    const {changeMarkError, isShowModal} = state.contestByIdStore;
    const {id, role} = state.userStore.data;
    const {messagesPreview} = state.chatStore;
    return {changeMarkError, id, role, messagesPreview, isShowModal};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBox));