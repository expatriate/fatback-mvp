import React from 'react';
import { Link } from 'react-router-dom';

function TrainingCard(props) {

    const { training, className, rest } = props;

    return (
        <div className={`training-card ${className}`} {...rest}>
            <Link to={`/trainings/${training.id}`}>
                {
                    training.wallpaper && <img className="training-card__image" src={training.wallpaper} alt="training wallpaper"/>
                }
                {
                    !training.wallpaper && <div className="training-card__image-null"></div>
                }
                <div className="training-card__time">
                    { training.duration_in_minutes } мин
                </div>
                <div className="training-card__title">
                    { training.title }
                </div>
                <div className="training-card__description">
                    { training.description }
                </div>
            </Link>
        </div>
    );
}

export default TrainingCard;
