import React, { useState, useEffect, useRef } from 'react';

function FourInRow(props) {

    let [first, setFirst] = useState('');
    let [second, setSecond] = useState('');
    let [third, setThird] = useState('');
    let [fourth, setFourth] = useState('');
    let [error, setError] = useState(props.error);

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);
    const fourthRef = useRef(null);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    useEffect(() => {
        props.onFill(first + second + third + fourth)
    }, [first, second, third, fourth]);

    return (
        <div className="four-in-row">
            <div className="four-in-row__wrapper">
                <input
                    maxLength="1"
                    type="number"
                    onFocus={() => {
                        setFirst('');
                    }}
                    onChange={(e) => {
                        setFirst(e.target.value);
                        if (!second) {
                            secondRef.current.focus();
                        }
                    }}
                    value={first}
                    ref={firstRef}
                />
                <input
                    maxLength="1"
                    type="number"
                    onFocus={() => {
                        setSecond('');
                    }}
                    onChange={(e) => {
                        setSecond(e.target.value);
                        if (!third) {
                            thirdRef.current.focus();
                        }
                    }}
                    value={second}
                    ref={secondRef}
                />
                <input
                    maxLength="1"
                    type="number"
                    onFocus={() => {
                        setThird('');
                    }}
                    onChange={(e) => {
                        setThird(e.target.value);
                        if (!fourth) {
                            fourthRef.current.focus();
                        }
                    }}
                    value={third}
                    ref={thirdRef}
                />
                <input
                    maxLength="1"
                    type="number"
                    onFocus={() => {
                        setFourth('');
                    }}
                    onChange={(e) => {
                        setFourth(e.target.value);
                        fourthRef.current.blur();
                    }}
                    value={fourth}
                    ref={fourthRef}
                />
            </div>
            {
                error && Array.isArray(error) && error.map((err, index) => {
                    return(<div key={`ch_fiw_${index}`} className="alert alert-danger">{err}</div>)
                })
            }
            {
                error && !Array.isArray(error) && 
                <div className="alert alert-danger">{error}</div>
            }
        </div>
    );
}

export default FourInRow;
