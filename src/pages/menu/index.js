import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navigation from '../../components/navigation';

import coachesIcon from '../../assets/svg/coaches.menu.svg';
import aboutIcon from '../../assets/svg/about.menu.svg';
import testsIcon from '../../assets/svg/tests.menu.svg';
import logoutIcon from '../../assets/svg/logout.menu.svg';

import arrowIcon from '../../assets/svg/arrow.menu.svg';

import defaultAvatar from '../../assets/svg/default.avatar.svg';


class MenuPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }

    render() {

        const { avatar, first_name, last_name } = this.props.users.userdata;

        return (
            <div className="page menu-page">
                <div className="menu-page__content">
                    <h1 className="title">
                        Меню
                    </h1>
                        {
                            avatar &&
                            <div className="menu-page__avatar"> 
                                <img src={avatar} alt="user avatar"/>
                            </div>
                        }
                        {
                            !avatar && 
                            <div className="menu-page__avatar-null">
                                <div className="wrapper">
                                    <img src={defaultAvatar} alt="user avatar"/>
                                </div>
                            </div>
                        }
                    <h2 className="title yellow">
                        { first_name } { last_name }
                    </h2>
                    <div className="menu-page__block">
                        <Link to='/coaches' className="menu-page__link">
                            <img src={coachesIcon} alt="coaches menu icon" className="menu-page__icon"/>
                            <span>Тренеры</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                        <Link to="/about" className="menu-page__link">
                            <img src={aboutIcon} alt="about menu icon" className="menu-page__icon"/>
                            <span>О нас</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                        <Link to="/tests" className="menu-page__link">
                            <img src={testsIcon} alt="tests menu icon" className="menu-page__icon"/>
                            <span>Тесты</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                        <Link to="/login" className="menu-page__link">
                            <img src={logoutIcon} alt="logout menu icon" className="menu-page__icon"/>
                            <span>Выход</span>
                            <img src={arrowIcon} alt="arrowIcon menu icon"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

export default connect(
    state => {
        return {
            users: state.users,
        };
    }, mapDispatchToProps
)(MenuPage);
