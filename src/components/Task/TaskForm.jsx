import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import axiosInstance from "../../../axiosInstance";

const TaskForm = ({ task = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        priority: task.priority || "Low",
        status: task.status || "Pending",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axiosInstance.put(`tasks/${task._id}`, formData);
            } else {
                await axiosInstance.post("tasks", formData);
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving task", error);
        }
    };

    return (
        <Container sx={{marginTop: "20px"}} maxWidth="sm">
            <Button type="submit" variant="contained" color="primary" onClick={() => navigate(`/`)}>
                Back
            </Button>
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h5">{isEditing ? "Update Task" : "Create Task"}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        label="Task Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        multiline
                        label="Task Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        type="date"
                        label="Due Date"
                        name="dueDate"
                        InputLabelProps={{ shrink: true }}
                        value={formData.dueDate}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    />
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            value={formData.priority}
                            label="Priority"
                            name="priority"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Low"}>Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            value={formData.status}
                            label="Status"
                            name="status"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Completed"}>Completed</MenuItem>

                        </Select>
                    </FormControl>
                    <Grid item xs={12} sm={2} sx={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        display: 'flex',
                        width: '100%'
                    }}>
                        <Button type="submit" variant="contained" color="primary">
                            {isEditing ? "Update Task" : "Create Task"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default TaskForm;
