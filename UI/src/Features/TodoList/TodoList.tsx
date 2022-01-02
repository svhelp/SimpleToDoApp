import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import { selectTodoItems } from "./selector";
import { addTodoAsync } from "./thunks";


export function TodoList(){
    const items = useAppSelector(selectTodoItems);
    const dispatch = useAppDispatch();
    const [ newItemText, setNewItemText ] = useState("");

    const addTodo = useCallback(() => {
        dispatch(addTodoAsync(newItemText));
        setNewItemText("");
    }, [ newItemText ]);

    return (
        <>
            <div>
                <input value={newItemText} onChange={e => setNewItemText(e.target.value)}/>
                <button onClick={addTodo}/>
            </div>
            {items.map(i => <TodoListItem key={i.id} item={i}/>)}
        </>
    );
}
