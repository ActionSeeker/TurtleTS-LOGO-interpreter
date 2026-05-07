import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed: number = 70) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayedText(""); // Clear previous text

        const timer = setInterval(() => {
            // Functional update to avoid closure staleness
            setDisplayedText(text.slice(0, i + 1));
            i++;

            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return displayedText;
};