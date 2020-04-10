import { authHeader } from '../helpers/auth-header';

const config = {
    // apiUrl: 'https://stage.api.beinsport.ru/api/v1'
    apiUrl: 'https://mvp.api.beinsport.ru/api/v1'
}

export const userService = {
    login,
    logout,
    register,
    confirm,
    getUserData,
    restorePassword,
    requestCodeReset,
    requestPasswordReset,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(code, phone, password) {
    const formData = new FormData();
    let phone_ = '';

    if (code && phone) {
        phone_ = code.toString() + phone.replace(/ /g,"").replace('(', '').replace(')','').replace(/-/g,'').toString();
    }
    formData.set('phone', phone_);
    formData.set('password', password);
    
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function register(user) {
    const formData = new FormData();
    let phone_ = '';
    if (user && user.code && user.phone) {
        phone_ = user.code.toString() + user.phone.replace(/ /g,"").replace('(', '').replace(')','').replace(/-/g,'').toString();
    }
    formData.set('phone', phone_);
    formData.set('first_name', user.firstName);
    formData.set('last_name', user.lastName);
    formData.set('sex', user.sex);
    formData.set('age', user.age);
    formData.set('company_id', user.company ? user.company.id : '');
    formData.set('password', user.password);
    formData.set('password_confirmation', user.password_confirmation);
    formData.set('terms_of_use', user.terms_of_use);
    formData.set('personal_data_processing', user.personal_data_processing);
    user.avatar && formData.set('avatar', user.avatar);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    localStorage.setItem('temp_phone', phone_);

    return fetch(`${config.apiUrl}/auth/registration`, requestOptions).then(handleResponse);
}

function confirm(phone, sms_code) {
    if (!phone && localStorage.getItem('temp_phone')) {
        phone = localStorage.getItem('temp_phone');
    }
    const formData = new FormData();
    formData.set('phone', phone);
    formData.set('sms_code', sms_code);
    
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/auth/check-code`, requestOptions)
        .then(handleResponse)
}

function requestCodeReset(code, phone, sms_code) {

    let phone_ = '';
    if (code && phone) {
        phone_ = code.toString() + phone.replace(/ /g,"").replace('(', '').replace(')','').replace(/-/g,'').toString();
    }

    const formData = new FormData();
    formData.set('phone', phone_);
    formData.set('sms_code', sms_code);
    
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/auth/reset-password`, requestOptions)
        .then(handleResponse)
}

function requestPasswordReset(code, phone) {
    const formData = new FormData();

    let phone_ = '';
    if (code && phone) {
        phone_ = code.toString() + phone.replace(/ /g,"").replace('(', '').replace(')','').replace(/-/g,'').toString();
    }

    formData.set('phone', phone_);
    
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/auth/request-reset-password`, requestOptions)
        .then(handleResponse)
}

function restorePassword(password, password_confirmation) {
    const formData = new FormData();

    formData.set('password', password);
    formData.set('password_confirmation', password_confirmation);
    
    const requestOptions = {
        headers: authHeader(),
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/account/update`, requestOptions).then(handleResponse)
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUserData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/account/me`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // window.location.reload(true);
            }

            const error = data || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}