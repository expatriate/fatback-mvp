import { newsConstants } from '../constants';
import { newsService } from '../services';
import { alertActions } from './';
import { history } from '../helpers/history';

export const newsActions = {
    getNews
};

function getNews() {
    return dispatch => {
        dispatch(request());

        newsService.getNews()
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

    function request() { return { type: newsConstants.GET_NEWS_REQUEST } }
    function success(news) { return { type: newsConstants.GET_NEWS_SUCCESS, data: news } }
    function failure(error) { return { type: newsConstants.GET_NEWS_FAILURE, error } }
}
