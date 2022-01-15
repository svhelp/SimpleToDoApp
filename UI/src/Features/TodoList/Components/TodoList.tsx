import { useAppSelector } from "../../../App/hooks";
import { TodoListItem } from "./TodoListItem";
import { selectTodoItems } from "../selector";

export function TodoList(){
    const items = useAppSelector(selectTodoItems);
    
    return (
        <>
            {items.map(i => <TodoListItem key={i.id} item={i}/>)}
        </>        
    );
}
