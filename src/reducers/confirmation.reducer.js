import { userConstants } from '../constants';

export function confirmation(state = {}, action) {
    switch (action.type) {
        case userConstants.CONFIRM_REQUEST:
            return { confirmIn: true };
        case userConstants.CONFIRM_SUCCESS:
            return {};
        case userConstants.CONFIRM_FAILURE:
            return {};
        default:
            return state
    }
}