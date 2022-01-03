import { Checkbox, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
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

    const [updatedText, setUpdatedText] = useState(item.text);

    const updateCompleted = useCallback((isCompleted: boolean) => {
        dispatch(updateTodoAsync({ targetId: item.id, updater: { isCompleted } }));
    }, []);
    
    const updateText = useCallback(() => {
        if (!updatedText){
            setUpdatedText(item.text);
            return;
        }

        dispatch(updateTodoAsync({ targetId: item.id, updater: { text: updatedText } }));
    }, [ updatedText ]);

    const removeTodo = useCallback(() => { 
        dispatch(removeTodoAsync(item.id));
    }, []);

    return (
        <div className="row">
            <Checkbox size="small" checked={item.isCompleted} onChange={e => updateCompleted(e.target.checked)}/>
            <div title={item.createdAt}>
                <TextField variant="standard" value={updatedText} onChange={e => setUpdatedText(e.target.value)} onBlur={updateText}/>
            </div>
            <DeleteIcon onClick={removeTodo} />
        </div>
    );
}