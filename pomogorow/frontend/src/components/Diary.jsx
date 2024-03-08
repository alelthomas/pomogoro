import React, { useState, useEffect } from "react";
import { formatTime } from "../timerUtils.js";

function Diary({ totalTimeFocused, totalPomosCompleted }) {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const storedCompletedTasks = localStorage.getItem("completedTasks");
        if (storedCompletedTasks) {
            setCompletedTasks(JSON.parse(storedCompletedTasks));
        }
    }, []);

    return (
        <div className="diary-page">
            <h2 className="floating completed-list">Completed Tasks</h2>
            <ul>
                {completedTasks.map((task, index) => (
                    <li key={index}>
                        {task.text} - {new Date(task.date).toLocaleString()}
                    </li>
                ))}
            </ul>
            <div className="totals-section">
                <p>Total Time Focused: {formatTime(totalTimeFocused)}</p>
                <p>Total Pomodoros Completed: {totalPomosCompleted}</p>
            </div>
        </div>
    );
}

export default Diary;
