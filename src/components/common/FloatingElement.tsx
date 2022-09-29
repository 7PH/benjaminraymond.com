import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useHoverDirty, useMouse } from 'react-use';


/**
 * 
 * @param {number} proximity Element proximity, between 0 and 100.
 * @returns 
 */
function FloatingElement(props: { proximity: number, children: ReactNode }) {
    // Tracks mouse position related to this element
    const cardRef = useRef<HTMLDivElement>(null);
    const { elX, elY, elW, elH } = useMouse(cardRef);
    
    // CSS translate property applied to the floating element
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    // Whether this element is hovered
    const hovered = useHoverDirty(cardRef, true);

    /**
     * Update CSS translate property when mouse moved or hovered this element
     */
    useEffect(() => {
        // Get relativeX/Y factors related to how far the mouse is from this element
        // Bounds these factors within [-1, 1]
        const relativeX = Math.max(-1, Math.min(1, (elX - elW / 2) / innerWidth));
        const relativeY = Math.max(-1, Math.min(1, (elY - elH / 2) / innerHeight));
        // Compute general ratio to apply to the distance ratio
        // When element is hovered, element moves less to optimize UX
        const proximity = props.proximity;
        const ratio = hovered ? Math.round(proximity * .25) : proximity;
        setTranslate({ x: relativeX * ratio, y: relativeY * ratio });
    }, [elX, elY, elW, elH, hovered]);

    return (
        <div
            ref={cardRef}
            className="h-fit scale-[0.95] hover:scale-[1] transition-all ease-linear"
            style={{
                'translate': translate.x + 'px ' + translate.y + 'px',
            }}
        >
            {props.children}
        </div>
    );
}

export default FloatingElement;
