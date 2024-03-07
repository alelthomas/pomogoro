import React, { useState } from 'react';

function Settings({ onClose, onSave, pomodoroDuration, breakDuration, sessionDuration }) {
    const [pomodoroValue, setPomodoroValue] = React.useState(pomodoroDuration);
    const [breakValue, setBreakValue] = React.useState(breakDuration);
    const [sessionValue, setSessionValue] = useState(sessionDuration);

    const handleSave = () => {
        onSave({ pomodoroDuration: pomodoroValue, breakDuration: breakValue, sessionDuration: sessionValue });
        onClose();
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <div>
                <label htmlFor="pomodoroDuration">Pomodoro Duration (minutes):</label>
                <input
                    type="number"
                    id="pomodoroDuration"
                    value={pomodoroValue}
                    onChange={(e) => setPomodoroValue(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="breakDuration">Break Duration (minutes):</label>
                <input
                    type="number"
                    id="breakDuration"
                    value={breakValue}
                    onChange={(e) => setBreakValue(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="sessionDuration">Number of Pomodoros:</label>
                <input 
                    type="number" 
                    id="sessionDuration" 
                    value={sessionValue} 
                    onChange={(e) => setSessionValue(parseInt(e.target.value))}  
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
} 

export default Settings;