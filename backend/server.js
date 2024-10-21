const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage for todos
let todos = [];

// API Endpoints

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// Toggle completion of a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.json({ message: 'Todo deleted' });
});

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
