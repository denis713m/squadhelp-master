import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* getUserEvents(){
    try{
        const {data}=yield  restController.getUserEvents();
        yield  put({type: ACTION.GET_EVENTS_SUCCESS, data: data,});
    }
    catch (e) {
        yield put({type: ACTION.GET_EVENTS_ERROR, error: e.response});
    }
}

export function* createEvent(action){
    try{
        const {data}=yield  restController.createEvent(action.data);
        yield  put({type: ACTION.ADD_EVENT_SUCCESS, data: {events:action.data, newId: data},});
    }
    catch (e) {
        yield put({type: ACTION.EVENT_ERROR, error: e.response});
    }
}

export function* deleteEvent(action){
    try{
        const {data}=yield  restController.deleteEvent(action.data);
        if (data === 1) {
            const events = yield select(state => state.events.events);
            const newEvents = events.filter(event => {
                if(event.id !==action.data.id) return event
            });
            yield  put({type: ACTION.DELETE_EVENT_SUCCESS, data: newEvents});}
        else yield put({type: ACTION.EVENT_ERROR, error: true});
    }
    catch (e) {
        yield put({type: ACTION.EVENT_ERROR, error: e.response});
    }
}