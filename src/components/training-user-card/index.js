import React from 'react';
import { Link } from 'react-router-dom';

import timeIcon from '../../assets/svg/time.svg';
import dumbbellIcon from '../../assets/svg/dumbbell.svg';

function TrainingUserCard(props) {

    const { id, wallpaper, title, duration_in_minutes, level, exercises_quantity } = props.training;

    return (
        <div className="training-user-card">
            <Link to={`/trainings/${id}`} className="training-user-card__wrapper">
                {
                    wallpaper && <img className="training-user-card__image" src={wallpaper} alt="training wallpaper"/>
                }
                {
                    !wallpaper && <div className="training-user-card__image-null"></div>
                }
                <div className="training-user-card__block">
                    <div className="training-user-card__title">
                        { title }
                    </div>
                    <div className="training-user-card__info">
                        <div className="training-user-card__info-el">
                            <img src={timeIcon} alt="time" />
                            <span>
                                <span className="bold">{ duration_in_minutes }</span> мин
                            </span>
                        </div>
                        <div className="training-user-card__info-el">
                            <img src={dumbbellIcon} alt="number of exercises" />
                            <span>
                                <span className="bold">{ exercises_quantity }</span> упр
                            </span>
                        </div>
                        <div className="training-user-card__info-el column">
                            <span>
                                уровень
                            </span>
                            <div className={'training-user-card__level training-user-card__level' + (level)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default TrainingUserCard;
