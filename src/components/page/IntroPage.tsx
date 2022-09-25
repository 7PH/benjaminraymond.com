import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { play } from '../../features/viz';
import * as classnames from 'classnames';
import FloatingCard from '../common/FloatingCard';


export type PropsType = {
    onSkipIntro: () => void,
    onPlayIntro: () => void,
};

const timeout = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function IntroPage(props: PropsType) {
    const [started, setStarted] = useState(false);
    const dispatch = useAppDispatch();

    const onClickPlay = async () => {
        setStarted(true);
        dispatch(play());
        props.onPlayIntro();
        await timeout(7000);
        props.onSkipIntro();
    };

    return (
        <div className="h-screen pt-[30%] text-center">
            <div
                className={classnames('flex justify-center gap-4 transition-all ease-[cubic-bezier(.86,-0.2,.83,.67)]', {
                    'translate-y-[-100vh]': started,
                })}
            >
                <FloatingCard proximity={5} variant={0}>
                    <div
                        onClick={onClickPlay}
                        className="px-6 py-3 text-2xl text-white"
                    >
                        🎵 Play intro
                    </div>
                </FloatingCard>
                <FloatingCard proximity={5} variant={1}>
                    <div
                        onClick={props.onSkipIntro}
                        className="px-6 py-3 text-2xl text-white"
                    >
                        ⛔ Skip intro
                    </div>
                </FloatingCard>
            </div>
        </div>
    );
}

export default IntroPage;
