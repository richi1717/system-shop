import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#000000", paper: "#000000" },
    primary: { main: "#00bfff" },
    text: { primary: "#00bfff", secondary: "#7ad9ff" },
  },
  typography: {
    fontFamily: `'Inter var', system-ui, -apple-system, Segoe UI, Roboto, Arial`,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#00bfff33",
          color: "#00bfff",
        },
        head: {
          color: "#00d0ff",
          fontWeight: 700,
          borderBottom: "1px solid #00bfff66",
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundColor: "#000000" } },
    },
    MuiOutlinedInput: {
      styleOverrides: { notchedOutline: { borderColor: "#00bfff66" } },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
