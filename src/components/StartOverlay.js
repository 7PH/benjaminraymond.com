import React, { useEffect, createRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { PowerGlitch } from 'powerglitch';


import './StartOverlay.scss';


function StartOverlay(props) {

    const styles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 },
    });

    const ref = createRef();
    const onSkip = () => {
        PowerGlitch.glitch(
            ref.current,
            {
                playMode: 'always',
                timing: {
                    duration: 2500,
                    easing: 'ease-in-out',
                    iterations: 1,
                },
                glitchTimeSpan: {
                    start: 0,
                    end: 1,
                },
                slice: {
                    count: 8,
                },
            }
        );
        setTimeout(props.onSkip, 1000);
    };

    return (
        <animated.div style={styles}>
            <div
                className='start-overlay z-10 fixed w-full h-full bg-black/25 flex flex-col justify-center text-center text-4xl select-none cursor-pointer'
                onClick={onSkip}
            >
                <div ref={ref} className='text-center '>
                    click to start
                </div>
            </div>
        </animated.div>
    );
}

export default StartOverlay;
