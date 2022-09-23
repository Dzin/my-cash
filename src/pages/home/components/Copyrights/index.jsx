import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
export default function Copyrights() {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        // position: "absolute",
        // bottom: 0,
        textAlign: "center",
        width: "100%",
        // color: "#A0AEC0",
        // zIndex: 3,
      }}
      variant="caption"
    >
      {`MyCash @ ${new Date().getFullYear()} - Todos os direitos reservados - Feito com ❤️ para `}
      <Typography
        variant="caption"
        sx={{
          color: `${
            theme.palette.mode == "light"
              ? theme.palette.text.primary
              : theme.palette.gamaAcademy
          }`,
        }}
        fontWeight="bold"
      >
        DevForTech - Gama Academy
      </Typography>
    </Typography>
  );
}
