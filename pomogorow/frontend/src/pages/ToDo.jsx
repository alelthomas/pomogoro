import React, { useState, useEffect } from "react";

function ToDo() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
            setNewTask("");
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    };

    const editTask = (id, newText) => {
        if (newText.trim() !== "") {
            setTasks(tasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            ));
        }
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h2>To-Do List</h2>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                            {task.text}
                        </span>
                        <button onClick={() => editTask(task.id, prompt("Edit task:", task.text))}>Edit</button>
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;