import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle })
      });
      
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setError(null);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
        method: 'POST'
      });
      
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });
      
      setTasks(tasks.filter(t => t.id !== taskId));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
          <p className="subtitle">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </header>

        {error && <div className="error">{error}</div>}

        <div className="add-task-section">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask(e)}
            placeholder="What needs to be done?"
            disabled={loading}
            className="task-input"
          />
          <button 
            onClick={addTask} 
            disabled={loading || !newTaskTitle.trim()}
            className="add-button"
          >
            Add Task
          </button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add your first task to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  disabled={loading}
                  className="task-checkbox"
                />
                <span className="task-title">{task.title}</span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  disabled={loading}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="footer-stats">
            <span>{tasks.filter(t => !t.completed).length} active</span>
            <span>{completedCount} completed</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;