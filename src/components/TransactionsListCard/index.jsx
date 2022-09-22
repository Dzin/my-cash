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
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import TransactionModal from "../TransactionModal";
import Loading from "../Loading";
import { NoResultText } from "../NoResultText";
import { DateInput } from "../DateInput";
import { ToggleType } from "../ToggleType";
import SearchInput from "../SearchInput";

import api from "../../services/api";

export default function TransactionsListCard({
  transactions,
  setTransactions,
  loading,
  setLoading,
  openTransactionModal,
  setOpenTransactionModal,
}) {
  const [date, setDate] = useState(null);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [typeTransactions, setTypeTransactions] = useState("");
  const [selectTransaction, setSelectTransaction] = useState({
    id: "",
    type: undefined,
    date: new Date(),
    categorie: { _id: "", nome: "", tipo: "" },
    description: "",
    valueTransaction: "",
  });

  const filterTransactionsByDate = (transactionList) => {
    return transactionList.filter((transaction) => {
      const currentTransactionDate = dayjs(transaction.data);

      return (
        currentTransactionDate.month() === date.month() &&
        currentTransactionDate.year() === date.year()
      );
    });
  };

  const filterTransactionsByType = (transactionList) => {
    return transactionList.filter(
      (transaction) => transaction.categoria.tipo === type
    );
  };

  const orderTransactionsByDescDate = (transactionList) => {
    transactionList.sort((firstTransaction, secondTransaction) => {
      const aDate = dayjs(firstTransaction.data);
      const bDate = dayjs(secondTransaction.data);

      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;

      return 0;
    });
  };

  const filterTransactionsByName = (transactionList) => {
    return transactionList.filter((transaction) =>
      transaction.descricao.includes(search)
    );
  };

  const listFilteredTransactions = () => {
    let filteredList = [...transactions];

    if (date) filteredList = filterTransactionsByDate(filteredList);
    if (type) filteredList = filterTransactionsByType(filteredList);
    if (search) filteredList = filterTransactionsByName(filteredList);

    orderTransactionsByDescDate(filteredList);

    return filteredList;
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

  const handleSelectDate = function (selectedDate) {
    setDate(selectedDate);
  };

  const handleToggleType = function (selectedValue) {
    setType(selectedValue || "");
  };

  const handleSearchTransaction = function (searchValue) {
    setSearch(searchValue);
  };

  const handleEditTransaction = (transaction) => {
    setOpenTransactionModal(true);
    setTypeTransactions("Editar");
    setSelectTransaction(transaction);
  };

  const handleDeleteTransaction = (id) => {
    setLoading(true);

    api
      .delete(`/transacao/${id}`)
      .then(() => {
        toast.success("Transação deletada com sucesso", {
          icon: () => <CheckIcon color="primary" />,
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Não foi possível deletar a transação", {
          icon: () => <CloseIcon color="primary" />,
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
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
        {/* <Grid
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
        > */}
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={2}>
            <Typography
              component="h3"
              fontWeight="700"
              fontSize={{
                xs: "1.2rem",
              }}
              textAlign={{
                sm: "center",
                xs: "center",
                md: "center",
              }}
              color="#2D3748"
            >
              Transações
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <DateInput handleSelectDate={handleSelectDate} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <SearchInput handleInput={handleSearchTransaction} value={search} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <ToggleType handleToggleType={handleToggleType} />
          </Grid>
        </Grid>

        {/* </Grid> */}

        <List
          sx={{
            width: "100%",
            height: "20rem",
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
          ) : listFilteredTransactions().length === 0 ? (
            <NoResultText />
          ) : (
            listFilteredTransactions().map((transaction) => (
              <ListItem
                // alignItems="center"
                key={transaction._id}
                sx={{
                  padding: "0.3rem 0 0.3rem 0",
                }}
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <Grid container>
                      <Grid item>
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
                      </Grid>
                      <Grid item>
                        <ListItemText
                          sx={
                            {
                              // margin: "0",
                              // display: "inline-flex",
                            }
                          }
                          align="left"
                          primary={formatDate(transaction.data)}
                          primaryTypographyProps={{
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.8rem",
                              md: "0.8rem",
                            },
                            color: "#2D3748",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <ListItemText
                    sx={{
                      margin: "0 1rem",
                      // display: "flex",
                      // flexDirection: "column",
                      // alignItems: "flex-start",
                    }}
                    align="left"
                    primary={
                      transaction.categoria.nome
                        ? transaction.categoria.nome
                        : ""
                    }
                    primaryTypographyProps={{
                      component: "p",
                      fontWeight: "600",
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.8rem",
                        md: "0.8rem",
                      },
                      color: "#2D3748",
                    }}
                    secondary={
                      transaction.descricao ? transaction.descricao : ""
                    }
                    secondaryTypographyProps={{
                      component: "p",
                      fontWeight: "400",
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.7rem",
                        md: "0.7rem",
                      },
                      color: "#2D3748",
                    }}
                  />
                  <ListItemText
                    sx={{
                      margin: "0 1.2rem 0 0",
                      // display: "inline-flex",
                      // justifyContent: "flex-end",
                    }}
                    align="right"
                    primary={formatValue(
                      transaction.categoria.tipo,
                      transaction.valor
                    )}
                    primaryTypographyProps={{
                      component: "p",
                      fontWeight: "600",
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.8rem",
                        md: "0.8rem",
                      },
                      color:
                        transaction.categoria.tipo === "despesa"
                          ? "#E53E3E"
                          : "#48BB78",
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
                </Grid>
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
        selectTransaction={selectTransaction}
      />
    </>
  );
}
