import { useState } from "react";
import SwitchRoutes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SwitchRoutes />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}
