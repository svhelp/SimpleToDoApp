import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { TodoStatus } from "../../../Sdk/models";
import { setFilter } from "../todoListSlice";
import { selectFilterType } from "../selector";
import { Tab, Tabs } from "@mui/material";


export function TodosFilterSelector(){
    const dispatch = useAppDispatch();
    const currentFilter = useAppSelector(selectFilterType);

    const changeFilterType = useCallback((filterType: TodoStatus) => {
        dispatch(setFilter(filterType));
    }, []);

    return (
        <Tabs value={currentFilter} onChange={(e, newValue) => changeFilterType(newValue)} centered>
            <Tab label="All" value={TodoStatus.All} />
            <Tab label="Active" value={TodoStatus.Active} />
            <Tab label="Completed" value={TodoStatus.Completed} />
        </Tabs>);
}