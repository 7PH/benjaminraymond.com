import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { isMobile } from 'react-device-detect';
import FloatingElement from '../common/FloatingElement';


function QuoteSection() {
    return (
        <div className="h-[100vh] flex flex-col justify-center">
            <FloatingElement proximity={20}>
                <div className="text-gray-400 text-center select-none text-lg md:text-2xl px-8">
                    Hi 👋<br />
                    I enjoy creating things that others <span className="title-mask">love</span> using
                </div>
            </FloatingElement>
            {(! isMobile) && 
                <>
                    <Parallax
                        translateX={[-100, 100]}
                        rotate={[0, 500]}
                    >
                        <span className="text-5xl">
                            💻
                        </span>
                    </Parallax>
                    <Parallax
                        translateX={[-100, 100]}
                        rotate={[0, 500]}
                    >
                        <span className="text-5xl">
                            🎮
                        </span>
                    </Parallax>
                </>
            }
        </div>
    );
}

export default QuoteSection;
