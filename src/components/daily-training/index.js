import React, { useState, useEffect } from 'react';
import TrainingUserCard from '../training-user-card';


function DailyTraining(props) {

    const { items, groups, usertrainings } = props;

    const [trainings, setTrainings] = useState([]);
    const [groupTrainings, setGroupTrainings] = useState([]);

    useEffect(() => {
        if (items && items.length && usertrainings && usertrainings.length) {
            const ids = [];
            usertrainings.forEach(el => ids.push(el.id));
            setTrainings(items.filter(el => (ids.indexOf(el.id) >= 0)));
        }
    }, [props.usertrainings, items]);

    useEffect(() => {
        if (groups && groups.length && trainings && trainings.length) {
            const temp = [];
            groups.forEach(group => {
                const trainings_ = trainings.filter(el => (el.trainings_group_id === group.id)) || [];
                if (trainings_.length) {
                    temp.push({
                        group: group,
                        trainings: trainings_
                    })
                }
            })
            setGroupTrainings(temp);
        }
    }, [groups, trainings])

    return (
        <React.Fragment>
            {
                groupTrainings.map((el, index) => {
                    return(<div className="daily-training" key={`dtg_${el.group.id}_${index}`}>
                        <div className="trainings-group">
                            {
                                el.group.icon && <img src={el.group.icon} className="trainings-group__icon" alt="training group image" />
                            }
                            <div className="trainings-group__title">
                                { el.group.title }
                            </div>
                        </div>
                        {
                            el.trainings.map((training, index) => {
                                return(<TrainingUserCard key={`dtd_${index}`} training={training} />);
                            })
                        }
                    </div>)
                })
            }
        </React.Fragment>
    );
}

export default DailyTraining;
