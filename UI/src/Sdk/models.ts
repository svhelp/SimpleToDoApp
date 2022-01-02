export interface ITodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
    createdAt: string;
}

export interface ICommandResult<T> {
    isSucessful: boolean;
    data?: T | undefined,
}