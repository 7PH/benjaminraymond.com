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
            <div ref={this.containerRef} className='section d-flex flex-column justify-content-center text-center px-4'>

                <h1>Featured Projects</h1>

                <div className='row justify-content-center'>
                    <Parallax
                        translateX={[-100, 0]}
                        translateY={[-100, 0]}
                        startScroll={this.state.offsetHeight}
                        endScroll={this.state.offsetHeight + window.innerHeight}
                        disabled={isMobile}
                        className='col-lg-4 col-md-6'
                    >
                        <div className='card bg-dark mt-4'>
                            <div className="card-body">
                                <h5 className="card-title">SkyChat</h5>
                                <p className="card-text">Open source virtual cinema platform</p>
                                <a href="https://github.com/skychatorg/skychat" target='_blank' rel="noreferrer" className="btn btn-primary">See project</a>
                            </div>
                        </div>
                    </Parallax>
                    <Parallax
                        translateX={[100, 0]}
                        translateY={[-100, 0]}
                        startScroll={this.state.offsetHeight}
                        endScroll={this.state.offsetHeight + window.innerHeight}
                        disabled={isMobile}
                        className='col-lg-4 col-md-6'
                    >
                        <div className='card bg-dark mt-4'>
                            <div className="card-body">
                                <h5 className="card-title">RisiBank</h5>
                                <p className="card-text">Community-driven humorous image bank</p>
                                <a href="https://risibank.fr" target='_blank' rel="noreferrer" className="btn btn-primary">Check out</a>
                            </div>
                        </div>
                    </Parallax>
                </div>
                <div className='row justify-content-center'>
                    <Parallax
                        translateY={[400, 0]}
                        startScroll={this.state.offsetHeight}
                        endScroll={this.state.offsetHeight + window.innerHeight}
                        disabled={isMobile}
                        className='col-lg-4 col-md-6'
                    >
                        <div className='card bg-dark mt-4'>
                            <div className="card-body">
                                <h5 className="card-title">PowerAudio</h5>
                                <p className="card-text">A unique audio viz library you can integrate on the web</p>
                                <a href="https://github.com/7PH/poweraudio" target='_blank' rel="noreferrer" className="btn btn-primary">See project</a>
                            </div>
                        </div>
                    </Parallax>
                </div>
            </div>
        );
    }
}

export default ProjectsSection;
