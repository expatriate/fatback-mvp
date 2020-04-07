import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LinkButton(props) {

    return (
        <Link to={props.link} className={`button ${props.styles}`}>{props.text}</Link>
    );
}

export default LinkButton;
