import React from 'react';
import FloatingElement from '../common/FloatingElement';


function FooterSection() {
    return (
        <div className="h-[50vh] flex flex-col justify-end pb-12 text-white text-center select-none pr-2">
            <div className="flex justify-end">
                <FloatingElement proximity={5}>
                    <div className="text-3xl md:text-4xl text-right">
                        Benjamin Raymond
                    </div>
                </FloatingElement>
            </div>
            <div className="mt-4 flex gap-4 justify-end mr-2">
                <FloatingElement proximity={5}>
                    <a
                        href="https://github.com/7PH"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="title-mask text-lg"
                    >
                        Github
                    </a>
                </FloatingElement>
                <FloatingElement proximity={5}>
                    <a
                        href="https://www.linkedin.com/in/b-raymond"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="title-mask text-lg"
                    >
                        LinkedIn
                    </a>
                </FloatingElement>
                <FloatingElement proximity={5}>
                    <a
                        href="mailto:b.raymond@protonmail.com"
                        className="title-mask text-lg"
                    >
                        Email
                    </a>
                </FloatingElement>
            </div>
        </div>
    );
}

export default FooterSection;
