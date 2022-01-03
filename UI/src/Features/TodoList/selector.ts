import { RootState } from "../../App/store";
import { TodoStatus } from "../../Sdk/models";

export const selectTodoItems = (state: RootState) => {
    switch (state.todoList.filter) {
        case TodoStatus.All:
            return state.todoList.items.slice().sort((a, b) => b.id - a.id);
        case TodoStatus.Active:
            return state.todoList.items.filter(x => !x.isCompleted).sort((a, b) => b.id - a.id);
        case TodoStatus.Completed:
            return state.todoList.items.filter(x => x.isCompleted).sort((a, b) => b.id - a.id);
    }
} 

export const selectFilterType = (state: RootState) => state.todoList.filter;

export const selectStatus = (state: RootState) => state.todoList.status;