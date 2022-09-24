import React from 'react';
import { useGlitch } from 'react-powerglitch';
import FloatingCard from './components/common/FloatingCard';
import FloatingElement from './components/common/FloatingElement';
import BackgroundViz from './components/layout/BackgroundViz';
import ProjectCard from './components/projects/ProjectCard';
import QuoteSection from './components/section/QuoteSection';


function App() {
    const glitch = useGlitch({
        playMode: 'always',
        timing: {
            duration: 5000,
        },
        glitchTimeSpan: {
            start: 0.7,
            end: 0.8,
        },
    });

    return (
        <div className="relative">
            <BackgroundViz />
            {/* <div className="fixed right-0 h-screen w-8 border-l-4 border-gray-800">
                <div className="rounded-full bg-[#c471ed] w-4 h-4 text-white mx-[-.6rem] my-4 shadow-lg shadow-black"></div>
            </div> */}
            <div className="w-full max-w-screen-lg mx-auto h-full">
                <div className="h-[100vh] pt-24">
                    <FloatingElement proximity={10}>
                        <div className="text-white text-center select-none">
                            <div className="text-6xl">Benjamin Raymond</div>
                            <div className="title-mask text-lg mt-4">⚡ Full Stack Engineer</div>
                        </div>
                    </FloatingElement>
                </div>
                <div className="h-[100vh] pt-24">
                    <QuoteSection />
                </div>
                <div className="min-h-[200px] max-h-[50vh] mx-10">
                    <div className="flex justify-center h-fit">
                        <div ref={glitch.ref}>
                            <ProjectCard
                                variant={0}
                                title={'⚡ PowerGlitch'}
                                description={'Tiny JS library to glitch anything on the web'}
                                link={'https://github.com/7PH/powerglitch'}
                            />
                        </div>
                    </div>
                </div>
                <div className="min-h-[200px] max-h-[50vh] mx-10">
                    <div className="col-start-2 flex justify-end h-fit">
                        <ProjectCard
                            variant={1}
                            title={'📺 SkyChat'}
                            description={'Future-proof virutal cinema platform'}
                            link={'https://github.com/skychatorg/skychat'}
                        />
                    </div>
                </div>
                <div className="min-h-[200px] max-h-[50vh] mx-10">
                    <div className="flex justify-start h-fit">
                        <ProjectCard
                            variant={2}
                            title={'📁 RisiBank'}
                            description={'Community-driven humorous image bank'}
                            link={'https://risibank.fr'}
                        />
                    </div>
                </div>
                <div className="min-h-[200px] max-h-[50vh] mx-10">
                    <div className="flex justify-center h-fit">
                        <ProjectCard
                            variant={3}
                            title={'🎵 PowerAudio'}
                            description={'Innovative audio visualization library'}
                            link={'https://github.com/7PH/poweraudio'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
