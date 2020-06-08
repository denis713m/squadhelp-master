import ACTION from '../actions/actionTypes';


const initialState = {
    isFetching: true,
    error: null,
    offers: [],
    statusUpdate: false,
    totalHave: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_OFFERS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
            }
        }
        case ACTION.GET_OFFERS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                statusUpdate: false,
                totalHave: action.data.count,
                offers: [...action.data.rows]
            }
        }
        case ACTION.GET_OFFERS_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                offers: [],
                totalHave: null,
            }
        }
        case ACTION.MODERATOR_CHANGE_OFFER_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case ACTION.MODERATOR_CHANGE_OFFER_SUCCESS: {
            return {
                ...state,
                error: null,
                offers: [...action.data],
                statusUpdate: true
            }
        }
        default:
            return {...state,
                statusUpdate: false
            };
    }
}