import React, { useState, useEffect} from 'react';

import Button from '../../../components/button';

import selected from '../../../assets/svg/selected.svg';

function PhonecodeModalData(props) {

    let [value, setValue] = useState(props.value);
    let [phonecodes, setPhonecodes] = useState(props.phonecodes);

    useEffect(() => {
        setValue(props.value)
    }, [props.value]);

    useEffect(() => {
        setPhonecodes(props.phonecodes)
    }, [props.phonecodes])

    function selectPhonecode(phonecode) {
        setValue(phonecode.value)
    }

    function resetSelected() {
        props.onReset();
        setValue('');
    }

    return (
        <div className="modal-content">
            <div className="modal-center-list">
                {
                    phonecodes && phonecodes.map(el => {
                        return (<div key={`phonecode_${el.id}`} onClick={() => {setValue(el)}} className={'modal-center-list__el' + (el.value === value.value ? ' selected' : '')}>
                            <span>{el.name}</span>
                            {el.value === value.value && <img src={selected}/>}
                        </div>)
                    })
                }
            </div>
            <div className="modal-bottom">
                <div className="modal-bottom__links">
                    <Button click={() => resetSelected()} text="Сбросить" styles={'clear big centered'}/>
                    <Button click={() => props.onSelect(value)} text="Готово!" styles={'yellow-block big filled centered capitalize'}/>
                </div>
            </div>
        </div>
    );
}

export default PhonecodeModalData;
