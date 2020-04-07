import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { alertActions } from '../../actions';

import logo from '../../assets/img/logo.png';

import LinkButton from '../../components/link-button';
import Button from '../../components/button';
import FormInput from '../../components/form-input';
import FormPhone from '../../components/form-phone';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            code: '',
            phone: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
    }

    handleChange(e, code) {
        let { name, value } = e.target;
        if (code) {
            this.setState({ code: code });    
        }
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        this.props.clearAlerts();
        e && e.preventDefault();
        const { code,  phone, password } = this.state;

        console.log(code, phone, password)
        if (code && phone && password) {
            this.props.login(code, phone, password);
        }
    }

    handleHidden() {
        const { hidden } = this.state; 
        this.setState({
            hidden: !hidden
        });
    }

    render() {
        const { loggingIn, alert } = this.props;
        const { phone, password, submitted, hidden } = this.state;
        return (
            <div className="page login-page">
                <div className="page__container">
                    <div className="login-page__wrapper">
                        <div className="login-page__img-wrapper">
                            <img className="login-page__img" src={logo}/>
                        </div>
                        <h1 className="subtitle">
                            Авторизация
                        </h1>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <FormPhone 
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.phone : false}
                                name={'phone'}
                                value={phone}
                                label="Телефон"
                                type='text'
                                onChange={this.handleChange}
                            />
                            <FormInput 
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.password : false}
                                name={'password'}
                                value={password}
                                hidden={hidden}
                                handleHidden={this.handleHidden}
                                label="Пароль"
                                type='text'
                                onChange={this.handleChange}
                            />
                        </form>
                        <div className="login-page__forget-wrapper">
                            <LinkButton link="/restore-password" text="Забыли пароль?" styles={'yellow-text small'}/>
                        </div>
                    </div>
                </div>
                <div className="page__bottom">
                    <Button click={(e) => this.handleSubmit(e)} text="Войти" loading={loggingIn} styles={'yellow-block big filled centered'}/>
                    {
                        alert.message && alert.message.message &&
                        <div className={`alert alert-centered ${alert.type}`}>{alert.message.message}</div>
                    }
                    <div className="login-page__links">
                        <span>Впервые у нас?</span>
                        <LinkButton link="/register" text="Зарегистрироваться" styles={'grey-text small'}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return { 
        loggingIn,
        alert 
    };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };