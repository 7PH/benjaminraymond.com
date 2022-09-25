import React from 'react';
import FloatingCard from '../common/FloatingCard';


export type PropsType = {
    variant?: number;
    title: string;
    description: string;
    link: string;
};

function ProjectCard(props: PropsType) {
    return (
        <FloatingCard
            variant={props.variant}
            proximity={10}
        >
            <div
                onClick={() => window.open(props.link)}
                className="p-4 max-w-[380px]"
                title='Click to open project'
            >
                <div className="w-full bg-black rounded-xl my-2 p-4 text-center text-white flex flex-col justify-center">
                    <p className="title-mask text-3xl">
                        {props.title}
                    </p>
                </div>
                <p className="text-center">
                    {props.description}
                </p>
            </div>
        </FloatingCard>
    );
}

export default ProjectCard;
