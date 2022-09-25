import React from 'react';
import classNames from 'classnames';
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

    const projects = [
        {
            title: '⚡ PowerGlitch',
            description: 'Tiny JS library to glitch anything on the web',
            link: 'https://github.com/7PH/powerglitch',
            position: 'center',
            ref: glitch.ref,
        },
        {
            title: '📺 SkyChat',
            description: 'Future-proof virutal cinema platform',
            link: 'https://github.com/skychatorg/skychat',
            position: 'end',
        },
        {
            title: '📁 RisiBank',
            description: 'Community-driven humorous image bank',
            link: 'https://risibank.fr',
            position: 'start',
        },
        {
            title: '🎵 PowerAudio',
            description: 'Innovative audio visualization library',
            link: 'https://github.com/7PH/poweraudio',
            position: 'center',
        },
    ] as Array<{ title: string, description: string, link: string, position: string, ref?: () => void }>;

    return (
        <>
            {
                projects.map((project, index) => (
                    <div key={index} className="min-h-[200px] max-h-[50vh] mx-10">
                        <div className={classNames('flex h-fit', 'justify-' + project.position)}>
                            <div
                                ref={project.ref || (() => void 0)}
                            >
                                <ProjectCard
                                    variant={index}
                                    title={project.title}
                                    description={project.description}
                                    link={project.link}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ProjectSections;
