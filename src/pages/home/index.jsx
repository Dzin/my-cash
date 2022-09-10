import React from "react";
//MUI
import { Container, Typography, Grid, Paper } from "@mui/material";
//IMGS
import Logo from "../../assets/imgs/logo.png";
//STYLES
import {
  BackgroundHeaderImage,
  BackgroundHeaderFilter,
  GridFullContent,
} from "./style";

function CardTop(props) {
  return (
    <Grid
      item
      sx={{
        height: "5rem",
        borderRadius: "1rem",
        margin: { xs: "0 0.5rem" },
      }}
      sm={3}
      xs={12}
      {...props}
    >
      <Paper sx={{ height: "100%" }}>{props.children}</Paper>
    </Grid>
  );
}
function CardBotton(props) {
  return (
    <Grid
      item
      sx={{ height: "21rem", margin: { xs: "0 0.5rem" } }}
      xs={12}
      sm={4}
      {...props}
    >
      <Paper sx={{ height: "100%" }}>{props.children}</Paper>
    </Grid>
  );
}
function Copyrights() {
  return (
    <Typography
      sx={{
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        width: "100%",
        color: "#A0AEC0",
      }}
      variant="caption"
    >
      {`MyCash @ ${new Date().getFullYear()} - Todos os direitos reservados - Feito com ❤️ por `}
      <Typography variant="caption" sx={{ color: "#344767" }} fontWeight="bold">
        Gama Academy
      </Typography>
    </Typography>
  );
}

export default function Home() {
  return (
    <Container sx={{ height: "100vh", posititon: "relative" }}>
      <BackgroundHeaderFilter />
      <BackgroundHeaderImage />

      <GridFullContent container>
        <Grid item>
          <img src={Logo} />
        </Grid>
        <Grid item width="100%">
          <Grid
            container
            justifyContent="center"
            alignItems={"center"}
            sx={{ gap: "1rem" }}
          >
            <CardTop>Componente Receitas </CardTop>
            <CardTop>Componente Despesas </CardTop>
            <CardTop>Componente Balanço </CardTop>
          </Grid>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container sx={{ gap: "1.3rem" }} justifyContent="center">
            <CardBotton>Componente Transações</CardBotton>
            <CardBotton>Componente Categorias</CardBotton>
          </Grid>
        </Grid>
      </GridFullContent>
      <Copyrights />
    </Container>
  );
}
