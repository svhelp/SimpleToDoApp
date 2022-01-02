import { useCallback } from "react";
import { useAppDispatch } from "../../../App/hooks";
import { TodoStatus } from "../../../Sdk/models";
import { setFilter } from "../todoListSlice";


export function TodosFilterSelector(){
    const dispatch = useAppDispatch();

    const selectFilterType = useCallback((filterType: TodoStatus) => {
        dispatch(setFilter(filterType));
    }, []);

    return (
        <div>
            <a onClick={() => selectFilterType(TodoStatus.All)}>All</a>
            <a onClick={() => selectFilterType(TodoStatus.Active)}>Active</a>
            <a onClick={() => selectFilterType(TodoStatus.Completed)}>Completed</a>
        </div>);
}