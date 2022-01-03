import React, { useEffect } from 'react';
import { useAppDispatch } from './App/hooks';
import { initialFetchAsync } from './Features/TodoList/thunks';
import { TodoList } from './Features/TodoList/Components/TodoList';
import { TodosFilterSelector } from './Features/TodoList/Components/TodosFilterSelector';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(initialFetchAsync());
  }, [ dispatch ]);

  return (
    <div className="app">
      <TodosFilterSelector />
      <TodoList />
    </div>
  );
}

export default App;
