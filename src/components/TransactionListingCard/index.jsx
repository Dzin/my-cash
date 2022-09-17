import React from "react";
import { useState } from "react";

import { Grid, Typography, Button } from "@mui/material";

import { DateInput } from "../DateInput";
import { ToggleType } from "../ToggleType";

export const TransactionListingCard = ({ transactionList }) => {
  const [date, setDate] = useState(null);
  const [type, setType] = useState("");

  const filterTransactionsByDate = (transaction) => {
    const currentTransactionDate = new Date(transaction.data);
    const selectedTransactionDate = new Date(date);

    return (
      currentTransactionDate.getMonth() ===
        selectedTransactionDate.getMonth() &&
      currentTransactionDate.getFullYear() ===
        selectedTransactionDate.getFullYear()
    );
  };

  const filterTransactionsByType = (transaction) => {
    return transaction.tipo === type;
  };

  const listFilteredTransactions = () => {
    let filteredList = [...transactionList];

    if (date) filteredList = filteredList.filter(filterTransactionsByDate);
    if (type) filteredList = filteredList.filter(filterTransactionsByType);

    return filteredList;
  };

  const handleSelectDate = function (selectedDate) {
    setDate(selectedDate);
  };

  const handleToggleType = function (currentType, selectedValue) {
    setType(currentType === selectedValue ? "" : selectedValue);
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
      <DateInput handleSelectDate={handleSelectDate} />
      <ToggleType handleToggleType={handleToggleType} />
      <ul>
        {listFilteredTransactions().map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
      <Button variant="contained">Adicionar</Button>
    </Grid>
  );
};
