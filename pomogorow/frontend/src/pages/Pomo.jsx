import React, { useState } from 'react';
import Timer from './Timer';
import Settings from './Settings';
import ToDo from './ToDo';

function Pomo() {

    const [showSettings, setShowSettings] = useState(false);
    const [pomodoroDuration, setPomodoroDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    const handleSaveSettings = ({ pomodoroDuration, breakDuration }) => {
        setPomodoroDuration(pomodoroDuration);
        setBreakDuration(breakDuration);
    };

    return (
        <div>
            <div className="timer-section">
                <Timer
                    pomodoroDuration={pomodoroDuration}
                    breakDuration={breakDuration}
                />
                {showSettings && (
                    <Settings
                        onClose={() => setShowSettings(false)}
                        onSave={handleSaveSettings}
                        pomodoroDuration={pomodoroDuration}
                        breakDuration={breakDuration}
                    />
                )}
                <button onClick={() => setShowSettings(true)}>Settings</button>
            </div>

            <div className="todo-section">
                <ToDo />
            </div>
        </div>
    );
}

export default Pomo