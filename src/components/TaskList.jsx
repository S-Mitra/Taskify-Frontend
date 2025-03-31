import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axiosInstance.get("/tasks")
            .then(response => {
                console.log(response)
                setTasks(response.data.tasks)
        })
            .catch(error => console.error("Error fetching tasks", error));
    }, []);

    const handleDelete = async (id) => {
        await axiosInstance.delete(`tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h2>Task List</h2>
            <Link to="/tasks/new"><button>Create Task</button></Link>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <strong>{task.title}</strong> - {task.status} - {task.priority}
                        <Link to={`/tasks/${task._id}`}><button>Edit</button></Link>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
