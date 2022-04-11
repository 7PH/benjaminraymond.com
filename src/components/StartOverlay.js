import React from 'react';
import './StartOverlay.scss';


class StartOverlay extends React.Component {

    render() {
        return (
            <div
                className='overlay position-fixed w-100 h-100 d-flex flex-column justify-content-center text-center'
                onClick={this.props.onSkip}
            >
                click to start
            </div>
        );
    }
}

export default StartOverlay;
