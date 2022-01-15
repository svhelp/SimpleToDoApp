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

    const updateCompleted = useCallback(({ target: { checked }}: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTodoAsync({ targetId: item.id, updater: { isCompleted: checked } }));
    }, [ item.id, dispatch ]);
    
    const onChangeUpdated = useCallback(({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => { 
        setUpdatedText(value);
    }, [])

    const updateText = useCallback(() => {
        if (!updatedText){
            setUpdatedText(item.text);
            return;
        }

        if (updatedText === item.text) {
            return;
        }    

        dispatch(updateTodoAsync({ targetId: item.id, updater: { text: updatedText } }));
    }, [ updatedText, item.id, item.text, dispatch ]);

    const removeTodo = useCallback(() => { 
        dispatch(removeTodoAsync(item.id));
    }, [ item.id, dispatch ]);

    return (
        <div className="row">
            <Checkbox size="small" checked={item.isCompleted} onChange={updateCompleted}/>
            <div title={item.createdAt}>
                <TextField variant="standard" value={updatedText} onChange={onChangeUpdated} onBlur={updateText}/>
            </div>
            <DeleteIcon onClick={removeTodo} />
        </div>
    );
}