import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import axiosInstance from "../../../axiosInstance";

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/tasks/${id}`)
            .then(response => {
                const taskDetails = response.data.task;
                setTask({
                    ...taskDetails, 
                    id: taskDetails["_id"], 
                    dueDate: taskDetails?.dueDate ? new Date(taskDetails.dueDate).toISOString().split("T")[0] : null
                })
            })
            .catch(error => console.error("Error fetching task", error));
    }, [id]);

    return task ? <TaskForm task={task} isEditing={true} /> : <p>Loading...</p>;
};

export default TaskDetails;
