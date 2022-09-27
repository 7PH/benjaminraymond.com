import React, { useState } from 'react';
import classNames from 'classnames';
import { removeDarkOverlay } from './features/viz';
import { useAppSelector, useAppDispatch } from './hooks';
import BackgroundViz from './components/layout/BackgroundViz';
import IntroPage from './components/page/IntroPage';
import MainPage from './components/page/MainPage';

function App() {
    /**
     * Page to show
     */
    const [page, setPage] = useState<'intro' | 'main'>('intro');
    
    const dispatch = useAppDispatch();
    const showDarkOverlay = useAppSelector(state => state.viz.showDarkOverlay);

    // When intro is finished (including skipped)
    const onIntroFinished = () => {
        dispatch(removeDarkOverlay());
        setPage('main');
    };

    return (
        <div className="relative h-full w-full">
            <div className={classNames('h-full w-full opacity-100 transition-all duration-1000', {
                '!opacity-25': showDarkOverlay,
            })}>
                <BackgroundViz />
            </div>
            { page === 'intro' &&
                <IntroPage
                    onPlayIntro={() => dispatch(removeDarkOverlay())}
                    onIntroFinished={onIntroFinished}
                />
            }
            { page === 'main' &&
                <MainPage />
            }
        </div>
    );
}

export default App;
