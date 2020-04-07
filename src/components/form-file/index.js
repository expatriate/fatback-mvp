import React, { useState, useEffect, useRef } from 'react';

import camera from '../../assets/svg/camera.svg';

function FormFile(props) {

    const fileInput = useRef(null);

    let [image, setImage] = useState('');
    let [error, setError] = useState(props.error);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);


    function handleChange() {
        let { type } = fileInput.current.files[0];
        if (type && type.indexOf('image') >= 0) {

            props.changeFile(fileInput.current.files[0]);
            setImage(URL.createObjectURL(fileInput.current.files[0]))
        } else {
            fileInput.current.value = ''
        }
    }

    return (
        <div className="form-file">
            <div className="form-file__wrapper" onClick={() => { fileInput.current.click();}}>
                <input className="form-file__input" type="file" ref={fileInput} onChange={() => handleChange()}/>
                { 
                    image && <img src={image} className={(props.styles ? props.styles : '')}/>
                }
                {
                    !image && <div className="form-file__default-img">
                        <img src={camera} />
                    </div>
                }
            </div>
            {
                error && error.map((err, index) => {
                    return(<div key={`ch_file_${index}`} className="alert alert-danger">{err}</div>)
                })
            }
        </div>
    );
}

export default FormFile;
