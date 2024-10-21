import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch all todos
  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    }
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim()) {
      const response = await axios.post('http://localhost:5000/api/todos', { task: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id, completed) => {
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed });
    setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border rounded p-2 mr-2 w-full"
            placeholder="Add a new task"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul className="list-none">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

