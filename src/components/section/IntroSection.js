import React from 'react';

import './IntroSection.scss';
import MyTitle from '../util/MyTitle';


class IntroSection extends React.Component {

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
            </div>
        );
    }
}

export default IntroSection;
