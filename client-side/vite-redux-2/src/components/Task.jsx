import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions"; // Ensure correct import path

const Task = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const labelRef = useRef(null); 
    const dateRef = useRef(null); 
    const descRef = useRef(null);
  
    function addNewTask() {
      const task ={
        label: labelRef.current.value,
        description: descRef.current.value,
        dateRef: dateRef.current.value.toString()

      };
      if (task !== "") {
dispatch(
  addTodo(task) // Ensure correct action type and payload structure
)

      }
    }
  
    return (
      <div className="task-component">
        <div className="add-task">
         <form>
          <input
          type="text" 
          placeholder="Label"
          ref={labelRef}
          className="taskInput"
          />
          <input
          type="text" 
          placeholder="Description"
          ref={descRef}
          className="taskInput"/>

          <input
          type="date" 
          ref={dateRef}
          className="taskInput"
          />
</form>
          <button onClick={addNewTask}>Add task</button>
        </div>
      </div>
    );
  };
  
  export default Task;