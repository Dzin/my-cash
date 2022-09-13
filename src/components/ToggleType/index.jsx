import React from "react";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export const ToggleType = ({ handleToggleType }) => {
  const [type, setType] = useState("");

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={(e, newValue) => {
        setType(newValue);
      }}
      aria-label="Platform"
    >
      <ToggleButton value="receita" onClick={handleToggleType}>
        Entrada
      </ToggleButton>
      <ToggleButton value="despesa" onClick={handleToggleType}>
        Saída
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
