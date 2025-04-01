import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import your custom theme
import { AuthProvider } from "./AuthContext"; // Ensure correct path

createRoot(document.getElementById('root')).render(
  <AuthProvider>
<ThemeProvider theme={theme}>
    <CssBaseline /> {/* Normalizes styles */}
    <App />
  </ThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);
