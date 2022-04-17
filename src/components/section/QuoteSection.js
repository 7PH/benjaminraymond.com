import { Parallax } from 'react-scroll-parallax';
import { isMobile } from 'react-device-detect';
import './QuoteSection.scss';


function QuoteSection() {
    return (
        <div className='section d-flex flex-column justify-content-center text-center px-4'>
            <Parallax translateX={isMobile ? [0, 0] : [-100, 100]}>
                <p className='col-md-6 m-auto fs-4'>
                    Hi 👋<br/>
                    I am a conscientious person with expertise in using a wide range of technologies and languages to design full stack web applications that are polished, scalable and secured. I put the emphasis on designing well-thought user experiences and polished UIs.
                </p>
            </Parallax>
        </div>
    );
}

export default QuoteSection;
