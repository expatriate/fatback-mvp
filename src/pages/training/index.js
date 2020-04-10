import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';

import { trainingsActions } from '../../actions';

import relaxIcon from '../../assets/svg/relax-time.svg';
import timeIcon from '../../assets/svg/time.svg';
import dumbbellIcon from '../../assets/svg/dumbbell.svg';

import Button from '../../components/button';
import Navigation from '../../components/navigation';
import VideoBlock from '../../components/video-block';
import Loading from '../../components/loading';

class TrainingPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.getTraining(id);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleEnd() {
        const { id } = this.props.match.params;
        this.props.history.push(`/trainings/${id}/vote`);
    }

    renderExercise(exercise, index) {
        const { id, title, description, work_time_in_seconds, relax_time_in_seconds, wallpaper } = exercise;
        const url = 'https://stage.api.beinsport.ru/storage/';
        return(<div key={`ex_${index}`} className="exercise-line">
                <div className="exercise-line__number">
                    {index + 1}
                </div>
                <div className="exercise-line__image">
                    <img src={url + wallpaper} alt="exercise image" />
                </div>
                <div className="exercise-line__content">
                    <div className="exercise-line__description">
                        { description }
                    </div>
                    <div className="exercise-line__info">
                        <img src={relaxIcon} alt="work time" />
                        <span className="exercise-line__label">
                            Время&nbsp;работы и&nbsp;отдыха 
                        </span>
                        <span className="exercise-line__work-time">
                            {work_time_in_seconds}/
                        </span>
                        <span className="exercise-line__relax-time">
                            {relax_time_in_seconds}
                        </span>
                        <span className="exercise-line__label-time">
                            сек
                        </span>
                    </div>
                </div>
            </div>)
    }

    render() {

        const { training } = this.props.trainings;

        return (
            <div className="page training-page">
                {
                    training.data ?
                    <React.Fragment>
                        <Navigation 
                            backbutton
                            title="Тренировки"
                        />
                        <div className="training-page__content-blue">
                            <VideoBlock
                                source={training.data.video_link}
                                layout={() => {
                                    return(<div className="video-block__layout">
                                        <div className="video-block__content">
                                            <h1 className="video-block__title">
                                                { training.data.title }
                                            </h1>
                                            <div className="video-block__info">
                                                <div className="video-block__info-el">
                                                    <img src={timeIcon} alt="time" />
                                                    <span>
                                                        <span className="bold">{ training.data.duration_in_minutes }</span> мин
                                                    </span>
                                                </div>
                                                <div className="video-block__info-el">
                                                    <img src={dumbbellIcon} alt="number of exercises" />
                                                    <span>
                                                        <span className="bold">{ training.data.exercises.length }</span> упр
                                                    </span>
                                                </div>
                                                <div className="video-block__info-el column">
                                                    <span>
                                                        уровень
                                                    </span>
                                                    <div className={'video-block__level video-block__level' + (training.data.level)}>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                }}/>
                            <h2 className="training-page__dtitle">
                                Описание тренировки
                            </h2>
                            <div className="training-page__description">
                                { training.data && training.data.description }
                            </div>
                        </div>
                        <div className="training-page__content">
                            <h2 className="training-page__dtitle blue">
                                Список упражнений
                            </h2>
                            {
                                training.data && training.data.exercises.map((el, index) => {
                                    return this.renderExercise(el, index)
                                })
                            }
                            <div className="training-page__buttons">
                                <Button click={() => this.handleEnd()} text="Закончить тренировку" styles={'yellow-block big filled centered'}/>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <Loading />
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTraining: trainingsActions.getTraining,
        getTrainingExercises: trainingsActions.getTrainingExercises,
    }, dispatch)
}

export default connect(
    state => {
        return {
            trainings: state.trainings,
        };
    }, mapDispatchToProps
)(TrainingPage);
