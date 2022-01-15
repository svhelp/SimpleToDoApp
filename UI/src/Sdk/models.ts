export interface ITodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
    createdAt: string;
}

export interface ICommandResult<T> {
    isSuсcessful: boolean;
    data?: T | undefined,
}

export enum TodoStatus {
    All,
    Active,
    Completed,
}