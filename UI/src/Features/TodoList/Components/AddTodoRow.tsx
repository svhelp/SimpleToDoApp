import { useState } from "react";
import { useAppDispatch } from "../../../App/hooks";
import { addTodoAsync } from "../thunks";
import { TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export function AddTodoRow(){
    const dispatch = useAppDispatch();
    const [ newItemText, setNewItemText ] = useState("");

    const addTodo = () => {
        dispatch(addTodoAsync(newItemText));
        setNewItemText("");
    };

    return (
        <div className="row">
            <TextField variant="standard" label="Enter todo text" value={newItemText} onChange={e => setNewItemText(e.target.value)}/>
            <AddIcon onClick={addTodo} />
        </div>);
}