const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let tasks = [];
let taskIdCounter = 1;

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  
  const newTask = {
    id: taskIdCounter++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks/:taskId/complete - Mark task as complete/incomplete (toggle)
app.post('/tasks/:taskId/complete', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.completed = !task.completed;
  res.json(task);
});

// DELETE /tasks/:taskId - Delete a task (bonus feature)
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Manager API is running',
    endpoints: {
      'POST /tasks': 'Create a new task',
      'GET /tasks': 'Get all tasks',
      'POST /tasks/:taskId/complete': 'Toggle task completion',
      'DELETE /tasks/:taskId': 'Delete a task'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});