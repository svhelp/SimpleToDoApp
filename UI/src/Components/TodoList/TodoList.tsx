import { useState } from "react";
import { ITodoItem } from "../../Sdk/models";
import { TodoListItem } from "../TodoListItem/TodoListItem";


export function TodoList(){

    const [ newItemText, setNewItemText ] = useState("");
    const [ items, setItems ] = useState([] as ITodoItem[]);

    const addItem = () => {
        if (!newItemText){
            return;
        }

        const newItem = {
            text: newItemText,
            isCompleted: false,
            createdAt: new Date(),
        }

        const newArray = [newItem, ...items];
        setItems(newArray);
        setNewItemText("");
    };

    const removeItem = (itemToRemove: ITodoItem) => {
        setItems([...items].filter(i => i !== itemToRemove));
    }

    const updateItem = (itemToUpdate: ITodoItem, updatedItem: ITodoItem) => {
        setItems([updatedItem, ...items].filter(i => i !== itemToUpdate).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1));
    }

    return (
        <>
            <div>
                <input value={newItemText} onChange={e => setNewItemText(e.target.value)}/>
                <button onClick={addItem}/>
            </div>
            {items.map(i => <TodoListItem key={i.createdAt.toISOString()} item={i} removeItem={() => removeItem(i)} updateItem={(x) => updateItem(i, x)}/>)}
        </>
    );
}
