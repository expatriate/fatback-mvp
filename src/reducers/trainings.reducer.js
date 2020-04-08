import { trainingsConstants } from '../constants';

const initialState = {
    items: [],
    groups: [],
    training: {},
    exercises: {},
    loading: false,
    groups_loading: false,
    training_loading: false,
    exercises_loading: false,
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
        case trainingsConstants.GET_TRAININGGROUPS_REQUEST:
            return {
                ...state,
                groups_loading: true,
            }
        case trainingsConstants.GET_TRAININGGROUPS_SUCCESS:
            return {
                ...state,
                groups: action.data,
                groups_loading: false,
            }
        case trainingsConstants.GET_TRAININGGROUPS_FAILURE:
            return {
                ...state,
                groups: {data: []},
                groups_loading: false,
            }
        case trainingsConstants.GET_TRAINING_REQUEST:
            return {
                ...state,
                training_loading: true,
            }
        case trainingsConstants.GET_TRAINING_SUCCESS:
            return {
                ...state,
                training: action.data,
                training_loading: false,
            }
        case trainingsConstants.GET_TRAINING_FAILURE:
            return {
                ...state,
                training: {},
                training_loading: false,
            }
        case trainingsConstants.GET_TRAINING_EXERCISES_REQUEST:
            return {
                ...state,
                exercises_loading: true,
            }
        case trainingsConstants.GET_TRAINING_EXERCISES_SUCCESS:
            return {
                ...state,
                exercises: action.data,
                exercises_loading: false,
            }
        case trainingsConstants.GET_TRAINING_EXERCISES_FAILURE:
            return {
                ...state,
                exercises: {},
                exercises_loading: false,
            }
            
        default:
            return state
    }
}