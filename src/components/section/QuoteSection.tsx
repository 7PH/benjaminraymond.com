import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import FloatingElement from '../common/FloatingElement';


function QuoteSection() {
    return (
        <div className="h-[100vh] flex flex-col justify-center">
            <FloatingElement proximity={20}>
                <div className="text-white text-center select-none text-2xl">
                    👋
                    <span className="title-mask ml-2">
                        I enjoy creating things that others love using
                    </span>
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
