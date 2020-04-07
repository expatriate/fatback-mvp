import React, { useState, useEffect, useRef } from 'react';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import close from '../../assets/svg/close.svg';

function Modal(props) {

    let [opened, setOpened] = useState(props.opened);
    const modalRef = useRef(null);

    useEffect(() => {
        if (props.opened) {
            disableBodyScroll(modalRef.current);
            setOpened(props.opened);
        } else {
            clearAllBodyScrollLocks();
            setOpened(props.opened);
        }
    }, [props.opened]);

    return (
        <div className={'modal' + (opened ? ' opened' : '')} ref={modalRef}>
            <div className="modal__content">
                <div className="modal-top">
                    <span className="modal-top__title">
                        { props.title }
                    </span>
                    <img className="modal-top__icon" onClick={() => props.closeModal()} src={close}/>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;
