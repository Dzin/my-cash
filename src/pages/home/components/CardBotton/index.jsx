import React from "react";
//MUI
import { Grid, Paper } from "@mui/material";

export default function CardBotton(props) {
  return (
    <Grid item sx={{ height: "100%" }} {...props}>
      <Paper sx={{ height: "100%", borderRadius: "1.2rem" }}>
        {props.children}
      </Paper>
    </Grid>
  );
}
