import React, { useState, useEffect, useRef } from 'react';

import Modal from '../modal';
import PhonecodeModalData from '../modal/рhonecode-modal-data';
import InputMask from "react-input-mask";

import SwipeActions from '../../helpers/swipe-actions';

function FormPhone(props) {

    const inputRef = useRef(null);

    const [opened, setOpened] = useState(false);
    const [styleInactive, setStyleInactive] = useState(false);
    const [countrycode, setCountrycode] = useState({
        id: 2,
        name: 'Россия',
        value: '+7'
    });

    const [modalOpened, setModalOpened] = useState(false);

    const [error, setError] = useState(props.error);
    const [validationError, setValidationError] = useState([]);
    const [value, setValue] = useState(props.value);
    const [dirty, setDirty] = useState(false);

    const phonecodes = [{
        id: 1,
        name: 'Канада',
        value: '+2'
    },{
        id: 2,
        name: 'Россия',
        value: '+7'
    },{
        id: 3,
        name: 'Индия',
        value: '+91'
    },{
        id: 4,
        name: 'США',
        value: '+1'
    }]

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    function handleCodeSelect(code) {
        setCountrycode(code);
        setModalOpened(false);
        props.onChange({
            target: {
                name: 'phone',
                value: inputRef.current.value
            }
        }, code.value);
    }

    function handleCodeReset() {
        setCountrycode({id:'', value: '', name: ''});
    }

    function handleChange(e) {
        SwipeActions.clearAction('right');
        props.onChange(e, countrycode.value);
        setError(false);
    }

    return (
        <div className={'form-phone' + (error ? ' has-error' : '') + (props.styles ? ' ' + props.styles : '')}>
            <div className="form-phone__wrapper">
                    {
                        opened && 
                        <div
                            className={'form-control countrycode' + (styleInactive ? ' inactive' : '')}
                            onClick={(e) => {
                                SwipeActions.addAction({
                                    type: 'right',
                                    f: () => {
                                        setModalOpened(false);
                                    }
                                });
                                setModalOpened(true)}
                            }
                        >
                            {countrycode.value}
                        </div>
                    }
                    <InputMask
                        mask="(999) 999-99-99"
                        maskPlaceholder=""
                        value={props.value}
                        onFocus={() => {
                            setOpened(true);
                            setDirty(true);
                            setStyleInactive(false);
                        }}
                        onBlur={() => {
                            setStyleInactive(true);    
                        }}
                        onChange={handleChange}
                    >
                        <input
                            pattern="\d*"
                            type="tel"
                            className={'form-control' + (dirty ? ' dirty' : '')}
                            name={props.name}
                            ref={inputRef}
                            />
                    </InputMask>
                    <label htmlFor={props.name}>{props.label}</label>
                    <Modal 
                        opened={modalOpened}
                        closeModal={() => setModalOpened(false)}
                        title="Код страны"
                        >
                        <PhonecodeModalData 
                            phonecodes={phonecodes}
                            value={countrycode} 
                            onSelect={(code) => handleCodeSelect(code)}
                            onReset={() => handleCodeReset()}
                        />
                    </Modal>
                </div>
                {
                    error && error.map((err, index) => {
                        return(<div key={`pe_${index}`} className="alert alert-danger">{err}</div>)
                    })
                }
        </div>
    );
}

export default FormPhone;
