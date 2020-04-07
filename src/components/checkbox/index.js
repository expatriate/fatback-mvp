import React, { useState, useEffect, useRef } from 'react';

function Checkbox(props) {

    const [error, setError] = useState(props.error);

    const checkboxRef = useRef(null);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    return (
        <div className="checkbox">
            <div className="checkbox__wrapper">
                <input
                    className="checkbox__input"
                    type="checkbox"
                    name={props.name}
                    id={props.name}
                    onChange={(e) => {
                        setError(false);
                        props.onChange(e)
                    }}
                />
                <span className="checkbox__mark" onClick={() => checkboxRef.current.click()}></span>
                <label className="checkbox__label" ref={checkboxRef} htmlFor={props.name}>{props.label ? props.label : props.renderLabel ? props.renderLabel() : null}</label>
            </div>
            {
                error && error.map((err, index) => {
                    return(<div key={`ch_${props.name}_${index}`} className="alert alert-danger">{err}</div>)
                })
            }
        </div>
    );
}

export default Checkbox;
