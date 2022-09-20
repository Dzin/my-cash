import React, { useEffect, useState } from "react";
// MUI
import { Container, Grid } from "@mui/material";
// IMGS
import Logo from "../../assets/imgs/logo.png";
// STYLES
import {
  BackgroundHeaderImage,
  BackgroundHeaderFilter,
  GridFullContent,
} from "./style";
// SERVICES
import api from "../../services/api";
// HELPERS
import { toast } from "react-toastify";
//COMPONENTS
import { TransactionListingCard } from "../../components/TransactionListingCard";
import Categories from "../../components/Categories";
import CardTop from "./components/CardTop";
import CardBotton from "./components/CardBotton";
import Copyrights from "./components/Copyrights";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  /* useEffect(() => {
    setLoadingRegister(true);

    api
      .get("/transacao")
      .then((res) => {
        setTransactions(res.data);
        setLoadingRegister(false);
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Não foi possível carregar a lista de transações");
      });
  }, []); */

  /* useEffect(() => {
    setLoadingCategories(true);

    api
      .get("/categoria")
      .then((res) => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Não foi possível carregar a lista de categorias");
      });
  }, []); */

  /* useEffect(() => {
    if (!openRegister) {}
  }, [openRegister]); */

  useEffect(() => {
    setLoadingRegister(true);
    setLoadingCategories(true);

    Promise.all([api.get("/transacao"), api.get("/categoria")])
      .then((results) => {
        setTransactions(results[0].data);
        setLoadingRegister(false);
        setCategories(results[1].data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        toast.error("Não foi possível carregar os dados das listas");
        setLoadingRegister(false);
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
            {/* <CardTop
              type="Receitas"
              transactions={transactions}
              loading={loadingRegister}
              sm={6}
              xs={12}
              md={4}
            /> */}

            {/* <CardTop
              type="Despesas"
              transactions={transactions}
              loading={loadingRegister}
              sm={6}
              xs={12}
              md={4}
            /> */}

            {/* <CardTop
              type="Balanço"
              transactions={transactions}
              loading={loadingRegister}
              sm={12}
              xs={12}
              md={4}
            /> */}
          </Grid>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container spacing={2} justifyContent="center">
            <CardBotton xs={12} md={6}>
              <TransactionListingCard
                transactions={transactions}
                setTransactions={setTransactions}
                loading={loadingRegister}
                setLoading={setLoadingRegister}
              />
            </CardBotton>
            <CardBotton xs={12} md={6}>
              <Categories
                categories={categories}
                setCategories={setCategories}
                loading={loadingCategories}
              />
            </CardBotton>
          </Grid>
        </Grid>
      </GridFullContent>
      <Copyrights />
    </Container>
  );
}
