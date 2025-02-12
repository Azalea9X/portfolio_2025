import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateToDo } from "../actions/index.js";

const EditView = ({ task, setEditing }) => {
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(UpdateToDo(task.id, { title, content, author: task.author }));
      setEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form id="form-2" onSubmit={handleSave}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <button type="submit" onClick={async() => {
            document.querySelector("f#orm-2").style.display = "none"; 
            document.querySelector("table").style.display="table";
        }}>Save</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditView;
