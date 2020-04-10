import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import Button from '../../components/button';

import voteIcon from '../../assets/svg/vote.svg';

import Navigation from '../../components/navigation';
import Loading from '../../components/loading';

import { trainingsActions } from '../../actions';

class VotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vote: 0,
            text: ''
        };
    }

    setVote(vote) {
        this.setState({
            vote: vote
        })
    }

    hangleChange(e) {

        this.setState({
            text: e.target.value 
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.trainings.usertraining.data.length && !this.props.trainings.usertraining.data.length) {

            const { id } = this.props.match.params;
            const exists = nextProps.trainings.usertraining.data.find(el => el.id === Number(id));
            if (exists) {
                this.setState({
                    voted: true
                });
            }
        }
    }

    handleSubmit() {

        const { vote, text } = this.state;
        const { id } = this.props.match.params;

        if (vote) {
            this.props.voteTraining(vote, text, id);
            this.props.history.push(`/trainings/`);
        }
    }

    renderVoteText(vote) {
        switch(vote) {
            case 1:
                return(<span>Мне совсем не понравилось(</span>)
            case 2:
                return(<span>Есть классные идеи, но многое не понравилось</span>)
            case 3:
                return(<span>В общем хорошо, но пара моментов не понравилась</span>)
            case 4:
                return(<span>Отлично, но кое-что можно улучшить!</span>)
            case 5:
                return(<span>Все супер! Мне понравилось)</span>)
            default:
                return(null)
        }
    }

    render() {

        const { vote } = this.state;
        const { voting, usertraining } = this.props.trainings;

        return (
            <div className="page vote-page">
            {
                usertraining.data.length ?
                <div className="vote-page__content">
                    <div className="vote-page__top">
                        <div className="vote-page__block">
                            <div className="vote-page__image-wrapper">
                                <img src={voteIcon} alt="good job" className="vote-page__image"/>
                            </div>
                            <h2 className="vote-page__title">
                                Ты молодец!
                            </h2>
                            <div className="vote-page__subtitle">
                                Спасибо&nbsp;за&nbsp;выполнение тренировки!
                            </div>
                        </div>
                        <div className="vote-page__block">
                            <div className="vote-page__text">
                                Оцените, пожалуйста, тренировку
                            </div>
                            <div className="vote-page__stars">
                                <button className={'vote-page__star' + (vote >= 1 ? ' active' : '')} onClick={() => {this.setVote(1)}}/>
                                <button className={'vote-page__star' + (vote >= 2 ? ' active' : '')} onClick={() => {this.setVote(2)}}/>
                                <button className={'vote-page__star' + (vote >= 3 ? ' active' : '')} onClick={() => {this.setVote(3)}}/>
                                <button className={'vote-page__star' + (vote >= 4 ? ' active' : '')} onClick={() => {this.setVote(4)}}/>
                                <button className={'vote-page__star' + (vote >= 5 ? ' active' : '')} onClick={() => {this.setVote(5)}}/>
                            </div>
                            <div className="vote-page__stars-descr">
                                {
                                    this.renderVoteText(vote)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="vote-page__bottom">
                        <textarea
                            placeholder="Напишите Ваши пожелания по тренировкам или работе нашего сервиса!"
                            className="vote-page__textarea"
                            value={this.state.value}
                            onChange={(data) => this.hangleChange(data)}
                        />
                        <Button click={() => this.handleSubmit()} text="Отправить" loading={voting} styles={'light-blue-block big filled centered'}/>
                    </div>
                </div>
                :
                <Loading />
            }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        voteTraining: trainingsActions.voteTraining,
    }, dispatch)
}

export default connect(
    state => {
        return {
            trainings: state.trainings,
        };
    }, mapDispatchToProps
)(VotePage);