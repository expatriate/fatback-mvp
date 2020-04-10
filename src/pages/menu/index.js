import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from '../../components/navigation';

import coachesIcon from '../../assets/svg/coaches.menu.svg';
import aboutIcon from '../../assets/svg/about.menu.svg';
import testsIcon from '../../assets/svg/tests.menu.svg';
import logoutIcon from '../../assets/svg/logout.menu.svg';

import arrowIcon from '../../assets/svg/arrow.menu.svg';


class MenuPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usr: 'Петр Петрович'
        };
    }

    render() {
        return (
            <div className="page menu-page">
                <div className="menu-page__content">
                    <h1 className="title">
                        Меню
                    </h1>
                    <div className="menu-page__avatar">
                        <img src={null} alt="user avatar"/>
                    </div>
                    <h2 className="title yellow">
                        {this.state.usr}
                    </h2>
                    <div className="menu-page__block">
                        <Link to='/coaches' className="menu-page__link">
                            <img src={coachesIcon} alt="coaches menu icon" className="menu-page__icon"/>
                            <span>Тренеры</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                        <Link to="/about" className="menu-page__link">
                            <img src={coachesIcon} alt="about menu icon" className="menu-page__icon"/>
                            <span>О нас</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                        <Link to="/tests" className="menu-page__link">
                            <img src={coachesIcon} alt="tests menu icon" className="menu-page__icon"/>
                            <span>Тесты</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                        <Link to="/login" className="menu-page__link">
                            <img src={coachesIcon} alt="logout menu icon" className="menu-page__icon"/>
                            <span>Выход</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {};

const connectedTestPage = connect(mapState, actionCreators)(MenuPage);

export { connectedTestPage as MenuPage };
