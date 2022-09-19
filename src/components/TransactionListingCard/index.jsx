import React from "react";
import { useState } from "react";

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

import { DateInput } from "../DateInput";
import { ToggleType } from "../ToggleType";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export const TransactionListingCard = ({ transactions }) => {
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
        {listFilteredTransactions().map((transaction) => (
          <ListItem
            key={transaction.id}
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
                  fontSize="small"
                  sx={{
                    color: "#E53E3E",
                  }}
                />
              ) : (
                <ArrowCircleUpOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: "#48BB78",
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary={transaction.descricao}
              primaryTypographyProps={{
                fontSize: {
                  md: "0.9rem",
                  xs: "0.8rem",
                },
              }}
            />
            <IconButton aria-label="edit" onClick={() => console.log("Edit")}>
              <EditOutlinedIcon
                fontSize="small"
                sx={{
                  color: "#000000",
                }}
              />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => console.log("delete")}
            >
              <DeleteForeverOutlinedIcon
                fontSize="small"
                sx={{
                  color: "#000000",
                }}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained">Adicionar</Button>
    </Grid>
  );
};
