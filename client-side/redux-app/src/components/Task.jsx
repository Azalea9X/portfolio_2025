import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions"; // Ensure correct import path

const Task = () => {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const authorRef = useRef(null);

  function addNewTask(event) {
    event.preventDefault();
    const task = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      author: authorRef.current.value.toString()
    };

    if (task.title !== "" && task.content !== "" && task.author !== "") {
      dispatch(addTodo(task));
document.write("Task sent");
    }
  }

  return (
    <div className="task-component" >
      <div className="add-task">
        <form onSubmit={addNewTask} className="w-[600px]" 
         style={{
          display: "flex",
          flexDirection: "column",
          gap: "100px",
          padding: "20px",
          margin: "0 auto",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center", 
          backgroundColor: "black", 
          color: "white",
     

        }} >
          <label htmlFor="title">Title
          <input
            type="text"
            name="title"
            ref={titleRef}
            className="taskInput text-white"

          /></label>
          <label htmlFor="content">Content
          <input
          name="content"
            type="text"
            placeholder="Content"
            ref={contentRef}
            className="taskInput text-white"
          /></label>
          <label htmlFor="author">Author
          <input
          name="author"
            type="text"
            placeholder="Author"
            ref={authorRef}
            className="taskInput text-white"
          /></label>
          <button type="submit">Add task</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
