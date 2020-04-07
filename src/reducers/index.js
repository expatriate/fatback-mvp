import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { confirmation } from './confirmation.reducer';
import { reseting } from './reseting.reducer';
import { users } from './users.reducer';
import { trainings } from './trainings.reducer';
import { news } from './news.reducer';

export default combineReducers({
	alert,
	authentication,
    confirmation,
	registration,
    trainings,
    reseting,
	users,
    news,
});