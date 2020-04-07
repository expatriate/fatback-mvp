import React, { useState, useEffect } from 'react';

import eye from '../../assets/svg/eye.svg';

function FormInput(props) {

    const [error, setError] = useState(props.error);
    const [validationError, setValidationError] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [tipDisplay, setTipDisplay] = useState(false);

    useEffect(() => {
        setError(props.error);
        setValidationError([]);
    }, [props.error]);

    useEffect(() => {
        if (props.value !== '') {
            setDirty(true);
        } else {
            setDirty(false);
        }
        setError(false);
    }, [props.value]);

    function handleFocus() {
        setTipDisplay(true);
    }

    function handleBlur() {
        setTipDisplay(false);
    }

    function handleChange(e) {

        const { validate, onChange } = props;
        onChange(e);
        if (validate) {
            const error_ = validate(e.target.value);
            if (error_) {
                setValidationError([error_]);
            } else {
                setValidationError([]);
            }
        }
    }

    const { styles, type, hidden, name, handleHidden, manualError, value, label, tip } = props;

    return (
        <div className={'form-group' + (error ? ' has-error' : '') + (styles ? ' ' + styles : '')}>
            <div className="form-group__wrapper">
                <input
                    type={type}
                    className={'form-control' + (dirty ? ' dirty' : '') + (!hidden && name === 'password' ? ' hidden-mask' : '')}
                    name={name}
                    value={value}
                    autoComplete='off'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <label htmlFor={name}>{label}</label>
                {
                    (name === 'password' || name === 'password_confirmation') &&
                    <div className={'form-control__hide-icon' + (hidden ? ' hidden' : '')} onClick={handleHidden}>
                        <img src={eye} alt="show-hidden"/>
                    </div>
                }
            </div>
            {
                tip && tipDisplay && <div className="alert alert-warning">
                    {tip}
                </div>
            }
            {
                error && error.map((err, index) => {
                    return (<div key={`fg_${name}_${index}`} className="alert alert-danger">{err}</div>);
                })
            }
            {
                dirty && manualError && manualError.map((err, index) => {
                    return (<div key={`fgm_${name}_${index}`} className="alert alert-danger">{err}</div>);
                })
            }
            {
                dirty && validationError && validationError.map((err, index) => {
                    return (<div key={`fgm_${name}_${index}`} className="alert alert-danger">{err}</div>);
                })
            }
        </div>
    );
}

export default FormInput;
