import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { Container, Grid } from "@mui/material";

import TransactionsListCard from "../../components/TransactionsListCard";
import CategoriesListCard from "../../components/CategoriesListCard";
import CardTop from "./components/CardTop";
import CardBotton from "./components/CardBotton";
import Copyrights from "./components/Copyrights";
import CloseIcon from "@mui/icons-material/Close";

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
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);

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
        toast.error("Não foi possível carregar os dados das listas", {
          icon: () => <CloseIcon color="primary" />,
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        })
        setLoadingTransactions(false);
        setLoadingCategories(false);
      });
  }, []);

  useEffect(() => {
    if (!openTransactionModal) {
      setLoadingTransactions(true);
      api
        .get("/transacao")
        .then((res) => {
          setTransactions(res.data);
          setLoadingTransactions(false);
        })
        .catch((error) => {
          toast.error("Não foi possível carregar os dados das listas", {
            icon: () => <CloseIcon color="primary" />,
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          })
          setLoadingTransactions(false);
        });
    }
  }, [openTransactionModal]);

  useEffect(() => {
    if (!abrirModal) {
      setLoadingCategories(true);
      api
        .get("/categoria")
        .then((res) => {
          setCategories(res.data);
          setLoadingCategories(false);
        })
        .catch((error) => {
          toast.error("Não foi possível carregar os dados das listas", {
            icon: () => <CloseIcon color="primary" />,
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          })
          setLoadingCategories(false);
        });
    }
  }, [abrirModal]);

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

      <GridFullContent sx={{ margin: "2rem 1rem 0 0" }} container spacing={2}>
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
            <CardBotton xs={12} md={8}>
              <TransactionsListCard
                transactions={transactions}
                setTransactions={setTransactions}
                loading={loadingTransactions}
                setLoading={setLoadingTransactions}
                openTransactionModal={openTransactionModal}
                setOpenTransactionModal={setOpenTransactionModal}
              />
            </CardBotton>
            <CardBotton xs={12} md={4}>
              <CategoriesListCard
                categories={categories}
                setCategories={setCategories}
                loading={loadingCategories}
                setLoading={setLoadingCategories}
                abrirModal={abrirModal}
                setAbrirModal={setAbrirModal}
              />
            </CardBotton>
          </Grid>
        </Grid>
        <Copyrights />
      </GridFullContent>
    </Container>
  );
}
