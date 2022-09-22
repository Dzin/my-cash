import React from "react";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ToggleButtonGroupStyled } from "./style";
export const ToggleType = ({ handleToggleType }) => {
  const [type, setType] = useState("");

  return (
    <ToggleButtonGroupStyled
      size="small"
      // sx={{
      //   height: "40px",
      //   borderRadius: "1rem",
      //   "& .MuiToggleButton-root": {
      //     textTransform: "none",
      //     "&.Mui-selected": {
      //       color: "#FFFFFF",
      //       backgroundColor: "transparent",
      //       backgroundImage:
      //         "linear-gradient(136.64deg, #658DD1 0%, #2D3748 100%)",
      //     },
      //   },
      // }}
      fullWidth
      color="primary"
      value={type}
      exclusive
      onChange={(e, newValue) => {
        setType(newValue);
        handleToggleType(newValue);
      }}
      aria-label="Platform"
    >
      <ToggleButton value="receita">Entrada</ToggleButton>
      <ToggleButton value="despesa">Saída</ToggleButton>
    </ToggleButtonGroupStyled>
  );
};
