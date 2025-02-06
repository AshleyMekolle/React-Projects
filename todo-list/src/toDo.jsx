import { useState, useEffect } from "react";
import { Calendar, CheckCircle2, Circle, Plus, Trash2, ChevronUp, ChevronDown, Tag } from 'lucide-react';
import './App.css';

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = JSON.parse(localStorage.getItem('themed-todo-list')) || [];
        return savedTasks;
    });
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("personal");
    const [filter, setFilter] = useState("all");
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('todo-theme') || 'default';
    });

    useEffect(() => {
        localStorage.setItem('themed-todo-list', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('todo-theme', theme);
        document.body.className = `theme-${theme}`;
    }, [theme]);

    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, {
                id: Date.now(),
                text: newTask,
                completed: false,
                dueDate: dueDate,
                category: category,
                createdAt: new Date().toISOString()
            }]);
            setNewTask("");
            setDueDate("");
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    }

    function toggleComplete(id) {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    function moveTask(index, direction) {
        if ((direction === -1 && index > 0) || (direction === 1 && index < tasks.length - 1)) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + direction]] =
                [updatedTasks[index + direction], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return task.category === filter;
    });

    return (
        <div className="todo-container">
            <div className="todo-card">
                <div className="todo-header">
                    <div className="header-content">
                        <h1>ToodleDo 🦄🌸</h1>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="theme-selector"
                        >
                            <option value="default">Default</option>
                            <option value="purple">Purple</option>
                            <option value="green">Green</option>
                            <option value="rose">Rose</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>

                    <div className="filter-buttons">
                        {['all', 'active', 'completed'].map((filterType) => (
                            <button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                            >
                                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter task"
                            value={newTask}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="task-input"
                        />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="date-input"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="category-select"
                        >
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="shopping">Shopping</option>
                            <option value="health">Health</option>
                        </select>
                        <button className="add-button" onClick={addTask}>
                            <Plus size={24} />
                        </button>
                    </div>
                </div>

                <div className="todo-list">
                    {filteredTasks.map((task, index) => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <button onClick={() => toggleComplete(task.id)} className="complete-btn">
                                {task.completed ? (
                                    <CheckCircle2 className="check-icon" size={20} />
                                ) : (
                                    <Circle className="circle-icon" size={20} />
                                )}
                            </button>

                            <div className="task-content">
                                <p className="task-text">{task.text}</p>
                                <div className="task-details">
                                    {task.dueDate && (
                                        <span className="due-date">
                                            <Calendar size={14} />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    <span className={`category-tag ${task.category}`}>
                                        <Tag size={12} />
                                        {task.category}
                                    </span>
                                </div>
                            </div>

                            <div className="task-actions">
                                <button onClick={() => moveTask(index, -1)} className="move-btn">
                                    <ChevronUp size={20} />
                                </button>
                                <button onClick={() => moveTask(index, 1)} className="move-btn">
                                    <ChevronDown size={20} />
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredTasks.length === 0 && (
                        <div className="empty-state">
                            No tasks found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ToDoList;