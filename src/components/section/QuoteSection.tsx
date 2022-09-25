import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import FloatingElement from '../common/FloatingElement';


function QuoteSection() {
    return (
        <div className="h-[100vh] flex flex-col justify-center">
            <FloatingElement proximity={20}>
                <div className="text-gray-400 text-center select-none text-2xl">
                    Hi 👋<br />
                    I enjoy creating things that others <span className="title-mask">love</span> using
                </div>
            </FloatingElement>
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
        </div>
    );
}

export default QuoteSection;
