import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useHoverDirty, useMouse } from 'react-use';
import './FloatingElement.css';


/**
 * 
 * @param {Number} proximity Element proximity. Defaults to 20.
 * @returns 
 */
function FloatingElement(props: { proximity?: number, children: ReactNode }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { elX, elY, elW, elH } = useMouse(cardRef);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const hovered = useHoverDirty(cardRef, true);
    useEffect(() => {
        const relativeX = (elX - elW / 2) / innerWidth;
        const relativeY = (elY - elH / 2) / innerHeight;
        const proximity = (props.proximity || 10);
        const ratio = hovered ? Math.round(proximity * .25) : proximity;
        setTranslate({
            x: relativeX * ratio,
            y: relativeY * ratio,
        });
    }, [elX, elY, elW, elH, hovered]);

    return (
        <div
            ref={cardRef}
            className="card-container transition-all ease-linear"
            style={{
                'translate': translate.x + 'px ' + translate.y + 'px',
            }}
        >
            {props.children}
        </div>
    );
}

export default FloatingElement;
