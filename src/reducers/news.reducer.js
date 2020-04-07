import { newsConstants } from '../constants';

const initialState = {
}

export function news(state = initialState, action) {
    switch (action.type) {
        case newsConstants.GET_NEWS_REQUEST:
            return {
                ...state,
            };
        case newsConstants.GET_NEWS_SUCCESS:
            return {
                ...state,
            };
        case newsConstants.GET_NEWS_FAILURE:
            return {
                ...state,
            };
        default:
            return state
    }
}