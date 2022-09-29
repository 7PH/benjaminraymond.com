import React, { ReactNode } from 'react';
import FloatingElement from './FloatingElement';
import './FloatingCard.css';


function FloatingCard(props: { proximity: number, variant?: number, children: ReactNode }) {
    return (
        <FloatingElement proximity={props.proximity}>
            <div
                className={'card relative floating variant-' + ((props.variant || 0) % 4)}
            >
                {props.children}
            </div>
        </FloatingElement>
    );
}

export default FloatingCard;
