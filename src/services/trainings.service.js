import { authHeader } from '../helpers/auth-header';

const config = {
    // apiUrl: 'https://stage.api.beinsport.ru/api/v1'
    apiUrl: 'https://mvp.api.beinsport.ru/api/v1'
}

export const trainingsService = {
    getTrainings,
    getTrainingGroups,
    getTraining,
    getTrainingExercises,
    getUserTrainings,
    voteTraining
};

function getUserTrainings() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user-trainings/`, requestOptions).then(handleResponse);
}

function getTrainings() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/trainings/`, requestOptions).then(handleResponse);
}

function getTrainingGroups() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/trainings-groups/`, requestOptions).then(handleResponse);
}

function getTraining(trainingId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/trainings/${trainingId}`, requestOptions).then(handleResponse);
}

function getTrainingExercises(trainingId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/training-exercises/`, requestOptions).then(handleResponse);
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

function voteTraining(rating, feedback, trainingId) {

    const formData = new FormData();
    if (feedback) {
        formData.set('feedback', feedback);
    }
    formData.set('rating', rating);
    formData.set('_method', 'PUT');
    
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user-trainings/${trainingId}`, requestOptions)
        .then(handleResponse)
}
