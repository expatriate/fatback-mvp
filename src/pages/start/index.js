import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import logo from '../../assets/img/logo2x.png';

import LinkButton from '../../components/link-button';

class StartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="page start-page">
                <div className="page__container">
                    <div className="start-page__wrapper">
                        <div className="start-page__img-wrapper">
                            <img className="start-page__img" src={logo}/>
                        </div>
                        <h1 className="subtitle">
                            Будь&nbsp;сильным. Будь&nbsp;здоровым. Будь&nbsp;счастливым!
                        </h1>
                    </div>
                </div>
                <div className="page__bottom">
                    <LinkButton link="/login" text="Войти" styles={'yellow-block big filled centered'}/>
                    <LinkButton link="/register" text="Регистрация" styles={'yellow-block big bordered centered'}/>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
}

const connectedStartPage = connect(mapState, actionCreators)(StartPage);
export { connectedStartPage as StartPage };
