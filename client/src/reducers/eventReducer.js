import ACTION from '../actions/actionTypes';
import moment from 'moment';
import _ from 'lodash';
import { array } from 'prop-types';

const initialState = {
    events: [],
    isFetching: true,
    isUpload: false,
    error: null,
};

/*const sort = (array) => array.sort(function(item1, item2) {
        if(item1.date.isAfter(item2.date, 'd'))
            return 1;
        else if (item1.date.isBefore(item2.date, 'd'))
            return -1;
        else return 0;
    }
);*/
const decodeTime = (array) => array.forEach( (item) => {
   item.date = moment(item.date, 'YYYY-MM-DDTHH:mm');
});
//sort(initialState.events);

const sort = (array) => _.sortBy(array, o => o.date);

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_EVENTS_SUCCESS:
            {
                decodeTime(action.data);
                //sort(action.data);
            return {
                events: action.data,
                isFetching: false,
                isUpload: true,
                error: null
            }
        }
        case ACTION.GET_EVENTS_ERROR:
        {
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        }
        case ACTION.ADD_EVENT_SUCCESS: {
            action.data.events.id = action.data.newId;
            state.events.push(action.data.events);
            //sort(state.events);
            return {...state,
                    events: [...sort(state.events)]};
        }
        case ACTION.EVENT_ERROR: {
            return {
                ...state,
                error: true}
        }
        case ACTION.DELETE_EVENT_SUCCESS: {
            return {
                ...state,
                events: action.data};
        }
        default:
            return state;
    }
}