import React, { useState, useEffect, useRef } from 'react';

function Counter(props) {

    let [seconds, setSeconds] = useState('');

    useEffect(() => {
        let time = Number(props.time) - Number(props.value);
        setSeconds(time <= 9 ? '0' + time : time) 
    }, [props.value, props.time]);

    return (
        <div className="counter">
            <span>00:{seconds}</span>
            <span>сек</span>
        </div>
    );
}

export default Counter;
