import React from "react";
//MUI
import { Typography } from "@mui/material";

export default function Copyrights() {
  return (
    <Typography
      sx={{
        // position: "absolute",
        // bottom: 0,
        textAlign: "center",
        width: "100%",
        color: "#A0AEC0",
        // zIndex: 3,
      }}
      variant="caption"
    >
      {`MyCash @ ${new Date().getFullYear()} - Todos os direitos reservados - Feito com ❤️ para `}
      <Typography variant="caption" sx={{ color: "#344767" }} fontWeight="bold">
        DevForTech - Gama Academy
      </Typography>
    </Typography>
  );
}
