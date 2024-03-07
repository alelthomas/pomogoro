import React, { useState, useEffect } from "react";
import { formatTime } from "../timerUtils.js"

function Timer({ pomodoroDuration, breakDuration, sessionDuration }) {
    var pomoCount = 1;
    const [timeRemaining, setTimeRemaining] = useState(pomodoroDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        setTimeRemaining(isBreak ? breakDuration * 60 : pomodoroDuration * 60);
    }, [pomodoroDuration, breakDuration, isBreak]);

    const handleTimerEnd = () => {
        setIsActive(false);
        if (isBreak) {
            setIsBreak(false);
            setTimeRemaining(pomodoroDuration * 60);
        } else {
            setIsBreak(true);
            setTimeRemaining(breakDuration * 60);
            setIsActive(true); // Start break timer immediately
        }
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsBreak(false);
        setTimeRemaining(pomodoroDuration * 60);
    };

    useEffect(() => {
        let interval;
        if (isActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(interval);
                        handleTimerEnd();
                        return 0;
                    }
                });
            }, 1000);
        } else if (isActive && timeRemaining === 0) {
            setIsActive(false);
            pomoCount++;
            handleTimerEnd();
        }
        return () => clearInterval(interval);
    }, [isActive, timeRemaining]);

    return (
        <div>
            <h1>{formatTime(timeRemaining)}</h1>
            {isBreak ? (
                <h2>Break&nbsp;
                {pomoCount}
                /
                {sessionDuration}
                </h2>
            ) : (
                <h2>Pomo&nbsp;
                {pomoCount}
                /
                {sessionDuration}
                </h2>
            )
            }
            {isBreak ? (
                <p>Time for a break!</p>
            ) : (
                <p>Time to focus!</p>
            )}
            <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

export default Timer;