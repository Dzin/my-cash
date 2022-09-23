import React from "react";
import { Box, IconButton, FormGroup, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { MaterialUISwitch } from "./style";

export default function ToggleMode({ setColorMode }) {
  const theme = useTheme();
  return (
    <Box sx={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={theme.palette.mode === "dark" ? false : true}
            />
          }
          onChange={() => {
            setColorMode((prevState) => {
              if (prevState === "light") {
                localStorage.setItem("colorMode", "dark");
                return "dark";
              } else {
                localStorage.setItem("colorMode", "light");

                return "light";
              }
            });
          }}
        />
      </FormGroup>
    </Box>
  );
}
