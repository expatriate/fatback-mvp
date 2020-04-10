import React, { useState, useEffect, useRef } from 'react';

import playIcon from '../../assets/svg/play.svg';

function VideoBlock(props) {

    const videoRef = useRef(null);
    const [activated, setActivated] = useState(false);

    function handleStart() {
        setActivated(true);
        console.log(videoRef.current.play())
    }

    function handleStop() {
        setActivated(false);
        console.log(videoRef.current.pause())
    }

    return (
        <div className="video-block">
            <video className="video-block__video" ref={videoRef} onClick={() => handleStop()}>
                <source src={props.source}/>
            </video>
            {
                !activated && props.layout && props.layout()
            }
            {
                !activated &&
                <div className="video-block__overlay">
                    <img src={playIcon} alt="play" onClick={() => {handleStart()}}/>
                </div>
            }
        </div>
    );
}

export default VideoBlock;
