import React from 'react';
import './IntroSection.scss';
import MyTitle from '../util/MyTitle';

class IntroSection extends React.Component {

    constructor(props) {
        super(props);

        // Duration in seconds before the first audio drop. Used for dramatic effect, so that the title and actions come on audio drop.
        this.audioFirstDrop = 7;

        this.state = {
            myTitleTopPosition: -200,
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
            <div className='section position-relative'>

                { this.props.overlaySkipped && 
                    <div
                        style={{ top: this.state.myTitleTopPosition }}
                        className='smooth position-absolute w-100 text-center'
                    >
                        <MyTitle className='title' />
                    </div>
                }

                { this.props.overlaySkipped && this.props.showSeeMore && 
                    <div
                        style={{ bottom: this.state.seeMoreBottomPosition }}
                        className='smooth position-fixed w-100 text-center pb-4'
                    >
                        <button onClick={this.props.onSeeMore} className='btn btn-outline-primary'>See more</button>
                    </div>
                }
            </div>
        );
    }
}

export default IntroSection;
