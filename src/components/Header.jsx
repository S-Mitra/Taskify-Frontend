import { useContext } from "react";
import AuthContext from "../AuthContext";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        
        {user ? (
          <>
            <Typography sx={{ marginRight: 2 }}>Hello, {user.username}</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" href="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
