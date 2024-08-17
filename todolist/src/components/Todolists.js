import React, { useState, useEffect } from "react";
import '../App.css'
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
// Update local storage whenever tasks change
useEffect(() => {
  if (tasks.length > 0) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
},[tasks]);
  // Retrieve tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, newTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="todoInput">
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a task"
        
      />
      
      <button className="button" onClick={addTask} ><span>Add</span></button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li className="li" key={index}>
            {task}
           <div className="outputButtons">
           <button onClick={() => deleteTask(index)} className="outputButton"><span>Delete</span></button>
            <button
              onClick={() => editTask(index, prompt("Enter new task", task))} className="outputButton"><span>Edit</span>
            </button>
           </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
