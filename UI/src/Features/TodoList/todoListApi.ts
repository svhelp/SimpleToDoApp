import { ICommandResult, ITodoItem } from "../../Sdk/models";

export interface IUpdateItemPayload{
    targetId: number;
    updater: Partial<ITodoItem>;
}

const storageKey = "todoListCachedData";
const maxServerDelay = 0;

// A mock function to mimic making an async request for data
export function fetchTodoList() {
    return new Promise<{ data: ITodoItem[] }>((resolve) =>
    {
        const storedData = localStorage.getItem(storageKey);
        const todos: ITodoItem[] = !! storedData ? JSON.parse(storedData) : [];

        setTimeout(() => resolve({ data: todos }), getDelay());
    });
}

export function addTodo(newItemText: string) {
    return new Promise<ICommandResult<ITodoItem>>((resolve) =>
    {
        const newItem = {
            id: Date.now(),
            text: newItemText,
            isCompleted: false,
            createdAt: new Date().toDateString(),
        }

        const storedData = localStorage.getItem(storageKey);    

        const todos: ITodoItem[] = !! storedData ? JSON.parse(storedData) : [];
        todos.unshift(newItem);

        localStorage.setItem(storageKey, JSON.stringify(todos));

        setTimeout(() => resolve({ isSuсcessful: true, data: newItem }), getDelay());
    });
}

export function updateTodo(payload: IUpdateItemPayload) {
    return new Promise<ICommandResult<never>>((resolve) =>
    {
        const storedData = localStorage.getItem(storageKey);
        let todos: ITodoItem[] = !! storedData ? JSON.parse(storedData) : [];
        const targetItem = todos.find(i => i.id === payload.targetId);

        if (!targetItem){
            return { isSuccessful: false };
        }

        const updatedItem = {...targetItem, ...payload.updater};

        todos = todos.filter(i => i.id !== payload.targetId);
        todos.push(updatedItem);

        localStorage.setItem(storageKey, JSON.stringify(todos));

        setTimeout(() => resolve({ isSuсcessful: true }), getDelay());
    });
}

export function removeTodo(id: number) {
    return new Promise<ICommandResult<never>>((resolve) =>
    {
        const storedData = localStorage.getItem(storageKey);

        let todos: ITodoItem[] = !! storedData ? JSON.parse(storedData) : [];
        todos = todos.filter(x => x.id !== id);

        localStorage.setItem(storageKey, JSON.stringify(todos));

        setTimeout(() => resolve({ isSuсcessful: true }), getDelay());
    });
}

function getDelay() {
    return Math.floor(Math.random() * maxServerDelay);
}