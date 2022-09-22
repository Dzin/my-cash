import React from "react";
import { useState } from "react";

import { toast } from "react-toastify";

import dayjs from "dayjs";

import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import TransactionModal from "../TransactionModal";
import Loading from "../Loading";
import { DateInput } from "../DateInput";
import { ToggleType } from "../ToggleType";

import api from "../../services/api";

import { adicionarItem, pegarItem } from "../../utils/localStorage";

export default function TransactionsListCard({
  transactions,
  setTransactions,
  loading,
  setLoading,
}) {
  const [date, setDate] = useState(null);
  const [type, setType] = useState("");
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [typeTransactions, setTypeTransactions] = useState("");

  const filterTransactionsByDate = (transaction) => {
    const currentTransactionDate = dayjs(transaction.data);

    return (
      currentTransactionDate.month() === date.month() &&
      currentTransactionDate.year() === date.year()
    );
  };

  const filterTransactionsByType = (transaction) => {
    return transaction.categoria.tipo === type;
  };

  const listFilteredTransactions = () => {
    let filteredList = [...transactions];

    if (date) filteredList = filteredList.filter(filterTransactionsByDate);
    if (type) filteredList = filteredList.filter(filterTransactionsByType);

    return filteredList;
  };

  const handleSelectDate = function (selectedDate) {
    setDate(selectedDate);
  };

  const handleToggleType = function (selectedValue) {
    setType(selectedValue || "");
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "Nenhuma data definida";
  };

  const formatValue = (type, value) => {
    const mapType = {
      despesa: `- R$ ${value.toFixed(2)}`,
      receita: `+ R$ ${value.toFixed(2)}`,
    };

    return type && value >= 0 ? mapType[type] : "Valor inválido";
  };

  const handleEditTransaction = (transaction) => {
    setOpenTransactionModal(true);
    setTypeTransactions("Editar");

    adicionarItem("transacaoId", transaction._id);
    adicionarItem("transacaoTipo", transaction.categoria.tipo);
    adicionarItem("transacaoValor", transaction.valor);
    adicionarItem("transacaoDescricao", transaction.descricao);
    adicionarItem("transacaoData", transaction.data);
  };

  const handleDeleteTransaction = (id) => {
    setLoading(true);

    api
      .delete(`/transacao/${id}`)
      .then(() => {
        toast.success("Transação deletada com sucesso");
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Não foi possível deletar a transação");
        setLoading(false);
      });
  };

  const handleAddNewTransaction = () => {
    setOpenTransactionModal(true);
    setTypeTransactions("Adicionar");
  };

  return (
    <>
      <Grid
        padding={{
          md: "1.2rem 1.5rem",
          xs: "1.5rem 1.2rem",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            alignItems: "center",
            justifyContent: {
              sm: "space-between",
              xs: "center",
            },
            gap: {
              sm: "1rem",
              xs: "0.5rem",
            },
          }}
        >
          <Typography
            component="h3"
            fontWeight="700"
            fontSize={{
              xs: "1.2rem",
            }}
            textAlign={{
              sm: "left",
              xs: "center",
            }}
            color="#2D3748"
          >
            Transações
          </Typography>
          <DateInput handleSelectDate={handleSelectDate} />
          <ToggleType handleToggleType={handleToggleType} />
        </Grid>

        <List
          sx={{
            width: "100%",
            height: "15rem",
            overflowY: "scroll",
            paddingTop: "0",
            paddingBottom: "0",
            marginTop: "1rem",
            marginBottom: "1rem",
            "&::-webkit-scrollbar": {
              width: 5,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#F8F9Fa",
              borderRadius: "1.2rem",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(136.64deg, #658DD1 0%, #2D3748 100%)",
              borderRadius: "1.2rem",
            },
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            listFilteredTransactions().map((transaction) => (
              <ListItem
                key={transaction._id}
                sx={{
                  paddingTop: "0.2rem",
                  paddingBottom: "0.2rem",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "0",
                    marginRight: "0.5rem",
                  }}
                >
                  {transaction.categoria.tipo === "despesa" ? (
                    <ArrowCircleDownOutlinedIcon
                      fontSize="medium"
                      sx={{
                        color: "#E53E3E",
                      }}
                    />
                  ) : (
                    <ArrowCircleUpOutlinedIcon
                      fontSize="medium"
                      sx={{
                        color: "#48BB78",
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        component="p"
                        fontWeight="400"
                        fontSize={{
                          md: "0.7rem",
                          xs: "1rem",
                        }}
                        color="#2D3748"
                      >
                        {transaction.categoria.nome
                          ? transaction.categoria.nome
                          : ""}
                      </Typography>
                      <Typography
                        component="p"
                        fontWeight="600"
                        fontSize={{
                          md: "0.9rem",
                          xs: "1.2rem",
                        }}
                        color="#2D3748"
                        gutterBottom
                      >
                        {transaction.descricao ? transaction.descricao : ""}
                      </Typography>
                    </>
                  }
                  secondary={formatDate(transaction.data)}
                  secondaryTypographyProps={{
                    fontSize: {
                      md: "0.8rem",
                      xs: "0.6rem",
                    },
                    color: "#2D3748",
                  }}
                />
                <ListItemText
                  sx={{
                    marginRight: "1.2rem",
                  }}
                  primary={formatValue(
                    transaction.categoria.tipo,
                    transaction.valor
                  )}
                  primaryTypographyProps={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                    },
                    fontWeight: "600",
                    color:
                      transaction.categoria.tipo === "despesa"
                        ? "#E53E3E"
                        : "#48BB78",
                    align: "right",
                  }}
                />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditTransaction(transaction)}
                >
                  <EditOutlinedIcon
                    fontSize="small"
                    sx={{
                      color: "#000000",
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteTransaction(transaction._id)}
                >
                  <DeleteForeverOutlinedIcon
                    fontSize="small"
                    sx={{
                      color: "#000000",
                    }}
                  />
                </IconButton>
              </ListItem>
            ))
          )}
        </List>

        <Button
          variant="contained"
          sx={{
            fontSize: {
              xs: "0.8rem",
            },
            fontWeight: "500",
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
            padding: "0.4rem 2rem",
            textTransform: "none",
          }}
          onClick={() => handleAddNewTransaction()}
        >
          Adicionar
        </Button>
      </Grid>

      <TransactionModal
        open={openTransactionModal}
        setOpen={setOpenTransactionModal}
        typeTransactions={typeTransactions}
      />
    </>
  );
}
