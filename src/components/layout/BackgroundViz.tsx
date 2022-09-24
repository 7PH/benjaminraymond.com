import React, { useEffect, useRef, useState } from 'react';
import { PowerAudio } from 'poweraudio';
import { Viz } from 'poweraudio/build/Viz';


function BackgroundViz() {

    const ref = useRef<HTMLDivElement>(null);
    const [viz, setViz] = useState<null | Viz>(null);

    useEffect(() => {
        if (! ref.current) {
            return;
        }
        const audio = new Audio('./music.mp3');
        const viz = new PowerAudio.Viz({
            container: ref.current,
            source: audio,
            startAnalysis: false,
        });
        setViz(viz);
    }, []);

    return (
        <div
            ref={ref}
            className="fixed h-screen w-screen"
        />
    );
}

export default BackgroundViz;
