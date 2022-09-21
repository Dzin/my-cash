import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { Container, Grid } from "@mui/material";

import TransactionsListCard from "../../components/TransactionsListCard";
import CategoriesListCard from "../../components/CategoriesListCard";
import CardTop from "./components/CardTop";
import CardBotton from "./components/CardBotton";
import Copyrights from "./components/Copyrights";

import {
  BackgroundHeaderImage,
  BackgroundHeaderFilter,
  GridFullContent,
} from "./style";

import Logo from "../../assets/imgs/logo.png";

import api from "../../services/api";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingTransactions(true);
    setLoadingCategories(true);

    Promise.all([api.get("/transacao"), api.get("/categoria")])
      .then((results) => {
        setTransactions(results[0].data);
        setLoadingTransactions(false);
        setCategories(results[1].data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        toast.error("Não foi possível carregar os dados das listas");
        setLoadingTransactions(false);
        setLoadingCategories(false);
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
              transactions={transactions}
              loading={loadingTransactions}
              sm={6}
              xs={12}
              md={4}
            />

            <CardTop
              type="Despesas"
              transactions={transactions}
              loading={loadingTransactions}
              sm={6}
              xs={12}
              md={4}
            />

            <CardTop
              type="Balanço"
              transactions={transactions}
              loading={loadingTransactions}
              sm={12}
              xs={12}
              md={4}
            />
          </Grid>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container spacing={2} justifyContent="center">
            <CardBotton xs={12} md={6}>
              <TransactionsListCard
                transactions={transactions}
                setTransactions={setTransactions}
                loading={loadingTransactions}
                setLoading={setLoadingTransactions}
              />
            </CardBotton>
            <CardBotton xs={12} md={6}>
              <CategoriesListCard
                categories={categories}
                setCategories={setCategories}
                loading={loadingCategories}
                setLoading={setLoadingCategories}
              />
            </CardBotton>
          </Grid>
        </Grid>
        <Copyrights />
      </GridFullContent>
    </Container>
  );
}
