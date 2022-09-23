import { createTheme, useTheme } from "@mui/material/styles";

const theme = (mode = undefined) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            text: { primary: "#2D3748", secondary: "#A0AEC0" },
            receita: "#5CAB7D",
            despesa: "#ff6a6a",
            gradientType1: "#658DD1",
            gradientType2: "#2D3748",
            iconCardTop: "#5879B1",
            colorButton: "#fff",
            toggle: "rgba(0, 0, 0, 0.87)",
            gamaAcademy: "rgb(0, 240, 80)",
          }
        : {
            text: { primary: "#fff", secondary: "#fff" },
            receita: "#5CAB7D",
            despesa: "#ff6a6a",
            gradientType1: "#658DD1",
            gradientType2: "#2D3748",
            iconCardTop: "#5879B1",
            colorButton: "rgba(0, 0, 0, 0.87)",
            toggle: "#fff",
            gamaAcademy: "rgb(0, 240, 80)",
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "1rem",
            color: "#fff",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
  });

export default theme;
