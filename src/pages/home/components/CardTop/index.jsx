import React from "react";
//MUI
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
//ICONS
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
//COMPONENTS
import Loading from "../../../../components/Loading";

export default function CardTop(props) {
  let data;

  const receita = props.transactions
    .filter(
      (transaction) => transaction.categoria.tipo.toLowerCase() === "receita"
    )
    .reduce((acc, obj) => acc + Number(obj.valor), 0);

  const despesa = props.transactions
    .filter(
      (transaction) => transaction.categoria.tipo.toLowerCase() === "despesa"
    )
    .reduce((acc, obj) => acc + Number(obj.valor), 0);

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
          md: `${
            props.type === "Receitas"
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
        sx={{
          height: "100%",
          borderRadius: "1.2rem",
          width: { md: "14rem" },
        }}
      >
        {props.loading ? (
          <Loading />
        ) : (
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
                color={`${
                  props.type === "Balanço"
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
              >{`R$ ${data.toFixed(2)}`}</Typography>
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
        )}
      </Paper>
    </Grid>
  );
}
