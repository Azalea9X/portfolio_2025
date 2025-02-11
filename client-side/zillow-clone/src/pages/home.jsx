import React, {render, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteToDo, UpdateToDo } from "../actions/index.js";
import axios from "axios"; 
import EditView from "./../components/Edit.jsx"; // Import the EditView component
import Task from "./../components/Task";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false); // State to manage editing mode
  const [currentTask, setCurrentTask] = useState(null); // State to manage the current task being edited
  const [showTask, setShowTask] = useState(false); // State to manage the visibility of the Task component

  const dispatch = useDispatch();

  function addTask(title, content, author) {
    const newTask = { id: tasks.length + 1, title, content, author };
    setTasks([...tasks, newTask]);
    dispatch(addTodo(title, content, author));
  }

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

  const  CreateForm = ()=>  {
    return (
      <div id="form" style={{ display: showTask ? "block" : "none" }}>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Enter title" />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea className="form-control" id="content" rows="3" placeholder="Enter content" />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input type="text" className="form-control" id="author" placeholder="Enter author" />
          </div>
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            const author = document.getElementById("author").value;
            addTask(title, content, author);
            document.getElementById("form").reset();
            setShowTask(false);
          }}>Submit</button>
        </form>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="my-4">Task List</h2>
      <section id="table" className="text-left table relative sm:min-w-[450px] left-[-1rem] md:left-[2rem] 
      xl: max-w-[600px] left-[-15rem]
      3xl:left-[0rem]">
        <div className="row mb-3">
          <div className="col-12">
            <button className="btn btn-primary toggle" onClick={() =>{
          {document.querySelector("#table").style.display="none"; 
            render(
              <CreateForm />
            )
          }

            }}>Add Task</button>
          </div>
        </div>
        
        <div className="container">
          {tasks.map((task) => (
            <div className="row mb-3" key={task.id}>
              <div className="col-12">
                <div className="media p-3 border rounded-circle bg-light">
                  <div className="media-body text-center">
                    <h5 className="mt-0">Title: {task.title}</h5>
                    <h6 className="text-muted text-center"><small>Post Author: {task.author}</small></h6>
                    <p>Content: {task.content}</p>
                    <CreateForm />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;