import { authHeader } from '../helpers/auth-header';

const config = {
    // apiUrl: 'https://stage.api.beinsport.ru/api/v1'
    apiUrl: 'https://mvp.api.beinsport.ru/api/v1'
}

export const newsService = {
    getNews
};

function getNews() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/news`, requestOptions).then(handleResponse);
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
