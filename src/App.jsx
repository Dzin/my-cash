import { useState } from "react";
import SwitchRoutes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SwitchRoutes />
      </ThemeProvider>
    </>
  );
}
