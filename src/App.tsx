import React, { useState } from 'react';
import classNames from 'classnames';
import BackgroundViz from './components/layout/BackgroundViz';
import IntroPage from './components/page/IntroPage';
import MainPage from './components/page/MainPage';

function App() {
    /**
     * Page to show
     */
    const [page, setPage] = useState<'intro' | 'main'>('intro');

    /**
     * Whether the visualization should be darken
     */
    const [darkenBackground, setDarkenBackground] = useState<boolean>(true);

    // When intro is finished (including skipped)
    const onIntroFinished = () => {
        setDarkenBackground(false);
        setPage('main');
    };

    return (
        <div className="relative h-full w-full">
            <div className={classNames('h-full w-full opacity-100 transition-all duration-1000', {
                '!opacity-25': darkenBackground,
            })}>
                <BackgroundViz />
            </div>
            { page === 'intro' &&
                <IntroPage
                    onPlayIntro={() => setDarkenBackground(false)}
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
