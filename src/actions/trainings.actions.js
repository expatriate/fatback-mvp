import { trainingsConstants } from '../constants';
import { trainingsService } from '../services';
import { alertActions } from './';
import { history } from '../helpers/history';

export const trainingsActions = {
    getTrainings,
    getTrainingGroups
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
