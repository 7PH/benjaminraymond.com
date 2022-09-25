import React, { useState } from 'react';
import * as classnames from 'classnames';
import BackgroundViz from './components/layout/BackgroundViz';
import IntroPage from './components/page/IntroPage';
import MainPage from './components/page/MainPage';

function App() {
    const [page, setPage] = useState<'intro' | 'main'>('intro');
    const [darkenBackground, setDarkenBackground] = useState<boolean>(true);

    const onPlayIntro = () => {
        setDarkenBackground(false);
    };

    const onSkipIntro = () => {
        setDarkenBackground(false);
        setPage('main');
    };

    return (
        <div className="relative">
            <div className={classnames('opacity-100 transition-all duration-1000', {
                '!opacity-25': darkenBackground,
            })}>
                <BackgroundViz />
            </div>
            { page === 'intro' &&
                <IntroPage
                    onPlayIntro={onPlayIntro}
                    onSkipIntro={onSkipIntro}
                />
            }
            { page === 'main' &&
                <MainPage />
            }
        </div>
    );
}

export default App;
