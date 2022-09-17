import React, { useEffect, useState, useRef } from "react";
// MUI
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
// IMGS
import Logo from "../../assets/imgs/logo.png";
// ICONS

// STYLES
import {
  BackgroundHeaderImage,
  BackgroundHeaderFilter,
  GridFullContent,
} from "./style";
// SERVICES
import api from "../../services/api";
//COMPONENTS
import TransactionRegistration from "../../components/modal/TransactionRegistration";
import Categories from "../../components/Categories";
import CardTop from "./components/CardTop";
import CardBotton from "./components/CardBotton";
import Copyrights from "./components/Copyrights";

export default function Home() {
  const [transations, setTransations] = useState([]);
  const [openRegister, setOpenRegister] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  useEffect(() => {
    setLoadingCategories(true);
    api.get("/categoria").then((res) => {
      setCategories(res.data);
      setLoadingCategories(false);
    });
  }, []);

  useEffect(() => {
    if (!openRegister) {
      setLoadingRegister(true);

      api.get("/transacao").then((res) => {
        setTransations(res.data);
        setLoadingRegister(false);
      });
    }
  }, [openRegister]);

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
              loading={loadingRegister}
              sm={6}
              xs={12}
              md={4}
            />

            <CardTop
              type="Despesas"
              transations={transations}
              loading={loadingRegister}
              sm={6}
              xs={12}
              md={4}
            />

            <CardTop
              type="Balanço"
              transations={transations}
              loading={loadingRegister}
              sm={12}
              xs={12}
              md={4}
            />
          </Grid>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container spacing={2} justifyContent="center">
            <CardBotton xs={12} md={6}>
              Componente Transações
            </CardBotton>
            <CardBotton xs={12} md={6}>
              <Categories
                categories={categories}
                loading={loadingCategories}
                setCategories={setCategories}
              />
            </CardBotton>
          </Grid>
        </Grid>
      </GridFullContent>
      <Copyrights />
      <TransactionRegistration open={openRegister} setOpen={setOpenRegister} />
    </Container>
  );
}
