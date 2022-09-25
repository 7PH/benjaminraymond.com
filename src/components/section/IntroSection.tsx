import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import FloatingElement from '../common/FloatingElement';
import FloatingCard from '../common/FloatingCard';


function IntroSection() {
    // Top position of the title, used for entering animation
    const [titleTopPosition, setTitleTopPosition] = useState<string>('-300px');
    const [expandBottomPosition, setExpandBottomPosition] = useState<string>('-300px');
    useEffect(() => {
        setTitleTopPosition('30px');
        setExpandBottomPosition('0px');
    }, []);

    function onClickExpand() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    }

    return (
        <div className="h-[100vh] pt-24 relative">
            <div
                className='absolute transition-all duration-500 w-full pt-24'
                style={{ top: titleTopPosition }}
            >
                <FloatingElement proximity={5}>
                    <div className="text-white text-center ease-[cubic-bezier(0.95,0.05,0.795,0.035)] select-none">
                        <div className="text-6xl">Benjamin Raymond</div>
                        <div className="title-mask text-lg mt-4">⚡ Full Stack Engineer</div>
                    </div>
                </FloatingElement>
            </div>
            <div
                className='absolute bottom-0 w-full flex justify-center transition-all duration-500 pb-4 text-4xl'
                style={{ bottom: expandBottomPosition }}
            >
                <FloatingCard proximity={5}>
                    <div
                        onClick={onClickExpand}
                        className="px-4 text-black"
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </FloatingCard>
            </div>
        </div>
    );
}

export default IntroSection;
