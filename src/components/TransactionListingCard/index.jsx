import React from "react";
import { useState, useEffect } from "react";

import { Grid, Typography, Button } from "@mui/material";

import { DateInput } from "../DateInput";
import { ToggleType } from "../ToggleType";

export const TransactionListingCard = ({ transactionList }) => {
  const [filteredTransactionList, setFilteredTransactionList] = useState([]);

  useEffect(() => {
    setFilteredTransactionList([...transactionList]);
  }, []);

  const filterTransactionsByMonth = (date) => {
    return transactionList.filter((transaction) => {
      const transactionDate = new Date(transaction.data);
      return (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const filterTransactionsByType = (transactionType) => {
    return transactionList.filter(
      (transaction) => transaction.tipo === transactionType
    );
  };

  const handleSelectMonth = function (date) {
    const selectedDate = new Date(date);

    setFilteredTransactionList(filterTransactionsByMonth(selectedDate));
  };

  const handleToggleType = function (e) {
    const selected = e.target.classList.contains("Mui-selected");
    setFilteredTransactionList(
      selected ? [...transactionList] : filterTransactionsByType(e.target.value)
    );
  };

  const handleEditTransaction = function (e) {
    console.log("Edit transaction");
  };

  const handleDeleteTransaction = function (e) {
    console.log("Delete transaction");
  };

  const handleAddNewTransaction = function (e) {
    console.log("Add new transaction");
  };

  return (
    <Grid>
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
      <DateInput handleSelectMonth={handleSelectMonth} />
      <ToggleType handleToggleType={handleToggleType} />
      <ul>
        {filteredTransactionList.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
      <Button variant="contained">Adicionar</Button>
    </Grid>
  );
};
