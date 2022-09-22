import React from "react";

import { Typography } from "@mui/material";

export const NoResultText = () => {
  return (
    <Typography
      align="center"
      marginTop="1rem"
      component="p"
      fontWeight="400"
      fontSize={{
        xs: "1rem",
        sm: "1rem",
        md: "1rem",
      }}
      color="#2D3748"
    >
      Nenhum resultado encontrado
    </Typography>
  );
};
