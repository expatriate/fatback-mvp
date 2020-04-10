import { userConstants } from '../constants';

const initialState = {
    loggedIn: false,
    access_token: '',
    expires_in: null,
    userdata: {},
    dataloaded: false
}


export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.TOKEN_RECIEVED:
            return {
                ...state,
                loggedIn: true,
                access_token: action.data.access_token,
                expires_in: action.data.expires_in
            }
        case userConstants.USER_DATA_REQUEST:
            return {
                ...state,
                dataloaded: false
            }
        case userConstants.USER_DATA_SUCCESS:
            return {
                ...state,
                userdata: action.data,
                dataloaded: true
            }
        case userConstants.USER_DATA_FAILURE:
            return {
                ...state,
                userdata: {},
                dataloaded: false
            }
        default:
            return state
    }
}