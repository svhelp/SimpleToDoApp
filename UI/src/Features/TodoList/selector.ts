import { RootState } from "../../App/store";
import { TodoStatus } from "../../Sdk/models";

export const selectTodoItems = (state: RootState) => {
    switch (state.todoList.filter) {
        case TodoStatus.All:
            return state.todoList.items;
        case TodoStatus.Active:
            return state.todoList.items.filter(x => !x.isCompleted);
        case TodoStatus.Completed:
            return state.todoList.items.filter(x => x.isCompleted);
    }
} 

export const selectFilterType = (state: RootState) => state.todoList.filter;

export const selectStatus = (state: RootState) => state.todoList.status;