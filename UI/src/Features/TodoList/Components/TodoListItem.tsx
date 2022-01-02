import { useCallback, useState } from "react";
import { useAppDispatch } from "../../../App/hooks";
import { ITodoItem } from "../../../Sdk/models";
import { removeTodoAsync, updateTodoAsync } from "../thunks";

interface IProps {
    item: ITodoItem;
}

export function TodoListItem(props: IProps) {
    const dispatch = useAppDispatch();
    const { item } = props;

    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedText, setUpdatedText] = useState(item.text);

    const updateCompleted = useCallback((isCompleted: boolean) => {
        dispatch(updateTodoAsync({ targetId: item.id, updater: { isCompleted } }));
    }, []);
    
    const updateText = useCallback(() => {
        dispatch(updateTodoAsync({ targetId: item.id, updater: { text: updatedText } }));
    }, [ updatedText ]);

    const removeTodo = useCallback(() => { 
        dispatch(removeTodoAsync(item.id));
    }, []);

    return (
        <div>
            <input type="checkbox" checked={item.isCompleted} onChange={e => updateCompleted(e.target.checked)}/>
            <div title={item.createdAt}>
                <input value={updatedText} onChange={e => setUpdatedText(e.target.value)} onBlur={updateText}/>
            </div>
            <button onClick={removeTodo}/>
        </div>
    );
}