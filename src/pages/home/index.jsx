import React, { useEffect, useState } from "react";
// MUI
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
// IMGS
import Logo from "../../assets/imgs/logo.png";
// ICONS
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// STYLES
import {
  BackgroundHeaderImage,
  BackgroundHeaderFilter,
  GridFullContent,
  BackgroundColor,
} from "./style";
// SERVICES
import api from "../../services/api";
// COMPONENTS
import Categories from "../../components/Categories";

function CardTop(props) {
  let data;

  const receita = props.transations
    .filter((transation) => transation.tipo.toLowerCase() === "receita")
    .reduce((acc, obj) => acc + obj.valor, 0);

  const despesa = props.transations
    .filter((transation) => transation.tipo.toLowerCase() === "despesa")
    .reduce((acc, obj) => acc + obj.valor, 0);

  switch (props.type) {
    case "Receitas":
      data = receita;
      break;
    case "Despesas":
      data = despesa;
      break;
    case "Balanço":
      data = receita - despesa;
      break;
  }

  return (
    <Grid
      item
      sx={{
        height: "6rem",
        display: { md: "flex" },
        justifyContent: {
          md: `${props.type === "Receitas"
            ? "flex-end"
            : props.type === "Despesas"
              ? "center"
              : "flex-start"
            }`,
        },
      }}
      {...props}
    >
      <Paper
        sx={{ height: "100%", borderRadius: "1.2rem", width: { md: "14rem" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" color="#A0AEC0">
              {props.type}
            </Typography>
            <Typography
              color={`${props.type === "Balanço"
                ? data >= 1
                  ? "#5CAB7D"
                  : data < 0
                    ? "#ff6a6a"
                    : "#2D3748"
                : props.type === "Receitas"
                  ? "#5CAB7D"
                  : "#ff6a6a"
                }`}
              fontWeight="700"
            >{`R$ ${data}`}</Typography>
          </Box>
          <Box
            sx={{
              width: "45px",
              height: "45px",
              background:
                "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                fontWeight: "700",
                width: "1.2rem",
                height: "1.2rem",
                background: `${props.type !== "Balanço" ? "#fff" : "none"}`,
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.type === "Receitas" ? (
                <AddIcon fontSize="0.625rem" sx={{ color: "#5879B1" }} />
              ) : props.type === "Despesas" ? (
                <RemoveIcon fontSize="0.625rem" sx={{ color: "#5879B1" }} />
              ) : (
                <AccountBalanceWalletIcon sx={{ color: "#ffffff" }} />
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
function CardBotton(props) {
  return (
    <Grid item sx={{ height: "100%" }} {...props}>
      <Paper sx={{ height: "100%", borderRadius: "1.2rem" }}>
        {props.children}
      </Paper>
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
        zIndex: 4,
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
  const [transations, setTransations] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    api.get("/categoria").then(res => {
      setCategories(res.data);
      setLoadingCategories(false);
    });

    api.get("/transacao").then((res) => {
      setTransations(res.data);
    });
  }, []);


  return (
    <Container
      sx={{
        height: "100vh",
        posititon: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BackgroundHeaderFilter />
      <BackgroundHeaderImage />

      <GridFullContent container spacing={2}>
        <Grid item>
          <img src={Logo} />
        </Grid>
        <Grid item width="100%">
          <Grid
            container
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <CardTop
              type="Receitas"
              transations={transations}
              sm={6}
              xs={12}
              md={4}
            >
              Componente Receitas
            </CardTop>
            <CardTop
              type="Despesas"
              transations={transations}
              sm={6}
              xs={12}
              md={4}
            >
              Componente Despesas
            </CardTop>
            <CardTop
              type="Balanço"
              transations={transations}
              sm={12}
              xs={12}
              md={4}
            >
              Componente Balanço
            </CardTop>
          </Grid>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container spacing={2} justifyContent="center">
            <CardBotton xs={12} md={6}>
              Componente Transações
            </CardBotton>
            <CardBotton xs={12} md={6}>
              <Categories categories={categories} loading={loadingCategories} setCategories={setCategories} />
            </CardBotton>
          </Grid>
        </Grid>
      </GridFullContent>
      <Copyrights />
    </Container>
  );
}
