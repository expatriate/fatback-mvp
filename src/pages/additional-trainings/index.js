import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import Swiper from 'react-id-swiper';

import TrainingCard from '../../components/training-card';

class AdditionalTrainingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    renderTrainingGroup(group) {

        const { items } = this.props.trainings;
        const { id, icon, title } = group;

        const groupTrainings = items.data && items.data.filter(el => (el.trainings_group_id === id)) || [];

        if (groupTrainings && groupTrainings.length > 0) {
            return(
                <div className="trainings-group__wrapper" key={`tg_${group.id}`}>
                    <div className="trainings-group">
                        {
                            icon && <img src={icon} className="trainings-group__icon" alt="training group image" />
                        }
                        <div className="trainings-group__title trainings-group__title-padded">
                            { title }
                        </div>
                    </div>
                    <Swiper slidesPerView='auto'>
                        {
                            groupTrainings.map((el, index) => {
                                return(<TrainingCard key={`td_${index}`} training={el} />);
                            })
                        }
                    </Swiper>
                </div>
            )
        } else {
            return null
        }
    }

    render() {

        const { items, groups } = this.props.trainings;

        return (
            <div className="page trainings-page">
                <div className="trainings-page__head">
                    <h1 className="title">
                        Тренировки
                    </h1>
                    <div className="tabs">
                        <div className="tabs__el">
                            <Link to="/trainings">
                                основные
                            </Link>
                        </div>
                        <div className="tabs__el active">
                            <Link to="/additional">
                                дополнительные
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="trainings-page__content">
                    {
                        groups.data && groups.data.map(group => {
                            return(this.renderTrainingGroup(group))
                        })
                    }
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
)(AdditionalTrainingsPage);
