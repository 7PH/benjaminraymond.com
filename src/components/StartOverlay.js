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
                className='start-overlay z-10 fixed w-full h-full bg-black/25 flex flex-col justify-center text-center text-4xl select-none cursor-pointer'
                onClick={props.onSkip}
            >
                click to start
            </div>
        </animated.div>
    );
}

export default StartOverlay;
