import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axiosInstance from "../../axiosInstance";
import TaskFilter from "./TaskFilter";

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
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status} - {task.priority}
            <button onClick={() => navigate(`/tasks/${task.id}`)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
