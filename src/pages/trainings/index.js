import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import Swiper from 'react-id-swiper';

import TrainingCard from '../../components/training-card';

class TrainingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {

        const { tab } = this.state;
        const { items, groups } = this.props.trainings;

        return (
            <div className="page trainings-page">
                <div className="trainings-page__head">
                    <h1 className="title">
                        Тренировки
                    </h1>
                    <div className="tabs">
                        <div className='tabs__el active'>
                            <Link to="/trainings">
                                основные
                            </Link>
                        </div>
                        <div className='tabs__el'>
                            <Link to="/additional">
                                дополнительные
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="trainings-page__content">
                    <h2 className="subtitle">
                        Ваши&nbsp;тренировки&nbsp;на сегодня
                    </h2>
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
            trainings: state.trainings,
        };
    }, mapDispatchToProps
)(TrainingsPage);
