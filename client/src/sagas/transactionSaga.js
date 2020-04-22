import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* getTransaction(){
    yield put({type: ACTION.GET_TRANSACTIONS_REQUEST});
    try{
        const {data}=yield  restController.getTransaction();
        yield  put({type: ACTION.GET_TRANSACTIONS_SUCCESS, data: data,});
    }
    catch (e) {
        yield put({type: ACTION.GET_TRANSACTIONS_ERROR, error: e.response});
    }
}

export function* getTotalTransaction(){
    yield put({type: ACTION.GET_TOTAL_TRANSACTIONS_REQUEST});
    try{
        const {data}=yield  restController.getTotalTransaction();
        yield  put({type: ACTION.GET_TOTAL_TRANSACTIONS_SUCCESS, data: data,});
    }
    catch (e) {
        yield put({type: ACTION.GET_TOTAL_TRANSACTIONS_ERROR, error: e.response});
    }
}

export function* makeTransaction(action){
    yield put({type: ACTION.MAKE_TRANSACTION_REQUEST});
    try{
        const {data}=yield  restController.makeTransaction(action.data);
        yield  put({type: ACTION.MAKE_TRANSACTION_SUCCESS, data: data,});
    }
    catch (e) {
        yield put({type: ACTION.MAKE_TRANSACTION_ERROR, error: e.response});
    }
}

