import React, { useState, useEffect } from "react";
import { formatTime } from "../timerUtils.js";
import alertSound from "../assets/sounds/alert.wav";
import Ambience from "./Ambiance.jsx";
import actionSound from '../assets/sounds/select.wav';

function Timer({ pomodoroDuration, breakDuration, sessionDuration, ambience, onPomoComplete, totalTimeFocused, totalPomosCompleted, updateTotalTimeFocused, updateTotalPomosCompleted }) {
    const [timeRemaining, setTimeRemaining] = useState(pomodoroDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const [isSessionOver, setIsSessionOver] = useState(false);

    const audioRef = React.createRef();
    const actionRef = React.createRef();

    useEffect(() => {
        setTimeRemaining(isBreak ? breakDuration * 60 : pomodoroDuration * 60);
    }, [pomodoroDuration, breakDuration, isBreak]);

    const handleTimerEnd = () => {
        setIsActive(false);
        if (isBreak) {
            setIsBreak(false);
            setTimeRemaining(pomodoroDuration * 60);
            if (sessionCount === sessionDuration * 2 - 1) {
                setIsSessionOver(true);
                setIsActive(false);
            } else {
                setIsActive(true);
            }
        } else {
            setIsBreak(true);
            setTimeRemaining(breakDuration * 60);
            setIsActive(true);
        }
        audioRef.current.play();
        if (!isBreak) {
            updateTotalTimeFocused(prevTime => prevTime + pomodoroDuration * 60);
            updateTotalPomosCompleted(prevCount => prevCount + 1);
            if (onPomoComplete) {
                onPomoComplete();
            }
        }
    };

    const toggleTimer = () => {
        actionRef.current.play();
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        actionRef.current.play();
        setIsActive(false);
        setIsBreak(false);
        setTimeRemaining(pomodoroDuration * 60);
        setSessionCount(0);
        setIsSessionOver(false);
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
            handleTimerEnd();
            setSessionCount(prevCount => prevCount + 1);
        }
        return () => clearInterval(interval);
    }, [isActive, timeRemaining]);

    return (
        <div className="timer-widget">
            <h1 class="floating">{formatTime(timeRemaining)}</h1>
            <Ambience ambience={ambience} />
            {isSessionOver ? (
                <h2>Session is over. Well done!</h2>
            ) : (
                <>
                    {isBreak ? (
                        <h2>Break {Math.floor(sessionCount / 2) + 1}/{sessionDuration}</h2>
                    ) : (
                        <h2>Pomo {Math.ceil(sessionCount / 2) + 1}/{sessionDuration}</h2>
                    )}
                    {isBreak ? (
                        <p>Time for a break!</p>
                    ) : (
                        <p>Time to focus!</p>
                    )}
                </>
            )}
            <audio ref={audioRef} src={alertSound} />
            <audio ref={actionRef} src={actionSound} />
            <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

export default Timer;
