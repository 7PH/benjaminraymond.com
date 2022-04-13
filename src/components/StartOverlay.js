import React from 'react';
import { useSpring, animated } from 'react-spring';

import './StartOverlay.scss';


function StartOverlay(props) {

    const styles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 },
    });

    return (
        <animated.div style={styles}>
            <div
                className='start-overlay position-fixed w-100 h-100 d-flex flex-column justify-content-center text-center top-0'
                onClick={props.onSkip}
            >
                click to start
            </div>
        </animated.div>
    );
}

export default StartOverlay;
