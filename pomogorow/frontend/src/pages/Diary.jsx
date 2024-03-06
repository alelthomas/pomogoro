import React, { useState, useEffect } from "react";

function Diary() {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const storedCompletedTasks = localStorage.getItem("completedTasks");
        if (storedCompletedTasks) {
            setCompletedTasks(JSON.parse(storedCompletedTasks));
        }
    }, []);

    return (
        <div>
            <h2>Completed Tasks</h2>
            <ul>
                {completedTasks.map((task, index) => (
                    <li key={index}>
                        {task.text} - Completed on: {new Date(task.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Diary;