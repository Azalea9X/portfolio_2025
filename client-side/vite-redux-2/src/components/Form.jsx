import { useState } from "react";

function Form({ tasks, setTasks }) {
  const [name, setName] = useState("Learn React");

  function handleChange(e) {
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTask(name);
  }

  function addTask(name) {
    const newTask = { id: Date.now().toString(), name, completed: false };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      alert(updatedTasks.map((task) => task.name).join(", "));
      return updatedTasks;
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
