import { userConstants } from '../constants';

const initialState = {
    loggedIn: false,
    access_token: '',
    expires_in: null,
}


export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.TOKEN_RECIEVED:
            return {
                ...state,
                loggedIn: true,
                access_token: action.data.access_token,
                expires_in: action.data.expires_in
            }
        default:
            return state
    }
}