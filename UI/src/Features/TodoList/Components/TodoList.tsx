import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { TodoListItem } from "./TodoListItem";
import { selectTodoItems } from "../selector";
import { addTodoAsync } from "../thunks";
import { TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;

    .row {
        display: flex;        
        align-items: center;
        margin: 4px;

        &:first-child {        
            margin: 16px 4px 16px 42px;
        }

        svg {
            cursor: pointer;
        }

        > div {
            margin: 0px 8px;
        }
    }
`

export function TodoList(){
    const items = useAppSelector(selectTodoItems);
    const dispatch = useAppDispatch();
    const [ newItemText, setNewItemText ] = useState("");

    const addTodo = useCallback(() => {
        dispatch(addTodoAsync(newItemText));
        setNewItemText("");
    }, [ newItemText ]);

    return (
        <List id="todo-list">
            <div className="row">
                <TextField variant="standard" label="Enter todo text" value={newItemText} onChange={e => setNewItemText(e.target.value)}/>
                <AddIcon onClick={addTodo} />
            </div>
            {items.map(i => <TodoListItem key={i.id} item={i}/>)}
        </List>
    );
}
