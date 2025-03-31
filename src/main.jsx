import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import your custom theme

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Normalizes styles */}
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
