import React, { useState, useEffect } from 'react';

function Button(props) {

    let [disabled, setDisabled] = useState(props.disabled);
    let [loading, setLoading] = useState(props.loading);

    useEffect(() => {
        setLoading(props.loading);
        setDisabled(props.disabled);        
    }, [props.disabled, props.loading])

    return (
        <div 
            className={`button ${props.styles}${disabled ? ' disabled' : ''}${loading ? ' loading' : ''}`}
            onClick={() => {
                if (!disabled && !loading) {
                    props.click();
                }}
            }
            tabIndex="0">
            <div className="button__container">
                {props.text}
            </div>
            <div className={'loading' + (loading ? ' visible' : ' hidden')}>
                <div className="lds-ellipsis">
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Button;
