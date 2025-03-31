import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axiosInstance from "../../axiosInstance";
import TaskFilter from "./TaskFilter";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({ status: "", priority: "" });
    const navigate = useNavigate();

    // Fetch tasks from backend with filters
    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get("/tasks", { params: filters });
            const formattedTasks = response.data.tasks.map(task => ({ ...task, id: task._id }));
            setTasks(formattedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filters]);

    // Function to delete a task
    const handleDelete = async (taskId) => {
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId)); // Update UI after delete
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <TaskFilter setFilters={setFilters} />
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography variant="h6">{task.status}</Typography>
                                <Typography variant="h6">{task.priority}</Typography>
                                <Typography variant="body2">Due: {task.dueDate}</Typography>
                                <Button variant="contained" color="primary" onClick={() => navigate(`/tasks/${task.id}`)}>Edit</Button>
                                <Button variant="contained" color="primary" onClick={() => handleDelete(task.id)}>Delete</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TaskList;
