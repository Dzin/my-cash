import React from "react";
//MUI
import { Typography, Grid, Paper, Box, useTheme, alpha } from "@mui/material";
//ICONS
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
//COMPONENTS
import Loading from "../../../../components/Loading";
//HELPER
import { moneyMask } from "../../../../utils/formatter";

export default function CardTop(props) {
  let data;
  const theme = useTheme();
  const receita = props?.transactions
    ?.filter(
      (transaction) => transaction?.categoria?.tipo?.toLowerCase() === "receita"
    )
    .reduce((acc, obj) => Number(acc) + Number(obj.valor), 0);

  const despesa = props?.transactions
    ?.filter(
      (transaction) => transaction?.categoria?.tipo?.toLowerCase() === "despesa"
    )
    .reduce((acc, obj) => Number(acc) + Number(obj.valor), 0);

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

  // Sugestão ao switch
  // const dataMap = {
  //   Receitas: receita,
  //   Despesas: despesa,
  //   Balanço: receita - despesa,
  // };
  // data = dataMap[props.type];

  let teste = 856859856.54;
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
              <Typography
                variant="subtitle2"
                color={theme.palette.text.secondary}
              >
                {props.type}
              </Typography>
              <Typography
                color={`${
                  props.type === "Balanço"
                    ? data >= 1
                      ? theme.palette.receita
                      : data < 0
                      ? theme.palette.despesa
                      : theme.palette.text.primary
                    : props.type === "Receitas"
                    ? theme.palette.receita
                    : theme.palette.despesa
                }`}
                fontWeight="700"
              >{`R$ ${data < 0 ? "-" : ""}${moneyMask(
                String(data?.toFixed(2))
              )}`}</Typography>
            </Box>
            <Box
              sx={{
                width: "45px",
                height: "45px",
                background: `linear-gradient(136.64deg,${theme.palette.gradientType1} 1.59%,${theme.palette.gradientType2} 98.89%)`,
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
                  background: `${
                    props.type !== "Balanço"
                      ? theme.palette.mode === "light"
                        ? theme.palette.background.default
                        : alpha(theme.palette.background.default, 0.8)
                      : "none"
                  }`,
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.type === "Receitas" ? (
                  <AddIcon
                    fontSize="0.625rem"
                    sx={{ color: theme.palette.iconCardTop }}
                  />
                ) : props.type === "Despesas" ? (
                  <RemoveIcon
                    fontSize="0.625rem"
                    sx={{ color: theme.palette.iconCardTop }}
                  />
                ) : (
                  <AccountBalanceWalletIcon
                    sx={{
                      color:
                        theme.palette.mode === "light"
                          ? theme.palette.background.default
                          : alpha(theme.palette.background.default, 0.8),
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Grid>
  );
}
