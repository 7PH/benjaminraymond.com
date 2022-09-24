import React from 'react';
import FloatingElement from '../common/FloatingElement';


function QuoteSection() {
    return (
        <div className="h-[100vh] pt-24">
            <FloatingElement proximity={20}>
                <div className="text-white text-center select-none text-2xl">
                    👋
                    <span className="title-mask ml-2">
                        I enjoy creating things that others love using
                    </span>
                </div>
            </FloatingElement>
        </div>
    );
}

export default QuoteSection;
