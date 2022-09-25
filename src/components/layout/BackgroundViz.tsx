import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { PowerAudio } from 'poweraudio';
import { Viz } from 'poweraudio/build/Viz';
import { useWindowScroll } from 'react-use';


function BackgroundViz() {

    // Container
    const ref = useRef<HTMLDivElement>(null);

    // Viz and Audio object
    const [viz, setViz] = useState<null | Viz>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    // Whether the audio/viz should be playing
    const playing = useAppSelector(state => state.viz.playing);

    // Track window scroll Y position and update container position to give a parallax effect
    const { y: scrollY } = useWindowScroll();
    const [scrollRatio, setScrollRatio] = useState(0);
    const [scrollOverhead, setScrollOverhead] = useState(200);

    /**
     * Initialize visualization on mount
     */
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
        setAudio(audio);
        setViz(viz);
    }, []);

    /**
     * Start playing audio on store order
     */
    useEffect(() => {
        if (! playing || ! audio || ! viz) {
            return;
        }
        viz.start();
        audio.play();
    }, [audio, viz, playing]);

    /**
     * Listen for window scroll and update container position
     */
    useEffect(() => {
        // Update scroll ratio
        const ratio = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        setScrollRatio(ratio || 0);
        // Update audio volume (decrease volume when user scrolls down)
        const volume = Math.max(0.1, 1 - (scrollY / (window.innerHeight * .5)));
        if (audio) {
            audio.volume = volume;
        }
    }, [scrollY]);

    return (
        <div
            className="fixed h-full w-full -z-10 pointer-events-none"
            style={{
                height: `calc(100vh + ${scrollOverhead}px)`,
                top: - scrollRatio * scrollOverhead,
            }}
        >
            <div
                ref={ref}
                id="animation-container"
                className='animation-container w-full h-full'
            />
        </div>
    );
}

export default BackgroundViz;
