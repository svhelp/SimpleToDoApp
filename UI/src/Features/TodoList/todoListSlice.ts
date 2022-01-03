import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoItem, TodoStatus } from '../../Sdk/models';
import { initialFetchAsync } from './thunks';
import { IUpdateItemPayload } from './todoListApi';

export interface TodoListState {
    filter: TodoStatus,
    items: ITodoItem[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoListState = {
    filter: TodoStatus.All,
    items: [],
    status: 'idle',
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<TodoStatus>) => {
            state.filter = action.payload;
        },
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
        .addCase(initialFetchAsync.fulfilled, (state, action) => {
            state.items = action.payload;
        })
        .addMatcher<PendingAction>(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.status = 'loading';
            }
        )
        .addMatcher<FulfilledAction>(
            (action) => action.type.endsWith('/fulfilled'),
            (state) => {
                state.status = 'idle';
            }
        );
    },
});

export const { setFilter, addItem, removeItem, updateItem } = todoListSlice.actions;

export default todoListSlice.reducer;
