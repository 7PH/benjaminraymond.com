import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { play } from '../../features/viz';
import classNames from 'classnames';
import FloatingCard from '../common/FloatingCard';


export type PropsType = {
    onIntroFinished: () => void,
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
        props.onIntroFinished();
    };

    return (
        <div className="fixed h-full w-full text-center bottom-0 md:bottom-auto md:top-[40vh]">
            <div
                className={classNames('h-full flex flex-col md:flex-row pb-2 justify-end md:justify-center gap-4 transition-all ease-[cubic-bezier(.86,-0.2,.83,.67)]', {
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
                        onClick={props.onIntroFinished}
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
