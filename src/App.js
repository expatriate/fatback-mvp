import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import { alertActions } from './actions';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ConfirmRegisterPage } from './pages/confirm-register';
import { RestorePasswordPage } from './pages/restore-password';
import { WelcomePage } from './pages/welcome';
import { TestPage } from './pages/test';
import { StartPage } from './pages/start';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={StartPage} />
                        <Route path="/login" exact component={LoginPage} />
                        <Route path="/register" exact component={RegisterPage} />
                        <Route path="/confirm-registration" exact component={ConfirmRegisterPage} />
                        <Route path="/restore-password" exact component={RestorePasswordPage} />
                        <Route path="/welcome" exact component={WelcomePage} />
                        <Route path="/test" exact component={TestPage} />
                        <PrivateRoute path="/home" component={HomePage} />
                        <Redirect from="*" to="/login" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };