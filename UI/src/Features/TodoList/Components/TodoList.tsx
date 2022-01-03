import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { TodoListItem } from "./TodoListItem";
import { selectStatus, selectTodoItems } from "../selector";
import { addTodoAsync } from "../thunks";
import { CircularProgress, TextField } from "@mui/material";
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

const LoadingContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 200px);
    text-align: center;
    padding-top: 200px;
    background: rgba(255, 255, 255, 0.75);
`;

export function TodoList(){
    const status = useAppSelector(selectStatus);
    const items = useAppSelector(selectTodoItems);
    const dispatch = useAppDispatch();
    const [ newItemText, setNewItemText ] = useState("");

    const addTodo = useCallback(() => {
        dispatch(addTodoAsync(newItemText));
        setNewItemText("");
    }, [ newItemText, dispatch ]);

    return (
        <div>
            <List id="todo-list">
                <div className="row">
                    <TextField variant="standard" label="Enter todo text" value={newItemText} onChange={e => setNewItemText(e.target.value)}/>
                    <AddIcon onClick={addTodo} />
                </div>
                {items.map(i => <TodoListItem key={i.id} item={i}/>)}

            {status === "loading" &&
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>}
            </List>

        </div>        
    );
}
