import Taskform from "./components/TaskForm";
import "./App.css";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  });

  // Save tasks to localStorage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(list));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [list]);

  const listTask = (oldTask, newTask, newDescription) => {
    setList((curr) => {
      const newList = curr.map((tk) => {
        if (tk.task === oldTask) {
          // Return a new object with the updated task and description
          return { task: newTask, description: newDescription };
        }
        // Return the original object if it doesn't match the old task
        return tk;
      });
      return newList;
    });
  };

  const deleteTask = (task) => {
    let confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setList((curr) => {
        const newList = curr.filter((tk) => tk.task !== task);
        return newList;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setList([...list, { task: task, description: description }]);
    setDescription("");
    setTask("");
  };

  const handleTask = (e) => {
    setTask(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="App">
      <Taskform
        handleSubmit={handleSubmit}
        handleDescription={handleDescription}
        handleTask={handleTask}
        task={task}
        description={description}
      />
      <TaskList
        list={list}
        handleTask={handleTask}
        handleDescription={handleDescription}
        listTask={listTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
