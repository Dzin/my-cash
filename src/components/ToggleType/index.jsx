import React from "react";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export const ToggleType = ({ handleToggleType }) => {
  const [type, setType] = useState("");

  return (
    <ToggleButtonGroup
      size="small"
      sx={{ height: "40px" }}
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
