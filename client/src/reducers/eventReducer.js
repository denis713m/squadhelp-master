import ACTION from '../actions/actionTypes';
import moment from 'moment';

const initialState = {
    events: [
        {
            name: 'New Year',
            date: moment('31.12.2021','DD.MM.YYYY'),
            remind: 30
        },
        {
            name: 'Christmas',
            date: moment('07.01.2021', 'DD.MM.YYYY'),
            remind: 7
        },
        {
            name: 'Holy trinity',
            date: moment('08.06.2020', 'DD.MM.YYYY'),
            remind: 60
        },
        {
            name: 'Birthday',
            date: moment('15.06.2020', 'DD.MM.YYYY'),
            remind: 15
        },
        {
            name: 'Quarantine End',
            date: moment('22.05.2020', 'DD.MM.YYYY'),
            remind: 5
        },
    ]
};

const sort = (array) => array.sort(function(item1, item2) {
        if(item1.date.isAfter(item2.date, 'd'))
            return 1;
        else if (item1.date.isBefore(item2.date, 'd'))
            return -1;
        else return 0;
    }
);

sort(initialState.events);

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.ADD_EVENT: {
            state.events.push(action.data);
            sort(state.events);
            return state;
        }
        case ACTION.DELETE_EVENT: {
            state.events.splice(action.data, 1);
            return {events: [...state.events]};
        }
        default:
            return state;
    }
}