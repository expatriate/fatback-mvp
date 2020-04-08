import { newsConstants } from '../constants';

const initialState = {
    items: [],
    loading: false
}

export function news(state = initialState, action) {
    switch (action.type) {
        case newsConstants.GET_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case newsConstants.GET_NEWS_SUCCESS:
            return {
                ...state,
                items: action.data,
                loading: false,
            };
        case newsConstants.GET_NEWS_FAILURE:
            return {
                ...state,
                items: {data: []},
                loading: false,
            };
        default:
            return state
    }
}