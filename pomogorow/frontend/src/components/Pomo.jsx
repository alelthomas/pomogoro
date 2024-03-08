import React, { useState } from 'react';
import Timer from './Timer';
import Settings from './Settings';
import ToDo from './ToDo';
import Ambience from './Ambiance';
import tomatoIcon from '../assets/images/tomato.png';

function Pomo() {
    const [showSettings, setShowSettings] = useState(false);
    const [pomodoroDuration, setPomodoroDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [sessionDuration, setSessionDuration] = useState(5);
    const [ambience, setAmbience] = useState(null);
    const [totalTimeFocused, setTotalTimeFocused] = useState(0);
    const [totalPomosCompleted, setTotalPomosCompleted] = useState(0);

    const handleSaveSettings = ({ pomodoroDuration, breakDuration, sessionDuration }) => {
        setPomodoroDuration(pomodoroDuration);
        setBreakDuration(breakDuration);
        setSessionDuration(sessionDuration);
    };

    const updateTotalTimeFocused = (time) => {
        setTotalTimeFocused(time);
    };

    const updateTotalPomosCompleted = (count) => {
        setTotalPomosCompleted(count);
    };

    return (
        <div class="pomodoro-page">
            <div className="timer-section">
                <img src={tomatoIcon} className='tomato-icon' alt="tomato pixel icon" />
                <Timer
                    pomodoroDuration={pomodoroDuration}
                    breakDuration={breakDuration}
                    sessionDuration={sessionDuration}
                    ambience={ambience}
                    totalTimeFocused={totalTimeFocused}
                    totalPomosCompleted={totalPomosCompleted}
                    updateTotalTimeFocused={updateTotalTimeFocused}
                    updateTotalPomosCompleted={updateTotalPomosCompleted}
                />
                {showSettings && (
                    <Settings
                        onClose={() => setShowSettings(false)}
                        onSave={handleSaveSettings}
                        pomodoroDuration={pomodoroDuration}
                        breakDuration={breakDuration}
                        sessionDuration={sessionDuration}
                    />
                )}
                <button onClick={() => setShowSettings(true)} className='settings-btn'>Settings</button>
                <div className="sounds-section">
                    <h2>Ambience</h2>
                    <div className='ambiance-buttons'>
                        <button onClick={() => setAmbience("fire")}>
                            <svg fill='#C25452' width="25px" height="25px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-fire">
                                <path d="M14 20H7V19H6V18H5V17H4V12H5V10H6V9H7V8H8V9H9V11H10V9H11V5H10V4H9V3H8V2H11V3H13V4H14V5H15V6H16V7H17V9H18V16H17V18H16V19H14M12 18V17H14V16H15V14H16V10H15V8H14V7H13V11H12V13H11V14H10V15H9V14H8V11H7V12H6V16H7V17H8V18Z" />
                            </svg>
                        </button>
                        <button onClick={() => setAmbience("rain")}>
                            <svg fill="#F1FBFF" width="25px" height="25px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-water">
                                <path d="M14,21H8V20H6V19H5V18H4V16H3V13H4V11H5V9H6V7H7V6H8V4H9V3H10V1H12V3H13V4H14V6H15V7H16V9H17V11H18V13H19V16H18V18H17V19H16V20H14Z" />
                            </svg>
                        </button>
                        <button onClick={() => setAmbience(null)}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 75 75"
                                stroke="#005577" stroke-width="5">
                                <path d="m39,14-17,15H6V48H22l17,15z" fill="#005577" stroke-linejoin="round" />
                                <path d="m49,26 20,24m0-24-20,24" fill="none" stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Ambience ambience={ambience} />
            </div>
            <div className='todo-section'>
                <div className="todo-area">
                    <ToDo />
                </div>
            </div>


        </div>
    );
}

export default Pomo;
