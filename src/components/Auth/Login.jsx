import { useState, useContext } from "react";
import axiosInstance from "../../../axiosInstance";
import AuthContext from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/login", { email, password });
      login(data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;