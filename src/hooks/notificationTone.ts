import { useRef, useEffect } from 'react';

export const useNotificationTone = (soundFile: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = soundFile;
            audioRef.current.oncanplay = () => {
                console.log('Audio can play');
            };
        }
    }, [soundFile]);
    
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.volume = 1.0; // Set volume to maximum
            audioRef.current.muted = false; // Ensure audio is not muted
            audioRef.current.play().catch(error => {
                console.error('Error playing audio', error);
            });
        }
    };
    

    return { audioRef, playSound };
};
