import React, { useEffect, useState } from 'react';
import FloatingElement from '../common/FloatingElement';


function IntroSection() {
    const [topPosition, setTopPosition] = useState<string>('-300px');
    useEffect(() => {
        setTopPosition('30px');
    }, []);

    return (
        <div className="h-[100vh] pt-24 relative">
            <div
                className='absolute transition-all duration-500 w-full pt-24'
                style={{ top: topPosition }}
            >
                <FloatingElement proximity={5}>
                    <div className="text-white text-center ease-[cubic-bezier(0.95,0.05,0.795,0.035)] select-none">
                        <div className="text-6xl">Benjamin Raymond</div>
                        <div className="title-mask text-lg mt-4">⚡ Full Stack Engineer</div>
                    </div>
                </FloatingElement>
            </div>
        </div>
    );
}

export default IntroSection;
