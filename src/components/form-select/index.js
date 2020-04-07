import React, { useState, useEffect } from 'react';

import arrow from '../../assets/svg/right-arrow.svg';

function Select(props) {

    let [error, setError] = useState(props.error);
    let [value, setValue] = useState(props.value);
    let [dirty, setDirty] = useState(false);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    useEffect(() => {
        if (props.value !== '') {
            setDirty(true);
        } else {
            setDirty(false)
        }
        setError(false)
    }, [props.value]);

    return (
        <div className="form-select">
            <div className="form-select__wrapper">
                <input 
                    type={props.type}
                    className={'form-control' + (dirty ? ' dirty' : '')}
                    name={props.name}
                    value={props.value}
                    readOnly={props.readonly}
                    onChange={e => {
                    }}
                    onClick={e => {
                        e.preventDefault()
                        props.onClick(e)
                    }}
                />
                <label htmlFor={props.name}>{props.label}</label>
                <div className="form-select__arrow">
                    <img src={arrow} />
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

export default Select;
