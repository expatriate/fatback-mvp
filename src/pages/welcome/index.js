import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import welcomeBg from '../../assets/img/welcome-bg.jpg';

import LinkButton from '../../components/link-button';

class WelcomePage extends Component {
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
            <div className="page welcome-page" style={{ backgroundImage: `url(${welcomeBg})` }}>
{/*                <div className="welcome-page__img-wrapper">
                    <img className="welcome-page__img" src={welcomeBg}/>
                </div>*/}
                <div className="page__container">
                    <div className="welcome-page__wrapper">
                        <h1 className="title yellow">
                            Спасибо за регистрацию!
                        </h1>
                        <h2 className="subtitle">
                            Для определения подходящей программы тренировок, мы рекомендуем пройти Распределительный тест, в котором содержатся вопросы про ваше здоровье и&nbsp;текущее состояние
                        </h2>
                    </div>
                </div>
                <div className="page__bottom">
                    <LinkButton link="/test" text="Пройти тест" styles={'blue-block big filled centered no-text-transform'}/>
                    <LinkButton link="/home" text="Пройти потом" styles={'white-block big bordered centered no-text-transform'}/>
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

const connectedWelcomePage = connect(mapState, actionCreators)(WelcomePage);
export { connectedWelcomePage as WelcomePage };
