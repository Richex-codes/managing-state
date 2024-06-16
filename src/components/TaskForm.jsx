import { useState } from "react";

const AddTask = ({
  handleTask,
  handleDescription,
  handleSubmit,
  task,
  description,
}) => {
  const [touch , setTouch] = useState(false)
  const error = check(task, description);
  const invalid = Object.keys(error).length === 0;

  function check(tk, desc) {
    let result = {};
    if (!tk || !desc) {
      result.taskError = "Provide a task";
      result.descriptionError = "Provide a description of the task";
    }

    return result;
  }

  const validate = (task, description) => {
    if(!description && !task){
      return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ marginBottom: '8px' }}>{error.taskError}</span> 
        <span>{error.descriptionError}</span>
      </div>
      
        )
    }
    if(!task){
      return error.taskError
    }
    if(!description){
      return error.descriptionError
    }
    else{
      return ''
    }
  }

  const handleblur = () => {
    if(invalid === true){
      setTouch(false)
    }
    else{
      setTouch(true)
    }
  }

 const handleSubmit2 = () => {
    
 }


  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
        <div style={{color:'red'}}><span>{invalid === false && touch === true? validate(task, description) : ''}</span>
      </div>
      <form style={formStyle} action="/">
        <input
          style={inputStyle}
          onChange={handleTask}
          onBlur={handleblur}
          value={task}
          type="text"
          name="task"
          placeholder="Task:"
        />
        <input
          style={inputStyle}
          onChange={handleDescription}
          onBlur={handleblur}
          value={description}
          type="text"
          name="description"
          placeholder="Desc:"
        />
        <button style={buttonStyle} onClick={touch === false ? handleSubmit : handleSubmit2}>
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTask;

//
//
