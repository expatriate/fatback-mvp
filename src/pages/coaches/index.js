import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Swiper from 'react-id-swiper';

import Navigation from '../../components/navigation';

import coach1 from '../../assets/img/coach1.jpg';
import coach2 from '../../assets/img/coach2.jpg';
import coach3 from '../../assets/img/coach3.jpg';
import coachAva from '../../assets/img/coach_ava.jpg';
import applyIcon from '../../assets/svg/apply.svg';

class CoachesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="page coaches-page">
                <Navigation
                    backbutton
                    title={' '}
                />
                <div className="coaches-page__content">
                    <h1 className="title">
                        Тренеры
                    </h1>
                    <div className="coach">
                        <div className="coach__avatar">
                            <img src={coachAva} alt="coach avatar" />
                        </div>
                        <div className="coach__name">
                            Анастасия Иванова
                        </div>
                        <div className="coach__links">
                            <span>
                                Instagram
                            </span>
                            <span>
                                Facebook
                            </span>
                        </div>
                        <div className="coach-points">
                            <div className="coach-points__el">
                                <img src={applyIcon} alt="icon"/>
                                <span>
                                    Опыт тренировок в зале 26 лет
                                </span>
                            </div>
                            <div className="coach-points__el">
                                <img src={applyIcon} alt="icon"/>
                                <span>
                                    Чемпион России 2019 в категории Атлетик
                                </span>
                            </div>
                        </div>
                        <div className="coach__text">
                            “Считаю, что тело должно быть максимально функциональным и здоровым, поэтому использую все виды нагрузок. Нахожусь в постоянном развитии и подхожу к тренингу с умом. Будем знакомы!”
                        </div>
                        <div className="coach__slider">
                            <Swiper slidesPerView="auto">
                                <img src={coach1} alt="coach"/>
                                <img src={coach2} alt="coach"/>
                                <img src={coach3} alt="coach"/>
                            </Swiper>
                        </div>
                    </div>
                    <div className="coach">
                        <div className="coach__avatar">
                            <img src={coachAva} alt="coach avatar" />
                        </div>
                        <div className="coach__name">
                            Анастасия Иванова
                        </div>
                        <div className="coach__links">
                            <span>
                                Instagram
                            </span>
                            <span>
                                Facebook
                            </span>
                        </div>
                        <div className="coach-points">
                            <div className="coach-points__el">
                                <img src={applyIcon} alt="icon"/>
                                <span>
                                    Опыт тренировок в зале 26 лет
                                </span>
                            </div>
                            <div className="coach-points__el">
                                <img src={applyIcon} alt="icon"/>
                                <span>
                                    Чемпион России 2019 в категории Атлетик
                                </span>
                            </div>
                        </div>
                        <div className="coach__text">
                            “Считаю, что тело должно быть максимально функциональным и здоровым, поэтому использую все виды нагрузок. Нахожусь в постоянном развитии и подхожу к тренингу с умом. Будем знакомы!”
                        </div>
                        <div className="coach__slider">
                            <Swiper slidesPerView="auto">
                                <img src={coach1} alt="coach"/>
                                <img src={coach2} alt="coach"/>
                                <img src={coach3} alt="coach"/>
                            </Swiper>
                        </div>
                    </div>
                    <div className="coach">
                        <div className="coach__avatar">
                            <img src={coachAva} alt="coach avatar" />
                        </div>
                        <div className="coach__name">
                            Анастасия Иванова
                        </div>
                        <div className="coach__links">
                            <span>
                                Instagram
                            </span>
                            <span>
                                Facebook
                            </span>
                        </div>
                        <div className="coach-points">
                            <div className="coach-points__el">
                                <img src={applyIcon} alt="icon"/>
                                <span>
                                    Опыт тренировок в зале 26 лет
                                </span>
                            </div>
                            <div className="coach-points__el">
                                <img src={applyIcon} alt="icon"/>
                                <span>
                                    Чемпион России 2019 в категории Атлетик
                                </span>
                            </div>
                        </div>
                        <div className="coach__text">
                            “Считаю, что тело должно быть максимально функциональным и здоровым, поэтому использую все виды нагрузок. Нахожусь в постоянном развитии и подхожу к тренингу с умом. Будем знакомы!”
                        </div>
                        <div className="coach__slider">
                            <Swiper slidesPerView="auto">
                                <img src={coach1} alt="coach"/>
                                <img src={coach2} alt="coach"/>
                                <img src={coach3} alt="coach"/>
                            </Swiper>
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
};

const connectedTestPage = connect(mapState, actionCreators)(CoachesPage);
export { connectedTestPage as CoachesPage };