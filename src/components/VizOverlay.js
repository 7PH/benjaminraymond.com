import React from 'react';
import { PowerAudio } from 'poweraudio';
import './VizOverlay.scss';


class VizOverlay extends React.Component {

    constructor(props) {
        super(props);
        
        this.animationContainerRef = React.createRef();
        this.audio = new Audio('./music.mp3');
        this.viz = null;

        this.state = {
            scrollOverhead: 200,
            scrollRatio: 0
        };
    }

    /**
     * When component is mounted, start the animation but keep the audio from playing for now.
     */
    componentDidMount() {
        this.viz = new PowerAudio.Viz({ container: this.animationContainerRef.current, source: this.audio, startAnalysis: false });

        document.addEventListener('scroll', event => {
            const volume = Math.max(0.1, 1 - (document.documentElement.scrollTop / window.innerHeight));
            this.audio.volume = volume;

            const scrollRatio = document.documentElement.scrollTop / (document.body.clientHeight - window.innerHeight);
            this.setState({ ...this.state, scrollRatio });
        });
    }

    componentDidUpdate(prevProps) {
        // Overlay was skipped
        if (! prevProps.overlaySkipped && this.props.overlaySkipped) {
            this.viz.start();
            this.audio.play();
        }
    }
    
    render() {
        return (
            <div
                className='viz-overlay -z-10 fixed w-full'
                style={{ height: `calc(100vh + ${this.state.scrollOverhead}px)`, top: - this.state.scrollRatio * this.state.scrollOverhead, }}
            >
                <div
                    id="animation-container"
                    className='animation-container w-full h-full'
                    ref={this.animationContainerRef}
                />
            </div>
        );
    }
}

export default VizOverlay;
