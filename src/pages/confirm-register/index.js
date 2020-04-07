import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { alertActions } from '../../actions';

import LinkButton from '../../components/link-button';
import Button from '../../components/button';
import FormInput from '../../components/form-input';

import Navigation from '../../components/navigation';
import FourInRow from '../../components/four-in-row';
import Counter from '../../components/counter';

import confirmBg from '../../assets/img/confirm-bg.jpg';

class ConfirmRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            submitted: false,
            counterTime: 30,
            counter: 0,
            sendAgain: false,
            sms_code: '',
        };

        this.counterInterval = null;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFill = this.handleFill.bind(this);
        this.getButtonDisabled = this.getButtonDisabled.bind(this); 
    }

    componentDidMount() {
        this.initializeInterval();        
    }

    initializeInterval() {
        this.counterInterval = setInterval(() => {
            let {counter, counterTime} = this.state;
            if (counter >= counterTime) {
                clearTimeout(this.counterInterval)
                this.setState({
                    sendAgain: true
                })
            } else {
                this.setState({
                    counter: counter + 1
                })
            }
        }, 1000)
    }

    componentWillUnmout() {
        clearTimeout(this.counterInterval);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e && e.preventDefault();

        const { phone, sms_code, sendAgain} = this.state;

        if (sendAgain && sms_code.length < 4) {
            this.props.repeatCode();
        } else if (sms_code) {
            this.props.confirmReg(phone, sms_code);
        }
    }

    handleFill(value) {
        this.props.clearAlerts();
        this.setState({
            sms_code: value
        });
    }

    getButtonDisabled() {
        let { sendAgain, sms_code} = this.state;
        if (sendAgain) {
            return false
        }
        if (sms_code.length === 4) {
            return false
        }
        return true
    }

    render() {
        const { confirmIn, alert } = this.props;
        const { username, password, submitted, counter, counterTime, sms_code} = this.state;
        return (
            <div className="page confirm-register-page">
                <Navigation
                    backbutton
                />
                <img className="confirm-register-page__bg" src={confirmBg} />
                <div className="confirm-register-page__container">
                    <h1 className="subtitle">
                        Регистрация
                    </h1>
                    <div className="confirm-register-page__text">
                        Для окончания регистрации введите код из&nbsp;смс, которое пришло к&nbsp;вам на телефон
                    </div>
                    <FourInRow
                        error={alert && alert.message && alert.message.errors ? alert.message.errors.sms_code : false}
                        onFill={this.handleFill}
                    />
                    <div className="confirm-register-page__text-lower">
                        Если вы не получили смс с подтверждением, то вы&nbsp;сможете отправить запрос на&nbsp;код&nbsp;повторно через
                    </div>
                    <Counter value={counter} time={counterTime}/>
                </div>
                <div className="page__bottom">
                    <Button 
                        disabled={this.getButtonDisabled()}
                        loading={confirmIn}
                        click={(e) => this.handleSubmit(e)}
                        text={sms_code.length === 4 ? "Готово!" : "Отправить код повторно"}
                        styles={'yellow-block big filled centered no-text-transform'}
                    />
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { confirmIn } = state.confirmation;
    const { alert } = state;
    return { 
        confirmIn,
        alert
    };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    confirmReg: userActions.confirmReg,
    repeatCode: userActions.repeatCode
};

const connectedConfirmRegisterPage = connect(mapState, actionCreators)(ConfirmRegisterPage);
export { connectedConfirmRegisterPage as ConfirmRegisterPage };