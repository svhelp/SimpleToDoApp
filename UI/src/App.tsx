import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './App/hooks';
import { initialFetchAsync } from './Features/TodoList/thunks';
import { TodoList } from './Features/TodoList/TodoList';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(initialFetchAsync());
  }, []);

  return (
    <div className="app">
      <h1>Todo list</h1>
      <TodoList />
    </div>
  );
}

export default App;
