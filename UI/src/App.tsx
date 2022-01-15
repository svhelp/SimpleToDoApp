import { useEffect } from 'react';
import { useAppDispatch } from './App/hooks';
import { initialFetchAsync } from './Features/TodoList/thunks';
import { TodosFilterSelector } from './Features/TodoList/Components/TodosFilterSelector';
import { TodoListContainer } from './Features/TodoList/Components/TodoListContainer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(initialFetchAsync());
  }, [ dispatch ]);

  return (
    <div className="app">
      <TodosFilterSelector />
      <TodoListContainer />
    </div>
  );
}

export default App;
