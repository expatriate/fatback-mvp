import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Swiper from 'react-id-swiper';

import TrainingCard from '../../components/training-card';

import Navigation from '../../components/navigation';

class TrainingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'main'
        };
    }

    renderTrainingGroup(group) {

        const { items } = this.props.trainings;
        const { id, icon, title } = group;

        const groupTrainings = items.data.filter(el => (el.trainings_group_id === id));

        if (groupTrainings && groupTrainings.length > 0) {
            return(
                <React.Fragment>
                    <div className="trainings-group">
                        {
                            icon && <img src={icon} className="trainings-group__icon" alt="training group image" />
                        }
                        <div className="trainings-group__title">
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
                </React.Fragment>
            )
        } else {
            return null
        }
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
                        <div className={'tabs__el' + (tab === 'main' ? ' active' : '')}>
                            <button onClick={() => this.setState({tab: 'main'})}>
                                основные
                            </button>
                        </div>
                        <div className={'tabs__el' + (tab === 'add' ? ' active' : '')}>
                            <button onClick={() => this.setState({tab: 'add'})}>
                                дополнительные
                            </button>
                        </div>
                    </div>
                </div>
                <div className="trainings-page__content">
                    {
                        tab === 'main' &&
                        <React.Fragment>
                            <h2 className="subtitle">
                                Ваши&nbsp;тренировки&nbsp;на сегодня
                            </h2>
                            {
                                
                            }
                        </React.Fragment>
                    }
                    {
                        tab === 'add' &&
                        groups.data.map(group => {
                            return(<div key={`tg_${group.id}`}>
                                { this.renderTrainingGroup(group) }
                            </div>)
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
)(TrainingsPage);
