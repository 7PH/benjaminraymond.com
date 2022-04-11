import React from 'react';
import { PowerAudio } from 'poweraudio';

import './IntroSection.scss';
import MyTitle from '../util/MyTitle';


class IntroSection extends React.Component {

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
            const volume = Math.max(0.25, 1 - (document.documentElement.scrollTop / window.innerHeight * 4));
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


    onSeeMore() {
        // this.audio.pause();
        this.props.onSeeMore();
    }
    
    render() {
        return (
            <div className='section position-relative'>

                { this.props.overlaySkipped && 
                    <MyTitle className='title position-absolute w-100 text-center' />
                }

                { this.props.overlaySkipped && this.props.showSeeMore && 
                    <div className='see-more position-absolute bottom-0 w-100 text-center mb-3'>
                        <button onClick={this.onSeeMore.bind(this)} className='btn btn-sm btn-primary'>See more</button>
                    </div>
                }

                <div
                    id="animation-container"
                    className='animation-container w-100 h-100'
                    ref={this.animationContainerRef}
                />
            </div>
        );
    }
}

export default IntroSection;
