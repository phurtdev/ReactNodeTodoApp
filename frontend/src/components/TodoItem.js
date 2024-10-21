import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex justify-between items-center mb-2">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id, !todo.completed)}
          className="mr-2"
        />
        <span className={todo.completed ? 'line-through' : ''}>{todo.task}</span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;