import ACTION from '../actions/actionTypes';

const initialState = {
    isFetching: true,
    error: null,
    transactions: [],
    total: []
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_TRANSACTIONS: {
            return {
                ...state,
                isFetching: true,
                error: null,
            }
        }
        case ACTION.GET_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                transactions: [ ...action.data],
            }
        }
        case ACTION.GET_TRANSACTIONS_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                transactions: []
            }
        }
        case ACTION.GET_TOTAL_TRANSACTIONS: {
            return {
                ...state,
            }
        }
        case ACTION.GET_TOTAL_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
                total: [...action.data],
            }
        }
        case ACTION.GET_TOTAL_TRANSACTIONS_ERROR: {
            return {
                ...state,
                total: []
            }
        }

        default:
            return state;
    }
}