import React from 'react';
import { Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { trainingsActions } from '../../actions';
import { newsActions } from '../../actions';

import TrainingsPage from '../../pages/trainings';
import TrainingPage from '../../pages/training';
import NewsPage from '../../pages/news';
import { MenuPage } from '../../pages/menu';

import menuIcon from '../../assets/svg/menu.svg';
import menuIcon_active from '../../assets/svg/menu_active.svg';
import newsIcon from '../../assets/svg/news.svg';
import newsIcon_active from '../../assets/svg/news_active.svg';
import trainingsIcon from '../../assets/svg/trainings.svg';
import trainingsIcon_active from '../../assets/svg/trainings_active.svg';

class HomePage extends React.Component {

    constructor() {
        super();

        this.state = {
            tab: ''
        }
    }

    componentDidMount() {

        this.props.getTrainings();
        this.props.getTrainingGroups();
        this.props.getNews();

        let tab = '';

        if (this.props.location.pathname.indexOf('menu') > 0) {
            tab = 'menu'
        }
        if (this.props.location.pathname.indexOf('news') > 0) {
            tab = 'news'
        }
        if (this.props.location.pathname.indexOf('trainings') > 0) {
            tab = 'trainings'
        }

        this.setState({
            tab: tab
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.location.pathname !== this.props.location.pathname) {
            let tab = '';
            if (nextProps.location.pathname.indexOf('menu') > 0) {
                tab = 'menu'
            }
            if (nextProps.location.pathname.indexOf('news') > 0) {
                tab = 'news'
            }
            if (nextProps.location.pathname.indexOf('trainings') > 0) {
                tab = 'trainings'
            }
            this.setState({
                tab: tab
            });
        }
    }

    render() {

        const { tab } = this.state;

        return (
            <div className="page home-page">
                <div className="content">
                    <Switch>
                        <Route path="/trainings" exact component={TrainingsPage} />
                        <Route path="/news" component={NewsPage} />
                        <Route path="/menu" component={MenuPage} />
                        <Route path="/trainings/:id" component={TrainingPage} />
                    </Switch>
                </div>
                <div className="footer">
                    <div className="footer-tabs">
                        <div className="footer-tabs__el">
                            <NavLink
                                to="/menu"
                                activeClassName="active">
                                <button>
                                    {
                                        tab && tab === 'menu' ? 
                                        <img src={menuIcon_active} alt="menu"/>
                                        :
                                        <img src={menuIcon} alt="menu"/>
                                    }
                                    <span>Меню</span>
                                </button>
                            </NavLink>
                        </div>
                        <div className="footer-tabs__el">
                            <NavLink
                                to="/trainings"
                                activeClassName="active">
                                <button>
                                    {
                                        tab && tab === 'trainings' ? 
                                        <img src={trainingsIcon_active} alt="trainings"/>
                                        :
                                        <img src={trainingsIcon} alt="trainings"/>
                                    }
                                    <span>Тренировки</span>
                                </button>
                            </NavLink>
                        </div>
                        <div className="footer-tabs__el">   
                            <NavLink
                                to="/news"
                                activeClassName="active">
                                <button>
                                    {
                                        tab && tab === 'news' ? 
                                        <img src={newsIcon_active} alt="news"/>
                                        :
                                        <img src={newsIcon} alt="news"/>
                                    }
                                    <span>Лента</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    getTrainings: trainingsActions.getTrainings,
    getTrainingGroups: trainingsActions.getTrainingGroups,
    getNews: newsActions.getNews
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };