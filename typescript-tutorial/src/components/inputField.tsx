import React, { useRef } from "react";
import './styles.css';

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e : React.FormEvent)=>void;
}


const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd}) => {
const inputRef = useRef<HTMLInputElement>(null); 
//useRef in this code is used to get a direct reference to the rendered 
// HTML <input> DOM element. Initially, inputRef.current is null, but React 
// updates it with the actual <input> element once it's rendered. This allows 
// your component to imperatively call the blur() method on that specific 
// input element when the form is submitted, which programmatically 
// removes its keyboard focus (like making the cursor disappear), 
// without causing a re-render or applying a visual blur effect.


return (
        <form 
        className='input' 
        onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
        }}>
            <input 
            ref={inputRef}
            type='input' 
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a task" 
            className="input__box" 
            />
            <button className="input_submit" type="submit">Go</button>
        </form>
    )
}

export default InputField;