import { useState } from "react";

const TaskFilter = ({ setFilters }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const handleFilterChange = () => {
    setFilters({
      status: selectedStatus,
      priority: selectedPriority,
    });
  };

  return (
    <div>
      <label>Status:</label>
      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <label>Priority:</label>
      <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
        <option value="">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default TaskFilter;
