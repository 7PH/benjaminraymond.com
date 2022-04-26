import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { isMobile } from 'react-device-detect';
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

                <h1>Featured Projects</h1>

                <div className='w-full max-w-4xl mx-auto grid grid-cols-2 gap-4 items-center'>

                    <div className="bg-slate-900 col-span-2 md:col-span-1 rounded-md px-5 py-4">
                        <p className="text-lg font-bold">SkyChat</p>
                        <p>Open source virtual cinema platform</p>
                        <div className='mt-4'>
                            <a
                                className="btn btn-pink"
                                href="https://github.com/skychatorg/skychat"
                                target='_blank'
                                rel="noreferrer"
                            >
                                See project
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-900 col-span-2 md:col-span-1 rounded-md px-5 py-4">
                        <p className="text-lg font-bold">RisiBank</p>
                        <p>Community-driven humorous image bank</p>
                        <div className='mt-4'>
                            <a
                                className="btn btn-blue"
                                href="https://risibank.fr"
                                target='_blank'
                                rel="noreferrer"
                            >
                                Check out
                            </a>
                        </div>
                    </div>

                    <div className="col-span-2 bg-slate-900 rounded-md px-5 py-4">
                        <p className="text-lg font-bold">PowerAudio</p>
                        <p>A unique audio viz library you can integrate on the web</p>
                        <div className='mt-4'>
                            <a
                                className="btn btn-violet"
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
