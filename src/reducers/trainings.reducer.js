import { trainingsConstants } from '../constants';

const initialState = {
    loading: false,
    items: []
}

export function trainings(state = initialState, action) {
    switch (action.type) {
        case trainingsConstants.GET_TRAININGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case trainingsConstants.GET_TRAININGS_SUCCESS:
            return {
                ...state,
                items: action.data,
                loading: false,
            };
        case trainingsConstants.GET_TRAININGS_FAILURE:
            return {
                ...state,
                items: {data:[]},
                loading: false,
            };
        default:
            return state
    }
}