import { Parallax } from 'react-scroll-parallax';
import { isMobile } from 'react-device-detect';
import './QuoteSection.scss';


function QuoteSection() {
    return (
        <div className='section relative flex flex-col justify-center text-center px-4'>
            <Parallax
                rotateZ={[-180, 180]}
                disabled={isMobile}
            >
                <p className='w-full mx-auto max-w-4xl text-2xl'>
                    Hi 👋<br />
                    I am a conscientious software engineer with expertise in using a wide range of technologies to design polished, scalable and secure full stack web applications.
                    I like to be involved in the entire product development chain and put the emphasis on designing well-thought-out user experiences and interfaces.
                </p>
            </Parallax>
            <div className='absolute bottom-0 w-full text-center pb-4'>
                <Parallax
                    opacity={[1, 0]}
                    disabled={isMobile}
                >
                    <i class="arrow-down border-fuchsia-400"></i>
                </Parallax>
            </div>
        </div>
    );
}

export default QuoteSection;
