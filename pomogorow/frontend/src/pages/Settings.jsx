import React, { useState } from 'react';

function Settings({ onClose, onSave, pomodoroDuration, breakDuration }) {
    const [pomodoroValue, setPomodoroValue] = React.useState(pomodoroDuration);
    const [breakValue, setBreakValue] = React.useState(breakDuration);

    const handleSave = () => {
        onSave({ pomodoroDuration: pomodoroValue, breakDuration: breakValue });
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
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default Settings;