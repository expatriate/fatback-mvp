import React, { useState, useEffect } from 'react';

import { history } from '../../helpers/history';
import leftarrow from '../../assets/svg/left-arrow.svg';

function Navigation(props) {

    const { title, backbutton } = props;

    return (
        <div className="navigation">
        { backbutton && 
            <div className="navigation__back" onClick={() => {history.goBack()}}>
                <img src={leftarrow} />
                { title && <span>{ title }</span> }
                { !title && <span>Назад</span> }
            </div>}
        </div>
    );
}

export default Navigation;
