import { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={2}>Signup</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
