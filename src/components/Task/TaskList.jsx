import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axiosInstance from "../../../axiosInstance";
import TaskFilter from "./TaskFilter";
import { Grid, Card, CardContent, Typography, IconButton, Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';

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
        <div style={{margin: "20px"}}>
            <TaskFilter setFilters={setFilters} />
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography variant="body2">{task.status} - {task.priority}</Typography>
                                <Grid item xs={12} sm={2} sx={{
                                    justifyContent: 'flex-end',
                                    flexDirection: 'row',
                                    display: 'flex',
                                    width: '100%'
                                }}>
                                    <IconButton variant="contained" color="primary" onClick={() => navigate(`/tasks/${task.id}`)}>
                                        <ModeOutlinedIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton variant="contained" color="primary" onClick={() => handleDelete(task.id)}>
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" onClick={() => navigate(`/tasks/new`)}>
                Create Task
            </Button>
        </div>
    );
};

export default TaskList;
