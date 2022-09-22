import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },
});

export default theme;
