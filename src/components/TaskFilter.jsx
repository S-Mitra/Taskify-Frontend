import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Button, Box, Grid } from "@mui/material";

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
    <Box sx={{ my: 2, p: 2, bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}>
      <Grid container spacing={2} alignItems="center">
        
        {/* Status Filter */}
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Priority Filter */}
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Apply Filters Button */}
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleFilterChange}>
            Apply
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
};

export default TaskFilter;
