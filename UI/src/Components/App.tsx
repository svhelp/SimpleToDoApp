import React from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';

function App() {
  return (
    <div className="app">
      <h1>Todo list</h1>
      <TodoList />
    </div>
  );
}

export default App;
