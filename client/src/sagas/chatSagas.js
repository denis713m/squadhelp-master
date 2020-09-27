import {put, select} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import remove from 'lodash/remove';
import isEqual from 'lodash/isEqual';


export function* previewSaga() {
    try {
        const {data} = yield  restController.getPreviewChat();
        yield  put({type: ACTION.GET_PREVIEW_CHAT, data: data});
    } catch (err) {
        yield  put({type: ACTION.GET_PREVIEW_CHAT_ERROR, error: err.response});
    }
}


export function* getDialog(action) {
    try {
        const {data} = yield  restController.getDialog(action.data);
        yield put({type: ACTION.GET_DIALOG_MESSAGES, data: data});
    } catch (err) {
        yield put({type: ACTION.GET_DIALOG_MESSAGES_ERROR, error: err.response});
    }
}

export function* sendMessage(action) {
    try {
        const {data} = yield restController.newMessage(action.data);
        const {messagesPreview} = yield select(state => state.chatStore);
        const dataForStore = {
            message : {
                body: action.data.messageBody,
                sender: action.data.sender,
                createdAt: data.message.createdAt
            }};
        if(action.data.convers)
        {
            messagesPreview.forEach(preview => {
                if (isEqual(preview._id, action.data.convers)) {
                    preview.text = action.data.messageBody;
                    preview.sender = action.data.sender;
                    preview.createAt = data.message.createdAt;
                }
        });}
        else {
            const preview = {
                _id: data.message.convers,
                sender: action.data.sender,
                text: action.data.messageBody,
                createAt: data.message.createdAt,
                blackList: [false, false],
                favoriteList: [false, false],
                interlocutor: action.data.recipient,
                participants: [action.data.sender, action.data.recipient]
            };
            messagesPreview.push(preview);
            dataForStore.chatData = {
                    _id: data.message.convers,
                    participants: [action.data.sender, action.data.recipient],
                    blackList: [false, false],
                    favoriteList: [false, false],
            };
        }
        yield put({
            type: ACTION.SEND_MESSAGE,
            data: {
                message: data.message,
                messagesPreview,
                chatData: {
                    _id: data.preview._id,
                    participants: data.preview.participants,
                    favoriteList: data.preview.favoriteList,
                    blackList: data.preview.blackList
                }
            }
        });
    } catch (err) {
        yield put({type: ACTION.SEND_MESSAGE_ERROR, error: err.response});
    }
}

export function* changeChatFavorite(action) {
    try {
        const {data} = yield restController.changeChatFavorite(action.data);
        const {messagesPreview} = yield select(state => state.chatStore);
        messagesPreview.forEach(preview => {
            if (isEqual(preview.participants, data.participants))
                preview.favoriteList = data.favoriteList;
        });
        yield put({type: ACTION.CHANGE_CHAT_FAVORITE, data: {changedPreview: data, messagesPreview}});
    } catch (err) {
        yield put({type: ACTION.SET_CHAT_FAVORITE_ERROR, error: err.response});
    }
}

export function* changeChatBlock(action) {
    try {
        const {data} = yield restController.changeChatBlock(action.data);
        const {messagesPreview} = yield select(state => state.chatStore);
        messagesPreview.forEach(preview => {
            if (isEqual(preview.participants, data.participants))
                preview.blackList = data.blackList
        });
        yield put({type: ACTION.CHANGE_CHAT_BLOCK, data: {messagesPreview, chatData: data}});
    } catch (err) {
        yield put({type: ACTION.SET_CHAT_BLOCK_ERROR, error: err.response})
    }
}


export function* getCatalogListSaga(action) {
    try {
        const {data} = yield restController.getCatalogList(action.data);
        yield put({type: ACTION.RECEIVE_CATALOG_LIST, data: data});
    } catch (err) {
        yield put({type: ACTION.RECEIVE_CATALOG_LIST_ERROR, error: err.response});
    }
}

export function* addChatToCatalog(action) {
    try {
        yield restController.addChatToCatalog(action.data);
        const {catalogList} = yield select(state => state.chatStore);
        for (let i = 0; i < catalogList.length; i++) {
            if (catalogList[i]._id === action.data.catalogId) {
                catalogList[i].chats.push(action.data.chatId);
                break;
            }
        }
        yield put({type: ACTION.ADD_CHAT_TO_CATALOG, data: catalogList});
    } catch (err) {
        yield put({type: ACTION.ADD_CHAT_TO_CATALOG_ERROR, error: err.response});
    }
}


export function* createCatalog(action) {
    try {
        const {data} = yield restController.createCatalog(action.data);
        yield put({type: ACTION.CREATE_CATALOG_SUCCESS, data: data});
    } catch (err) {
        yield  put({type: ACTION.CREATE_CATALOG_ERROR, error: err.response});
    }
}

export function* deleteCatalog(action) {
    try {
        yield restController.deleteCatalog(action.data);
        const {catalogList} = yield select(state => state.chatStore);
        const newCatalogList = remove(catalogList, (catalog) => action.data.catalogId !== catalog._id);
        yield put({type: ACTION.DELETE_CATALOG_SUCCESS, data: newCatalogList});
    } catch (err) {
        yield put({type: ACTION.DELETE_CATALOG_ERROR, error: err.response});
    }
}

export function* removeChatFromCatalogSaga(action) {
    try {
        yield restController.removeChatFromCatalog(action.data);
        const {catalogList} = yield select(state => state.chatStore);
        for (let i = 0; i < catalogList.length; i++) {
            if (catalogList[i]._id === action.data.catalogId) {
                remove(catalogList[i].chats, catalog => catalog === action.data.chatId);
                break;
            }
        }
        yield put({type: ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS, data: catalogList});
    } catch (err) {
        yield put({type: ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR, error: err.response});
    }
}


export function* changeCatalogName(action) {
    try {
        yield restController.changeCatalogName(action.data);
        const {catalogList} = yield select(state => state.chatStore);
        let data = {};
        for (let i = 0; i < catalogList.length; i++) {
            if (catalogList[i]._id === action.data.catalogId) {
                catalogList[i].catalogName = action.data.catalogName;
                data = catalogList[i];
                break;
            }
        }
        yield put({type: ACTION.CHANGE_CATALOG_NAME_SUCCESS, data: {catalogList, currentCatalog: data}});
    } catch (err) {
        yield put({type: ACTION.CHANGE_CATALOG_NAME_ERROR, error: err.response});
    }
}