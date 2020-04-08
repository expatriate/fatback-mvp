import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Swiper from 'react-id-swiper';

import Navigation from '../../components/navigation';

class TrainingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'main'
        };
    }

    renderTrainingGroup(groupId) {

        const { items } = this.props.trainings;

        console.log()

        const groupTrainings = items.data.filter(el => (el.trainings_group_id === groupId));

        return(<Swiper
            slidesPerView='auto'
            >
            {
                groupTrainings.map((el, index) => {
                    return(<div key={`td_${index}`} className="training-group__swiper">
                        {el.title}
                    </div>)
                })
            }
        </Swiper>)
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
                        <React.Fragment>
                            <h2 className="subtitle">
                                Ваши&nbsp;тренировки&nbsp;на сегодня
                            </h2>

                            {
                                groups.data.map(group => {
                                    return(<div key={`tg_${group.id}`}>
                                        <div>
                                            <div>
                                                {group.icon}
                                            </div>
                                            <div>{group.title}</div>
                                        </div>
                                        { this.renderTrainingGroup(group.id) }
                                    </div>)
                                })
                            }
                        </React.Fragment>
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
