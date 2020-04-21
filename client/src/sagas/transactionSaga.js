import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* getTransaction(action){
    yield put({type: ACTION.GET_TRANSACTIONS_REQUEST});
    try{
        const {data}=yield  restController.getTransaction(action.data);
        yield  put({type: ACTION.GET_TRANSACTIONS_SUCCESS, data: data,});
    }
    catch (e) {
        yield put({type: ACTION.GET_TRANSACTIONS_ERROR, error: e.response});
    }
}

export function* getTotalTransaction(action){
    yield put({type: ACTION.GET_TOTAL_TRANSACTIONS_REQUEST});
    try{
        const {data}=yield  restController.getTotalTransaction(action.data);
        yield  put({type: ACTION.GET_TOTAL_TRANSACTIONS_SUCCESS, data: data,});
    }
    catch (e) {
        yield put({type: ACTION.GET_TOTAL_TRANSACTIONS_ERROR, error: e.response});
    }
}

