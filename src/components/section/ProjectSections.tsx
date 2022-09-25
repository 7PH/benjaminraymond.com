import React from 'react';
import { useGlitch } from 'react-powerglitch';
import ProjectCard from '../projects/ProjectCard';


function ProjectSections() {
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
        <>
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
        </>
    );
}

export default ProjectSections;
