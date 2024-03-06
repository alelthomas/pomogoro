import { useState, useEffect } from "react";

export function useCountdownTimer(initialTime, onTimerEnd) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timerInterval = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timerInterval);
                        setIsActive(false);
                        onTimerEnd();
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(timerInterval);
        }
    }, [isActive, initialTime, onTimerEnd]);

    const toggleTimer = () => {
        setIsActive(prevIsActive => !prevIsActive);
    };

    const resetTimer = () => {
        setTimeRemaining(initialTime);
        setIsActive(false);
    };

    return { timeRemaining, isActive, toggleTimer, resetTimer };
}

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

