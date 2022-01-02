import { RootState } from "../../App/store";

export const selectTodoItems = (state: RootState) => state.todoList.items.slice().sort((a, b) => b.id - a.id);

export const selectStatus = (state: RootState) => state.todoList.status;