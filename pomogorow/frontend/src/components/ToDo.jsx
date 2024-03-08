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

    const [completedTasks, setCompletedTasks] = useState(() => {
        const storedCompletedTasks = localStorage.getItem("completedTasks");
        return storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
            setNewTask("");
        }
    };

    const toggleTask = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        );
        setTasks(updatedTasks);

        const completedTask = tasks.find((task) => task.id === id);
        if (completedTask) {
            setCompletedTasks([...completedTasks, { ...completedTask, date: Date.now() }]);
        }
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
        <div className="todo-widget">
            <h2>To-Do:</h2>
            <input className="retro-input"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
            />
            <button className="todo-btn" onClick={addTask}>Add</button>
            <ul className="todo-tasks">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input className="todo-checkbox"
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                            {task.text}
                        </span>
                        <button onClick={() => removeTask(task.id)} className='task-btn'>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;
