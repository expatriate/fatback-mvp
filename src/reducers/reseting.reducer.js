import { userConstants } from '../constants';

const initialState = {
    phone: '',
    requesting: false,
    requested: false,
    confirming: false,
    'confirming_retry': false,
    confirmed: false,
    reseting: false,
    reseted: false,
}

export function reseting(state = initialState, action) {
    switch (action.type) {
        case userConstants.RESET_PHONE_REQUEST:
            return {
                ...state,
                requesting: true,
                requested: false
            };
        case userConstants.RESET_PHONE_SUCCESS:
            return {
                ...state,
                phone: action.data,
                requesting: false,
                requested: true
            };
        case userConstants.RESET_PHONE_FAILURE:
            return {
                ...state,
                phone: '',
                requesting: false,
                requested: false
            };
        case userConstants.RESET_PHONE_CONFIRM_REQUEST:
            return {
                ...state,
                confirming: true,
                confirmed: false,
            };
        case userConstants.RESET_PHONE_CONFIRM_SUCCESS:
            return {
                ...state,
                confirming: false,
                confirmed: true,
            };
        case userConstants.RESET_PHONE_CONFIRM_FAILURE:
            return {
                ...state,
                confirming: false,
                confirmed: false,
            };
        case userConstants.RESET_PHONE_CONFIRM_RETRY_REQUEST:
            return {
                ...state,
                'confirming_retry': true,
            }
        case userConstants.RESET_PHONE_CONFIRM_RETRY_SUCCESS:
            return {
                ...state,
                'confirming_retry': false,
            }
        case userConstants.RESET_PHONE_CONFIRM_RETRY_FAILURE:
            return {
                ...state,
                'confirming_retry': false,
            }
        case userConstants.RESET_REQUEST:
            return {
                ...state,
                reseting: true,
                reseted: false
            };
        case userConstants.RESET_SUCCESS:
            return {
                ...state,
                reseting: false,
                reseted: true
            };
        case userConstants.RESET_FAILURE:
            return {
                ...state,
                reseting: false,
                reseted: false
            };
        case userConstants.RESET_CLEAR_DATA:
            return {
                phone: '',
                requesting: false,
                requested: false,
                confirming: false,
                'confirming_retry': false,
                confirmed: false,
                reseting: false,
                reseted: false,
            }
        default:
            return state
    }
}