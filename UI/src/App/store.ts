import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from '../Features/TodoList/todoListSlice';

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
