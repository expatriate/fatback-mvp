import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import Button from '../../components/button';

import voteIcon from '../../assets/svg/vote.svg';

import Navigation from '../../components/navigation';

class VotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vote: 0
        };
    }

    componentWillMount() {
        const { id } = this.props.match.params;
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

    handleSubmit() {

        const { vote, text } = this.state;

        if ( vote ) {
            console.log('TRY TO SEND VOTE', vote, text)
            this.props.history.push(`/trainings/`);
        }
    }

    render() {

        const { vote } = this.state;

        return (
            <div className="page vote-page">
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
                                    vote === 1 &&
                                    <span>Не почувствовал! Мне не понравилось(</span>
                                }
                                {
                                    vote === 2 &&
                                    <span>Могло быть и лучше!</span>
                                }
                                {
                                    vote === 3 &&
                                    <span>Все нормально!)</span>
                                }
                                {
                                    vote === 4 &&
                                    <span>Все хорошо! Мне понравилось)</span>
                                }
                                {
                                    vote === 5 &&
                                    <span>Все супер! Мне понравилось)</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="vote-page__bottom">
                        <textarea
                            placeholder="Напишите Ваши пожелания по тренировкам или работе нашего сервиса!"
                            className="vote-page__textarea"
                            onChange={(data) => this.hangleChange(data)}
                        />
                        <Button click={() => this.handleSubmit()} text="Отправить" styles={'light-blue-block big filled centered'}/>
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
            news: state.news,
        };
    }, mapDispatchToProps
)(VotePage);