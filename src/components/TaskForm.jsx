import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

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
        <form onSubmit={handleSubmit} className="task-form">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
            <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">{isEditing ? "Update Task" : "Create Task"}</button>
        </form>
    );
};

export default TaskForm;
