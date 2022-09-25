import React from 'react';
import FooterSection from '../section/FooterSection';
import IntroSection from '../section/IntroSection';
import ProjectsSection from '../section/ProjectSections';
import QuoteSection from '../section/QuoteSection';


function MainPage() {
    return (
        <div className="w-full max-w-screen-lg mx-auto h-full">
            <IntroSection />
            <QuoteSection />
            <ProjectsSection />
            <FooterSection />
        </div>
    );
}

export default MainPage;
