const TaskFilter = ({ setFilter }) => {
    return (
        <div>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    );
};

export default TaskFilter;
