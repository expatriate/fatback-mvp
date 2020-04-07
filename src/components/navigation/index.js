import React, { useState, useEffect } from 'react';

import { history } from '../../helpers/history';
import leftarrow from '../../assets/svg/left-arrow.svg';

function Navigation(props) {

    return (
        <div className="navigation">
        { props.backbutton && 
            <div className="navigation__back" onClick={() => {history.goBack()}}>
                <img src={leftarrow} />
                <span>Назад</span>
            </div>}
        </div>
    );
}

export default Navigation;
