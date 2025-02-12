import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteToDo, UpdateToDo } from "../actions/index.js";
import axios from "axios"; 
import EditView from "./Edit.jsx"; // Import the EditView component
import "../output.css";
import Task from "./Task.jsx";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false); // State to manage editing mode
  const [currentTask, setCurrentTask] = useState(null); // State to manage the current task being edited
  const [showTask, setShowTask] = useState(false); // State to manage the visibility of the Task component

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post("http://localhost:5000/graphql", {
          query: `
            query {
              getAllPosts {
                id
                title
                content
                author
              }
            }
          `,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTasks(response.data.data.getAllPosts);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const dispatch = useDispatch();

  function updateTask(id, updatedTitle, updatedContent, updatedAuthor) {
    dispatch(UpdateToDo(id, { title: updatedTitle, content: updatedContent, author: updatedAuthor }));
  }

  function deleteTask(id) {
    dispatch(deleteToDo(id));
  }

  function toggleEdit(task) {
    setEditing(!editing);
    setCurrentTask(task);
  }

  function toggleShowTask() {
    setShowTask(!showTask);
  }

  function AddToDo() {
    setShowTask(true);
  }

  return (
    <div className="container">
      <h2 className="my-4">Task List</h2>
      <table id="table" className="text-left table relative sm:min-w-[450px] left-[-1rem] md:left-[2rem] 
      xl: max-w-[600px] left-[-15rem]
      3xl:left-[0rem]">
        <thead>
          <tr className="text-red-600 2xl:text-red-600 d-flex space-between">
            <th>Task Title</th>
            <th>Task Content</th>
            <th>Task Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.content}</td>
              <td>{task.author}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => deleteTask(task.id)}>Delete</button>
                <button className="btn btn-primary" onClick={() => {
                  toggleEdit(task);
                  document.querySelector("#table").style.display = "none";  
                }}>Edit</button>
                <button className="btn btn-success" onClick={() => {
                  document.querySelector("#table").style.display="none"; 
                  toggleShowTask();
                }}>
                  Add to do
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && currentTask && (
        <EditView task={currentTask} setEditing={setEditing} updateTask={updateTask} />
      )}

      {showTask && (
        <Task />
      )}
    </div>
  );
};

export default TaskList;
