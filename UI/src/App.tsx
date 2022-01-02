import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './App/hooks';
import { initialFetchAsync } from './Features/TodoList/thunks';
import { TodoList } from './Features/TodoList/Components/TodoList';
import { TodosFilterSelector } from './Features/TodoList/Components/TodosFilterSelector';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(initialFetchAsync());
  }, []);

  return (
    <div className="app">
      <h1>Todo list</h1>
      <TodosFilterSelector />
      <TodoList />
    </div>
  );
}

export default App;
