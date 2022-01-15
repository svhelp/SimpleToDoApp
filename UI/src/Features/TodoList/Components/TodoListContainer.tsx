import { useAppSelector } from "../../../App/hooks";
import { selectStatus } from "../selector";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { AddTodoRow } from "./AddTodoRow";
import { TodoList } from "./TodoList";

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

export function TodoListContainer(){    
    const status = useAppSelector(selectStatus);
    
    return (
        <div>
            <List id="todo-list">
                <AddTodoRow />
                <TodoList />

                {status === "loading" &&
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>}
            </List>
        </div>        
    );
}