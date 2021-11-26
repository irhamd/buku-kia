import React, { useState, useEffect } from "react";
import sirine from "./sirine.m4a"


export const useSuara = () => {
    const [audio] = useState(new Audio(sirine));
    const [playing, setPlaying] = useState(true);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {

        if (playing) audio.play()
        else {
            audio.pause();
            console.log(`audio`, audio)
            audio.currentTime = 0;
        }
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        // audio.addEventListener('loop');
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};
