import React, { useState, useEffect} from 'react';

import Button from '../../../components/button';

import selected from '../../../assets/svg/selected.svg';

function CompanyModalData(props) {

    let [value, setValue] = useState(props.value);
    let [companies, setCompanies] = useState(props.companies);

    useEffect(() => {
        setValue(props.value)
    }, [props.value]);

    useEffect(() => {
        setCompanies(props.companies)
    }, [props.companies])

    function selectCompany(company) {
        setValue(company.value)
    }

    function resetSelected() {
        props.onReset();
        setValue('');
    }

    return (
        <div className="modal-content">
            <div className="modal-center-list">
                {
                    companies && companies.map(el => {
                        return (<div key={`company_${el.id}`} onClick={() => {setValue(el)}} className={'modal-center-list__el' + (el.value === value.value ? ' selected' : '')}>
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

export default CompanyModalData;
