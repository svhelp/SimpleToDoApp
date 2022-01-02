import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoItem } from '../../Sdk/models';
import { addTodoAsync, initialFetchAsync, removeTodoAsync, updateTodoAsync } from './thunks';
import { IUpdateItemPayload } from './todoListApi';

export interface TodoListState {
    items: ITodoItem[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoListState = {
    items: [],
    status: 'idle',
};

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ITodoItem>) => {
            const newItem = action.payload;
            state.items.push(newItem);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        updateItem: (state, action: PayloadAction<IUpdateItemPayload>) => {
            const targetItem = state.items.find(i => i.id === action.payload.targetId);

            if (!targetItem){
                return;
            }

            const updatedItem = {...targetItem, ...action.payload.updater};

            state.items = state.items.filter(i => i.id !== action.payload.targetId);
            state.items.push(updatedItem);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(initialFetchAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addTodoAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateTodoAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(removeTodoAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(initialFetchAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items = action.payload;
        })
        .addCase(addTodoAsync.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(updateTodoAsync.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(removeTodoAsync.fulfilled, (state) => {
            state.status = 'idle';
        });
    },
});

export const { addItem, removeItem, updateItem } = todoListSlice.actions;

export default todoListSlice.reducer;
