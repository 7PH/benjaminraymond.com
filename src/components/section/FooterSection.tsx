import React from 'react';
import FloatingElement from '../common/FloatingElement';


function FooterSection() {
    return (
        <div className="h-[50vh] flex flex-col justify-end pb-12">
            <FloatingElement proximity={5}>
                <div className="text-white text-center select-none text-right">
                    <div>
                        <div className="text-6xl">Benjamin Raymond</div>
                        <div className="text-lg mt-4 flex gap-4 justify-end">
                            <a
                                href="https://github.com/7PH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="title-mask"
                            >
                                Github
                            </a>
                            <a
                                href="https://www.linkedin.com/in/b-raymond"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="title-mask"
                            >
                                LinkedIn
                            </a>
                            <a href='mailto:b.raymond@protonmail.com' className="title-mask">
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </FloatingElement>
        </div>
    );
}

export default FooterSection;
