import React from 'react';
import './App.css';
import StartOverlay from './components/StartOverlay';
import IntroSection from './components/section/IntroSection';
import ProjectsSection from './components/section/ProjectsSection';
import ContactSection from './components/section/ContactSection';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            overlaySkipped: false,
            seeAllSections: false,
        };
    }

    skipOverlay() {
        this.setState({
            ...this.state,
            overlaySkipped: true
        });
    }

    seeAllSections() {
        this.setState({
            ...this.state,
            seeAllSections: true
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // Shown all sections
        if (! prevState.seeAllSections && this.state.seeAllSections) {
            window.scrollTo(0, 200);
        }
    }


    render() {
        return (
            <div>

                { ! this.state.overlaySkipped && 
                    <StartOverlay className="overlay" onSkip={this.skipOverlay.bind(this)} />
                }
                
                <IntroSection
                    overlaySkipped={this.state.overlaySkipped}
                    showSeeMore={! this.state.seeAllSections}
                    onSeeMore={this.seeAllSections.bind(this)}
                />

                { this.state.seeAllSections && 
                    <ProjectsSection />
                }

                { this.state.seeAllSections && 
                    <ContactSection />
                }
            </div>
        );
    }
}

export default App;
