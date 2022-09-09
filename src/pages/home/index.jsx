import React from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ height: "100vh" }}>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "4.4rem 0 0 0",
          gap: "2.5rem",
        }}
      >
        <Grid item>LOGO</Grid>
        <Grid item>
          <Grid container sx={{ gap: "1rem" }} justifyContent="center">
            <Grid
              item
              sx={{
                height: "5rem",
                width: "12rem",
                borderRadius: "1rem",
              }}
              md={12}
            >
              <Paper sx={{ height: "100%" }}>Componente Receitas </Paper>
            </Grid>
            <Grid
              item
              sx={{
                height: "5rem",
                width: "12rem",
                borderRadius: "1rem",
              }}
              md={12}
            >
              <Paper sx={{ height: "100%" }}>Componente Despesas </Paper>
            </Grid>
            <Grid
              item
              sx={{
                height: "5rem",
                width: "12rem",
                borderRadius: "1rem",
              }}
              md={12}
            >
              <Paper sx={{ height: "100%" }}>Componente Balanço </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container sx={{ gap: "1.3rem" }} justifyContent="center">
            <Grid item>
              <Paper sx={{ height: "100%" }}>Componente Transações </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ height: "100%" }}>Componente Categorias </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        sx={{
          position: "fixed",
          bottom: 0,
          textAlign: "center",
          width: "100%",
        }}
        variant="caption"
      >{`@ ${new Date().getFullYear()} MyCash - Todos os direitos reservados - Feito com ❤️ por Gama Academy`}</Typography>
    </Container>
  );
}
