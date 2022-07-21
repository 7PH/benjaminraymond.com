import React from 'react';
import './ProjectsSection.scss';


class ProjectsSection extends React.Component {

    constructor(props) {
        super(props);

        this.containerRef = React.createRef();

        this.state = {
            offsetHeight: 900,
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            offsetHeight: this.containerRef.current.offsetHeight,
        });
    }

    render() {
        return (
            <div ref={this.containerRef} className='section flex flex-col justify-center text-center px-4'>

                <h1 className='mb-4 text-4xl md:text-6xl md:mb-8'>Featured Projects</h1>

                <div className='w-full max-w-4xl mx-auto grid grid-cols-2 gap-4 items-center text-left'>

                    <div className="bg-slate-900 col-span-2 rounded-md px-5 py-4 flex flex-col md:flex-row">
                        <img
                            className='mr-4 w-8 h-8'
                            alt="risibank-logo"
                            src="/assets/projects/skychat.png"
                        />
                        <p className="text-lg font-bold" style={{ minWidth: 140, }}>
                            SkyChat
                        </p>
                        <p className='flex-1 text-lg'>
                            Open source virtual cinema platform
                        </p>
                        <div className="text-right mt-2 md:mt-0" style={{ width: 120 }}>
                            <a
                                className="btn btn-magenta-crayola w-full"
                                href="https://github.com/skychatorg/skychat"
                                target='_blank'
                                rel="noreferrer"
                            >
                                See project
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-900 col-span-2 rounded-md px-5 py-4 flex flex-col md:flex-row">
                        <img
                            className='mr-4 w-8 h-8'
                            alt="risibank-logo"
                            src="/assets/projects/risibank.png"
                        />
                        <p className="text-lg font-bold" style={{ minWidth: 140, }}>
                            RisiBank
                        </p>
                        <p className='flex-1 text-lg'>
                            Community-driven humorous image bank
                        </p>
                        <div className="text-right mt-2 md:mt-0" style={{ width: 120 }}>
                            <a
                                className="btn btn-capri w-full"
                                href="https://risibank.fr"
                                target='_blank'
                                rel="noreferrer"
                            >
                                Check out
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-900 col-span-2 rounded-md px-5 py-4 flex flex-col md:flex-row">
                        <img
                            className='mr-4 w-8 h-8'
                            alt="risibank-logo"
                            src="/assets/projects/powerglitch.gif"
                        />
                        <p className="text-lg font-bold" style={{ minWidth: 140, }}>
                            PowerGlitch
                        </p>
                        <p className='flex-1 text-lg'>
                            Tiny JS library to glitch images on the web
                        </p>
                        <div className="text-right mt-2 md:mt-0" style={{ width: 120 }}>
                            <a
                                className="btn btn-magenta-crayola w-full"
                                href="https://github.com/7PH/powerglitch"
                                target='_blank'
                                rel="noreferrer"
                            >
                                See project
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-900 col-span-2 rounded-md px-5 py-4 flex flex-col md:flex-row">
                        <img
                            className='mr-4 w-8 h-8'
                            alt="risibank-logo"
                            src="/assets/projects/poweraudio.png"
                        />
                        <p className="text-lg font-bold" style={{ minWidth: 140, }}>
                            PowerAudio
                        </p>
                        <p className='flex-1 text-lg'>
                            Innovative audio visualization library
                        </p>
                        <div className="text-right mt-2 md:mt-0" style={{ width: 120 }}>
                            <a
                                className="btn btn-capri w-full"
                                href="https://github.com/7PH/poweraudio"
                                target='_blank'
                                rel="noreferrer"
                            >
                                See project
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectsSection;
