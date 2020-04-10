import { trainingsConstants } from '../constants';
import { trainingsService } from '../services';
import { alertActions } from './';
import { history } from '../helpers/history';

export const trainingsActions = {
    getTrainings,
    getTrainingGroups,
    getTraining,
    getUserTrainings,
    getTrainingExercises,
    voteTraining
};

function getTrainings() {
    return dispatch => {
        dispatch(request());

        trainingsService.getTrainings()
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success([]));
                    }
                }
            );
    };

    function request() { return { type: trainingsConstants.GET_TRAININGS_REQUEST } }
    function success(trainings) { return { type: trainingsConstants.GET_TRAININGS_SUCCESS, data: trainings} }
    function failure(error) { return { type: trainingsConstants.GET_TRAININGS_FAILURE, error } }
}

function getTrainingGroups() {
    return dispatch => {
        dispatch(request());

        trainingsService.getTrainingGroups()
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success([]));
                    }
                }
            );
    };

    function request() { return { type: trainingsConstants.GET_TRAININGGROUPS_REQUEST } }
    function success(groups) { return { type: trainingsConstants.GET_TRAININGGROUPS_SUCCESS, data: groups } }
    function failure(error) { return { type: trainingsConstants.GET_TRAININGGROUPS_FAILURE, error } }
}

function getTraining(trainingId) {
    return dispatch => {
        dispatch(request());

        trainingsService.getTraining(trainingId)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success([]));
                    }
                }
            );
    };

    function request() { return { type: trainingsConstants.GET_TRAINING_REQUEST } }
    function success(training) { return { type: trainingsConstants.GET_TRAINING_SUCCESS, data: training } }
    function failure(error) { return { type: trainingsConstants.GET_TRAINING_FAILURE, error } }
}

function getTrainingExercises(trainingId) {
    return dispatch => {
        dispatch(request());

        trainingsService.getTrainingExercises(trainingId)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success([]));
                    }
                }
            );
    };

    function request() { return { type: trainingsConstants.GET_TRAINING_EXERCISES_REQUEST } }
    function success(exercises) { return { type: trainingsConstants.GET_TRAINING_EXERCISES_SUCCESS, data: exercises } }
    function failure(error) { return { type: trainingsConstants.GET_TRAINING_EXERCISES_FAILURE, error } }
}


function getUserTrainings() {
    return dispatch => {
        dispatch(request());

        trainingsService.getUserTrainings()
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    if (error.errors) {
                        dispatch(failure(JSON.stringify(error)));
                        dispatch(alertActions.error(JSON.stringify(error)));
                    } else {
                        dispatch(success([]));
                    }
                }
            );
    };

    function request() { return { type: trainingsConstants.GET_USER_TRAININGS_REQUEST } }
    function success(trainings) { return { type: trainingsConstants.GET_USER_TRAININGS_SUCCESS, data: trainings} }
    function failure(error) { return { type: trainingsConstants.GET_USER_TRAININGS_FAILURE, error } }
}

function voteTraining(rating, feedback, trainingId) {
    return dispatch => {
        dispatch(request());

        trainingsService.voteTraining(rating, feedback, trainingId)
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

    function request() { return { type: trainingsConstants.VOTE_TRAINING_REQUEST } }
    function success() { return { type: trainingsConstants.VOTE_TRAINING_SUCCESS } }
    function failure(error) { return { type: trainingsConstants.VOTE_TRAINING_FAILURE, error } }
}