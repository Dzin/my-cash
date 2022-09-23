import React from "react";
import SwitchRoutes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleMode from "./components/ToggleMode";

export default function App() {
  const [colorMode, setColorMode] = React.useState("light");

  return (
    <>
      <ThemeProvider theme={theme(colorMode)}>
        <CssBaseline />
        <ToggleMode setColorMode={setColorMode} />
        <SwitchRoutes />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}
