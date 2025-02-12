import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo } from '../actions'; // Ensure correct import path

const TaskList = () => {
  const tasks = useSelector(state => state.tasks); // Fetch tasks from Redux store
  const dispatch = useDispatch();

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="tasklist">
      <h3>Your tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.text}</h3>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
