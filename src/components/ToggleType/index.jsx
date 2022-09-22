import React from "react";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export const ToggleType = ({ handleToggleType }) => {
  const [type, setType] = useState("");

  return (
    <ToggleButtonGroup
      size="small"
      sx={{
        height: "40px",
        "& .MuiToggleButton-root": {
          textTransform: 'none',
          borderColor: "#2D3748",
          color: "#2D3748",
          "&.Mui-selected": {
            color: '#FFFFFF',
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(136.64deg, #658DD1 0%, #2D3748 100%)",
          }
        },
      }}
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
    </ToggleButtonGroup>
  );
};
