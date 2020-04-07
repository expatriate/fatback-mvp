import React, { useState, useEffect } from 'react';

function GenderSelect(props) {

    const genders = [{
        icon: 'male',
        label: 'Мужской',
        value: 'male'
    }, {
        icon: 'female',
        label: 'Женский',
        value: 'female'
    }]

    let [value, setValue] = useState(props.value);
    let [dirty, setDirty] = useState(false);
    let [error, setError] = useState(props.error);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    useEffect(() => {
        if (props.value !== '') {
            setDirty(true);
            setValue(props.value);
        } else {
            setDirty(false)
            setValue(props.value);
        }
        setError(false)
    }, [props.value]);

    function renderContent() {
        return genders.map((el, index) => {
            return (<div className={'gender-select__item' + (el.value === value ? ' active ' : ' ') + el.icon} key={`gender_${index}`} tabIndex='0' onClick={() => {props.onChange(el)}}>
                    <div className='img'></div>
                    <span>
                        {el.label}
                    </span>
                </div>)
        })
    }
    return (
        <div className="gender-select">
            <div className="gender-select__wrapper">
                <div className={'gender-select__label' + (dirty ? ' filled' : '')}>
                    {props.label}
                </div>
                <div className='gender-select__container'>
                    { renderContent() }
                </div>
            </div>
            {
                error && error.map((err, index) => {
                    return(<div key={`ch_${props.name}_${index}`} className="alert alert-danger">{err}</div>)
                })
            }
        </div>
    );
}

export default GenderSelect;
