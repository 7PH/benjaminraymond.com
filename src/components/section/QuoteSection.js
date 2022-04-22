import { Parallax } from 'react-scroll-parallax';
import { isMobile } from 'react-device-detect';
import './QuoteSection.scss';


function QuoteSection() {
    return (
        <div className='section flex flex-col justify-center text-center px-4'>
            <Parallax
                rotateZ={[-180, 180]}
                disabled={isMobile}
            >
                <p className='w-full mx-auto max-w-4xl text-2xl'>
                    Hi 👋<br />
                    I am a conscientious person with expertise in using a wide range of technologies to design full stack web applications that are polished, scalable and secured. <br />
                    I like to be involved in the entire product development chain and put the emphasis on designing well-thought user experiences and polished UIs.
                </p>
            </Parallax>
        </div>
    );
}

export default QuoteSection;
