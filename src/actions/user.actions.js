import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers/history';

export const userActions = {
    token,
    login,
    logout,
    register,
    confirmReg,
    clearResetData,
    restorePassword,
    requestCodeReset,
    requestPasswordReset,
    requestCodeResetRetry,
};

function token(data) {
    return dispatch => {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({type: userConstants.TOKEN_RECIEVED, data: data});
    }
}

function login(code, phone, password) {
    return dispatch => {
        dispatch(request());

        userService.login(code, phone, password)
            .then(
                user => { 
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(success(user));
                    history.push('/home');
                },
                (error, data) => {
                    dispatch(failure(JSON.stringify(error)));
                    dispatch(alertActions.error(JSON.stringify(error)));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function confirmReg(phone, sms_code) {
    return dispatch => {
        dispatch(request(sms_code));

        userService.confirm(phone, sms_code)
            .then(
                user => { 
                    dispatch(success());
                    //history.push('/login');
                    history.push('/welcome');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(JSON.stringify(error)));
                    dispatch(alertActions.error(JSON.stringify(error)));
                }
            );
    };

    function request(user) { return { type: userConstants.CONFIRM_REQUEST, user } }
    function success(user) { return { type: userConstants.CONFIRM_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CONFIRM_FAILURE, error } }
}

function requestPasswordReset(code, phone) {
    return dispatch => {
        dispatch(request());

        userService.requestPasswordReset(code, phone)
            .then(
                data => {
                    dispatch(success());
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success());
                    }
                }
            );
    };

    function request() { return { type: userConstants.RESET_PHONE_REQUEST } }
    function success() { return { type: userConstants.RESET_PHONE_SUCCESS } }
    function failure(error) { return { type: userConstants.RESET_PHONE_FAILURE, error } }
}

function clearResetData() {
    return dispatch => {
        dispatch({type: userConstants.RESET_CLEAR_DATA})
    }
}

function requestCodeResetRetry(code, phone) {

    return dispatch => {
        dispatch(request());

        userService.requestPasswordReset(code, phone)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success());
                    }
                }
            );
    };

    function request() { return { type: userConstants.RESET_PHONE_CONFIRM_RETRY_REQUEST} }
    function success() { return { type: userConstants.RESET_PHONE_CONFIRM_RETRY_SUCCESS} }
    function failure(error) { return { type: userConstants.RESET_PHONE_CONFIRM_RETRY_FAILURE, error } }
}

function requestCodeReset(code, phone, sms_code) {
     return dispatch => {
        dispatch(request());

        userService.requestCodeReset(code, phone, sms_code)
            .then(
                data => {
                    dispatch(success(data));
                    dispatch(userActions.token(data))
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success());
                    }
                }
            );
    };

    function request() { return { type: userConstants.RESET_PHONE_CONFIRM_REQUEST } }
    function success() { return { type: userConstants.RESET_PHONE_CONFIRM_SUCCESS } }
    function failure(error) { return { type: userConstants.RESET_PHONE_CONFIRM_FAILURE, error } }
}

function restorePassword(password, password_confirmation) {
     return dispatch => {
        dispatch(request());

        userService.restorePassword(password, password_confirmation)
            .then(
                data => {
                    dispatch(success());
                    history.push('/login');
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success());
                    }
                }
            );
    };

    function request() { return { type: userConstants.RESET_PHONE_CONFIRM_REQUEST } }
    function success() { return { type: userConstants.RESET_PHONE_CONFIRM_SUCCESS } }
    function failure(error) { return { type: userConstants.RESET_PHONE_CONFIRM_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    //history.push('/login');
                    history.push('/confirm-registration');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(JSON.stringify(error)));
                    dispatch(alertActions.error(JSON.stringify(error)));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
