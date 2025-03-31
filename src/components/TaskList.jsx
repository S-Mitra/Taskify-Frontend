import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import TaskFilter from "./TaskFilter";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });

  // Function to fetch tasks with query params
  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks", {
        params: {
          status: filters.status || undefined, // Include only if not empty
          priority: filters.priority || undefined,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks when component mounts or filters change
  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <div>
      <TaskFilter setFilters={setFilters} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status} - {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
