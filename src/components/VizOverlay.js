import React from 'react';
import { PowerAudio } from 'poweraudio';
import './VizOverlay.scss';


class VizOverlay extends React.Component {

    constructor(props) {
        super(props);
        
        this.animationContainerRef = React.createRef();
        this.audio = new Audio('./music.mp3');
        this.viz = null;
    }

    /**
     * When component is mounted, start the animation but keep the audio from playing for now.
     */
    componentDidMount() {
        this.viz = new PowerAudio.Viz({ container: this.animationContainerRef.current, source: this.audio, startAnalysis: false });

        document.addEventListener('scroll', event => {
            const volume = Math.max(0, 1 - (document.documentElement.scrollTop / window.innerHeight * 2));
            this.audio.volume = volume;
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
            <div className='overlay position-fixed w-100 h-100 d-flex flex-column justify-content-center text-center top-0'>
                <div
                    id="animation-container"
                    className='animation-container w-100 h-100'
                    ref={this.animationContainerRef}
                />
            </div>
        );
    }
}

export default VizOverlay;
