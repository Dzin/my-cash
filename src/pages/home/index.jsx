import React from "react";
import { useState, useEffect } from "react";
import { TransactionListingCard } from "../../components/TransactionListingCard";
import api from "../../services/api";

export default function Home() {
  const [transactionList, setTransactionList] = useState([]);

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

  const handleEditTransaction = function (id, e) {
    console.log("Edit transaction");
  };

  const handleDeleteTransaction = function (id, e) {
    api
      .delete(`/transacao/${id}`)
      .then(() => {
        alert(`Transação ${id} deletada com sucesso`);
        setTransactionList(
          transactionList.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((err) => {
        console.error(`Can not delete Transaction ${id}!`, `Error: ${err}`);
      });
  };

  const handleAddNewTransaction = function (transaction, e) {
    console.log("Add new transaction");
  };

  return <TransactionListingCard transactionList={transactionList} />;
}
