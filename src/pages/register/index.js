import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { alertActions } from '../../actions';

import LinkButton from '../../components/link-button';
import Button from '../../components/button';
import FormInput from '../../components/form-input';
import GenderSelect from '../../components/gender-select';
import FormSelect from '../../components/form-select';
import FormPhone from '../../components/form-phone';
import FormFile from '../../components/form-file';
import Checkbox from '../../components/checkbox';

import Modal from '../../components/modal';
import CompanyModalData from '../../components/modal/company-modal-data';

import SwipeActions from '../../helpers/swipe-actions';

import defaultAvatar from '../../assets/img/default-avatar.png';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                first_name: '',
                last_name: '',
                phone: '',
                password: '',
                password_confirmation: '',
                sex: '',
                company: '',
                age: '',
                personal_data_processing: false,
                terms_of_use: false,
            },
            companies:[{
                id: 1,
                name: 'Газпром Нефть',
                value: 'gazprom_oil'
            },{
                id: 2,
                name: 'Газпром Банк',
                value: 'gazprom_bank'
            }],
            hidden: false,

            selectModal: {
                opened: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openSelectModal = this.openSelectModal.bind(this);
        this.closeSelectModal = this.closeSelectModal.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleCompanySelect = this.handleCompanySelect.bind(this);
        this.handleCompanyReset = this.handleCompanyReset.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleChangeGender(el) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                sex: el.value
            }
        })
    }

    handleChange(event, code) {
        const { name, value } = event.target;
        const { user } = this.state;

        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        }, () => {
            if (code) {
                this.setState({
                    user: {
                        ...this.state.user,
                        code: code
                    }
                })
            }
        });
    }

    openSelectModal() {
        const { selectModal } = this.state;

        SwipeActions.addAction({
            type: 'right',
            f: () => {
                this.closeSelectModal();
            }
        });

        this.setState({
            selectModal: {
                ...selectModal,
                opened: true
            }
        })
    }

    closeSelectModal() {
        const { selectModal } = this.state;

        SwipeActions.clearAction('right');

        this.setState({
            selectModal: {
                ...selectModal,
                opened: false
            }
        })
    }

    handleCompanySelect(company) {
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                company: company
            }
        }, () => {
            this.closeSelectModal();
        })
    }

    handleCompanyReset() {
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                company: ''
            }
        })
    }

    handleSubmit(e) {
        e && e.preventDefault();

        const { user } = this.state;
        this.props.register(user);
    }

    handleFileChange(file) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                avatar: file
            }
        });
    }

    handleHidden() {
        const { hidden } = this.state; 
        this.setState({
            hidden: !hidden
        });
    }

    render() {
        const { registering, alert } = this.props;
        const { user, hidden } = this.state;
        return (
            <div className={'page register-page'}>
                <Modal 
                    opened={this.state.selectModal.opened}
                    closeModal={() => this.closeSelectModal()}
                    title="Компания"
                    >
                    <CompanyModalData 
                        companies={this.state.companies}
                        value={this.state.user.company} 
                        onSelect={(company) => this.handleCompanySelect(company)}
                        onReset={() => this.handleCompanyReset()}
                    />
                </Modal>
                <div className="page__container">
                    <div className="register-page__wrapper">
                        <h1 className="subtitle">
                            Регистрация
                        </h1>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className="register-page__img-wrapper">
                                <FormFile
                                    styles='register-page__img'
                                    changeFile={this.handleFileChange}
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.avatar : false}
                                    image={defaultAvatar}
                                />
                            </div>
                            <FormPhone 
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.phone : false}
                                name={'phone'}
                                value={user.phone}
                                label="Телефон"
                                type='text'
                                validate={(val) => {
                                    if (Number(val) <= 0) {
                                        return 'Неверный формат телефона'
                                    }
                                }}
                                onChange={this.handleChange}
                            />
                            <div className="row">
                                <FormInput 
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.first_name : false}
                                    name={'first_name'}
                                    value={user.first_name}
                                    label="Имя"
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <FormInput 
                                    error={alert && alert.message && alert.message.errors ? alert.message.errors.last_name : false}
                                    name={'last_name'}
                                    value={user.last_name}
                                    label="Фамилия"
                                    type='text'
                                    onChange={this.handleChange}
                                />
                            </div>
                            <GenderSelect
                                label='Пол'
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.sex : false}
                                value={user.sex}
                                values={this.state.genders}
                                onChange={this.handleChangeGender}
                            />
                            <FormInput 
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.age : false}
                                name={'age'}
                                value={user.age}
                                validate={(val) => {
                                    if (Number(val) <= 0) {
                                        return 'Значение возраста должно быть больше нуля'
                                    }
                                }}
                                label="Возраст"
                                type='number'
                                onChange={this.handleChange}
                            />
                            <FormSelect 
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.company_id : false}
                                value={user.company ? user.company.name : ''}
                                values={this.state.companies}
                                label="Компания"
                                onClick={this.openSelectModal}
                                readonly
                            />
                            <FormInput 
                                manualError={!user.password ? ['Пароли не совпадают'] : false}
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.password : false}
                                name={'password'}
                                value={user.password}
                                label="Пароль"
                                hidden={hidden}
                                handleHidden={this.handleHidden}
                                tip='Обязательно наличие двух цифр и одной заглавной буквы'
                                type='text'
                                onChange={this.handleChange}
                            />
                            <FormInput 
                                manualError={user.password !== user.password_confirmation ? ['Пароли не совпадают'] : false}
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.password_confirmation : false}
                                name={'password_confirmation'}
                                value={user.password_confirmation}
                                label="Подтверждение пароля"
                                hidden={hidden}
                                handleHidden={this.handleHidden}
                                tip='Обязательно наличие двух цифр и одной заглавной буквы'
                                type='text'
                                onChange={this.handleChange}
                            />
                            <Checkbox
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.personal_data_processing : false}
                                renderLabel={() => {
                                    return(<div>
                                            Ставя эту отметку, я даю свое согласие на обработку моих персональных данных, 
                                            в соответствии с Федеральным законом №152-ФЗ <a href=''>«О персональных данных»</a> от&nbsp;27.07.2006&nbsp;года
                                    </div>)}
                                }
                                onChange={this.handleChange}
                                name='personal_data_processing'
                            />
                            <Checkbox
                                error={alert && alert.message && alert.message.errors ? alert.message.errors.terms_of_use : false}
                                renderLabel={() => {
                                    return(<div>
                                            Ставя эту отметку, я соглашаюсь с <a href="">Правилами&nbsp;использования&nbsp;сервиса</a>
                                    </div>)}
                                }
                                onChange={this.handleChange}
                                name='terms_of_use'
                            />
                        </form>
                    </div>
                </div>
                <div className="page__bottom">
                    <Button click={(e) => this.handleSubmit(e)} text="Зарегистрироваться" loading={registering} styles={'yellow-block big filled centered'}/>
                    <div className="register-page__links">
                        <span>Уже зарегистрированы?</span>
                        <LinkButton link="/login" text="Войти" styles={'grey-text small'}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    const { alert } = state;
    return {
        registering,
        alert
    };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    register: userActions.register
}


const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };