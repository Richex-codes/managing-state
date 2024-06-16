import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function Task({ task, description, listTask, deleteTask }) {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [color, setColor] = useState("red");
  const [touch, setTouch] = useState(false);
  const error = check(newTask, newDesc);
  const invalid = Object.keys(error).length === 0;

  function check(tk, desc) {
    let result = {};
    if (!tk || !desc) {
      result.taskError = "Provide a task";
      result.descriptionError = "Provide a description of the task";
    }

    return result;
  }

  const handelColor = () => {
    const newColor = color === "red" ? "green" : "red";
    setColor(newColor);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const editTask = () => {
    if (invalid === true) {
      setEdit(false);
      listTask(task, newTask, newDesc);
      setNewTask("");
      setNewDesc("");
      setTouch(false);
    } else {
      setTouch(true);
    }
  };

  const handleTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleDescription = (e) => {
    setNewDesc(e.target.value);
  };

  const handleDelete = () => {
    deleteTask(task);
  };

  const validate = (task, description) => {
    if (!description && !task) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "8px" }}>{error.taskError}</span>
          <span>{error.descriptionError}</span>
        </div>
      );
    }
    if (!task) {
      return error.taskError;
    }
    if (!description) {
      return error.descriptionError;
    } else {
      return "";
    }
  };

  // console.log(error)

  const styles = {
    border: "1px solid #ccc",
    background: "transparent",
    fontSize: "inherit",
    fontFamily: "inherit",
    color: "inherit",
    padding: "2px 4px",
    margin: 0,
    outline: "none",
    borderRadius: "4px",
    width: "auto",
    boxShadow: "none",
    textAlign: "center",
  };

  return (
    <Card className="text-center" style={{ marginBottom: "30px" }}>
      <Card.Header>LIST</Card.Header>
      <div style={{ color: "red" }}>
        <span>
          {invalid === false && touch === true
            ? validate(newTask, newDesc)
            : ""}
        </span>
      </div>
      <Card.Body>
        <Card.Title
          style={{ color: color, cursor: "pointer" }}
          onClick={handelColor}
        >
          Completed?
        </Card.Title>
        <Card.Text>
          {edit ? (
            <input
              style={styles}
              onChange={handleTask}
              onBlur={editTask}
              type="text"
            />
          ) : (
            <span>{task}</span>
          )}
        </Card.Text>
        <Card.Text>
          {edit ? (
            <input
              style={styles}
              onBlur={editTask}
              onChange={handleDescription}
              type="text"
            />
          ) : (
            <span>{description}</span>
          )}
        </Card.Text>
        <Button variant="primary" onClick={handleEdit}>
          Edit task
        </Button>
        <Button
          style={{ marginLeft: "30px" }}
          variant="primary"
          onClick={handleDelete}
        >
          Delete task
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Task;
