import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { alertActions } from '../../actions';

import LinkButton from '../../components/link-button';
import Button from '../../components/button';
import FormInput from '../../components/form-input';
import FormPhone from '../../components/form-phone';

import Navigation from '../../components/navigation';
import FourInRow from '../../components/four-in-row';
import Counter from '../../components/counter';

import confirmBg from '../../assets/img/restore-bg.jpg';

class RestorePasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            phone: '',
            password: '',
            'password_confirmation': '',
            'sms_code': '',
            counterTime: 45,
            counter: 0,
            sendAgain: false,
        };

        this.counterInterval = null;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleFill = this.handleFill.bind(this);
        this.getButtonDisabled = this.getButtonDisabled.bind(this);
    }

    initializeInterval() {
        this.setState({counter: 0, sendAgain: false });
        clearTimeout(this.counterInterval);
        this.counterInterval = setInterval(() => {
            let {counter, counterTime} = this.state;
            if (counter >= counterTime) {
                clearTimeout(this.counterInterval);
                this.setState({
                    sendAgain: true
                });
            } else {
                this.setState({
                    counter: counter + 1
                });
            }
        }, 1000);
    }

    componentWillMount() {
        const { clearResetData } = this.props;
        clearResetData();
        this.setState({
            code: '',
            phone: '',
            password: '',
            'password_confirmation': '',
            'sms_code': '',
            counterTime: 45,
            counter: 0,
            sendAgain: false,
        });
        this.initializeInterval();
    }

    componentWillUnmount() {
        clearTimeout(this.counterInterval);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.requested && nextProps.requested) {
            this.initializeInterval();
        }
    }

    handleChange(e, code) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            if (code) {
                this.setState({
                    code: code
                });
            }
        });
    }

    handleSubmit(e) {
        e && e.preventDefault();

        const { sms_code } = this.state;
        const { requestPasswordReset, requestCodeReset, requestCodeResetRetry, restorePassword, requested, confirmed } = this.props;

        if (!requested && !confirmed) {
            const { code, phone } = this.state;
            requestPasswordReset(code, phone);
        }

        if (requested && !confirmed && sms_code.length < 4) {
            // eslint-disable-next-line
            const { code, phone, sms_code } = this.state;
            requestCodeResetRetry(code, phone);
            this.initializeInterval();
        }

        if (requested && !confirmed && sms_code.length === 4) {
            // eslint-disable-next-line
            const { code, phone, sms_code } = this.state;
            requestCodeReset(code, phone, sms_code);
        }

        if (confirmed) {
            // eslint-disable-next-line
            const { password, password_confirmation } = this.state;
            restorePassword(password, password_confirmation);
        }
    }

    handleFill(value) {
        this.props.clearAlerts();
        this.setState({
            'sms_code': value
        });
    }

    handleHidden() {
        const { hidden } = this.state;
        this.setState({
            hidden: !hidden
        });
    }

    getButtonDisabled() {
        // eslint-disable-next-line
        let { sendAgain, sms_code} = this.state;
        if (sendAgain) {
            return false;
        }
        // eslint-disable-next-line
        if (sms_code.length === 4) {
            return false;
        }
        return true;
    }

    render() {
        let { requesting, requested, confirming, confirming_retry, confirmed, reseting, reseted, alert } = this.props;
        // eslint-disable-next-line
        const { password, password_confirmation, phone, counter, counterTime, sms_code, hidden } = this.state;
        return (
            <div className="page restore-password-page">
                <Navigation
                    backbutton
                />
                <img className="restore-password-page__bg" src={confirmBg} alt=""/>
                <div className="restore-password-page__container">
                    {
                        !requested && !confirmed && <React.Fragment>
                            <h1 className="subtitle">
                                Забыли пароль?
                            </h1>
                            <div className="restore-password-page__type1">
                                <div className="restore-password-page__text">
                                    Введите номер телефона, который Вы указывали при регистрации
                                </div>
                                <FormPhone
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.phone : false}
                                    name={'phone'}
                                    styles={'dark'}
                                    value={phone}
                                    label="Телефон"
                                    type='phone'
                                    onChange={this.handleChange}
                                />
                            </div>
                        </React.Fragment>
                    }
                    {
                        requested && !confirmed && <React.Fragment>
                            <h1 className="subtitle">
                                Забыли пароль?
                            </h1>
                            <div className="restore-password-page__type1">
                                <div className="restore-password-page__text">
                                    Для окончания процесса восстановления пароля введите код из смс, которое пришло к вам на телефон
                                </div>
                                <FourInRow
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.sms_code : false}
                                    onFill={this.handleFill}
                                />
                                <div className="restore-password-page__text-lower">
                                    Если вы не получили смс с подтверждением, то вы&nbsp;сможете отправить запрос на&nbsp;код&nbsp;повторно через
                                </div>
                                <Counter value={counter} time={counterTime}/>
                            </div>
                        </React.Fragment>
                    }
                    {
                        confirmed && <React.Fragment>
                            <h1 className="subtitle">
                                Введите новый пароль
                            </h1>
                            <div className="restore-password-page__type1">
                                <FormInput
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.password : false}
                                    name={'password'}
                                    styles={'dark'}
                                    value={password}
                                    label="Пароль"
                                    hidden={hidden}
                                    handleHidden={this.handleHidden}
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <FormInput
                                    // eslint-disable-next-line
                                    manualError={password !== password_confirmation ? ['Пароли не совпадают'] : false}
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.password_confirmation : false}
                                    name={'password_confirmation'}
                                    styles={'dark'}
                                    // eslint-disable-next-line
                                    value={password_confirmation}
                                    label="Подтверждение пароля"
                                    hidden={hidden}
                                    handleHidden={this.handleHidden}
                                    type='text'
                                    onChange={this.handleChange}
                                />
                            </div>
                        </React.Fragment>
                    }
                </div>
                <div className="page__bottom">
                    {
                        !requested && !confirmed && <Button
                            loading={requesting}
                            click={(e) => this.handleSubmit(e)}
                            text='Отправить смс подтверждение'
                            styles={'yellow-block big filled centered no-text-transform'}
                        />
                    }
                    {
                        requested && !confirmed && <Button
                            loading={confirming || confirming_retry}
                            disabled={this.getButtonDisabled()}
                            click={(e) => this.handleSubmit(e)}
                            // eslint-disable-next-line
                            text={sms_code.length === 4 ? 'Готово!' : 'Отправить код повторно'}
                            styles={'yellow-block big filled centered no-text-transform'}
                        />
                    }
                    {
                        confirmed && <Button
                            loading={reseting}
                            click={(e) => this.handleSubmit(e)}
                            text='Готово!'
                            styles={'yellow-block big filled centered no-text-transform'}
                        />
                    }
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { phone, requesting, requested, confirming, confirming_retry, confirmed, reseting, reseted } = state.reseting;
    const { alert } = state;
    return {
        phone,
        requesting,
        requested,
        confirming,
        confirmed,
        confirming_retry,
        reseting,
        reseted,
        alert
    };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    restorePassword: userActions.restorePassword,
    requestCodeReset: userActions.requestCodeReset,
    requestCodeResetRetry: userActions.requestCodeResetRetry,
    requestPasswordReset: userActions.requestPasswordReset,
    clearResetData: userActions.clearResetData
};

const connectedRestorePasswordPage = connect(mapState, actionCreators)(RestorePasswordPage);
export { connectedRestorePasswordPage as RestorePasswordPage };
