import { useState } from "react";
import { ITodoItem } from "../../Sdk/models";


interface IProps {
    item: ITodoItem;
    updateItem: (updatedItem: ITodoItem) => void;
    removeItem: () => void;
}

export function TodoListItem(props: IProps) {
    const { item, updateItem, removeItem } =  props;

    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedText, setUpdatedText] = useState(item.text);

    const setIsCompleted = (isCompleted: boolean) => {
        const updatedItem = { ...item, isCompleted };

        updateItem(updatedItem);
    }

    const setNewText = () => {
        if (!updatedText){
            setUpdatedText(item.text);
        }

        const updatedItem = { ...item, text: updatedText };

        updateItem(updatedItem);
    }

    return (
        <div>
            <input type="checkbox" checked={item.isCompleted} onChange={e => setIsCompleted(e.target.checked)}/>
            <div title={item.createdAt.toDateString()}>
                <input value={updatedText} onChange={e => setUpdatedText(e.target.value)} onBlur={setNewText}/>
            </div>
            <button onClick={removeItem}/>
        </div>
    );
}