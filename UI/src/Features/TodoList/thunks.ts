import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./todoListApi";
import { IUpdateItemPayload } from "./todoListApi";
import { addItem, removeItem, updateItem } from "./todoListSlice";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const initialFetchAsync = createAsyncThunk(
    'todoList/initialFetch',
    async () => {
        const response = await api.fetchTodoList();

        return response.data;
    }
);

export const addTodoAsync = createAsyncThunk(
    'todoList/addTodo',
    async (newItemText: string, thunkApi) => {
        if (!newItemText){
            return;
        }
    
        const addResult = await api.addTodo(newItemText);
    
        if (!addResult.isSucessful || !addResult.data){
            return;
        }
    
        thunkApi.dispatch(addItem(addResult.data));

        return;
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todoList/updateTodo',
    async (payload: IUpdateItemPayload, thunkApi) => {
        const response = await api.updateTodo(payload);
    
        if (!response.isSucessful){
            return;
        }
        
        thunkApi.dispatch(updateItem(payload));

        return;
    }
);

export const removeTodoAsync = createAsyncThunk(
    'todoList/removeTodo',
    async (id: number, thunkApi) => {
        const response = await api.removeTodo(id);
    
        if (!response.isSucessful){
            return;
        }
    
        thunkApi.dispatch(removeItem(id));

        return;
    }
);