import Task from "./TaskItem";

const TaskList = ({ list, handleTask, handleDescription, listTask, deleteTask}) => {
    return(
        <div>
            {list.map((item, index) => (
                <Task key={index} task={item.task} description={item.description} handleTask={handleTask} handleDescription={handleDescription} listTask={listTask} deleteTask={deleteTask} />
            ))}
        </div>
    )
}

export default TaskList;