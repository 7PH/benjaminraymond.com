import React from 'react';
import './IntroSection.scss';
import MyTitle from '../util/MyTitle';

class IntroSection extends React.Component {

    constructor(props) {
        super(props);

        // Duration in seconds before the first audio drop. Used for dramatic effect, so that the title and actions come on audio drop.
        this.audioFirstDrop = 7;

        this.state = {
            myTitleTopPosition: -400,
            seeMoreBottomPosition: -200,
        };
    }

    moveElements() {
        setTimeout(() => {
            this.setState({
                ...this.state,
                myTitleTopPosition: 0,
                seeMoreBottomPosition: 0,
            });
        }, this.audioFirstDrop * 1000);
    }

    componentDidUpdate(prevProps) {
        if (this.props.overlaySkipped && ! prevProps.overlaySkipped) {
            this.moveElements();
        }
    }

    render() {
        
        return (
            <div className='section relative'>

                { this.props.overlaySkipped && 
                    <div
                        style={{ top: this.state.myTitleTopPosition }}
                        className='smooth absolute w-full text-center'
                    >
                        <MyTitle className='title' />
                    </div>
                }

                { this.props.overlaySkipped && this.props.showSeeMore && 
                    <div
                        style={{ bottom: this.state.seeMoreBottomPosition }}
                        className='smooth fixed w-full text-center pb-4'
                    >
                        <button onClick={this.props.onSeeMore} className='btn btn-capri text-xl'>
                            See more
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default IntroSection;
