import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";

export const Transactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [filteredTransactionList, setFilteredTransactionList] = useState([]);

  useEffect(() => {
    api
      .get("/transacao")
      .then((resp) => {
        setTransactionList(resp.data);
      })
      .catch((err) => {
        console.error("Can not get Transaction List!", `Error: ${err}`);
      });
  }, []);

  const filterTransactionsByMonth = (date) => {
    //tratar entrada e converter pros tipos válidos

    const filterDate = new Date(date);

    setFilteredTransactionList(
      transactionList.filter((transaction) => {
        const transactionDate = new Date(transaction.data);
        return transactionDate.getMonth() === filterDate.getMonth();
      })
    );
  };

  const filterTransactionsByType = (transactionType) => {
    //tratar entrada e converter pros tipos válidos

    setFilteredTransactionList(
      transactionList.filter(
        (transaction) => transaction.tipo === transactionType
      )
    );
  };

  const handleEditTransaction = function (e) {
    console.log("Edit transaction");
  };

  const handleDeleteTransaction = function (e) {
    console.log("Delete transaction");

    //pegar o id da transação pelo e
    // api.delete(`/transacao/${id}`).then(() => {
    //   alert(`Transação ${} deletada com sucesso`);
    // }).catch((err) => {
    //   console.error("Can not delete Transaction!", `Error: ${err}`);
    // });
  };

  const handleAddNewTransaction = function (e) {
    console.log("Add new transaction");
  };

  return (
    <>
      <div></div>
      <div></div>
    </>
  );
};
