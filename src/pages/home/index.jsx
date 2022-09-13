import React from "react";
import { useState, useEffect } from "react";
import { Transactions } from "../../components/TransactionListingCard";
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
    console.log("Delete transaction");
  };

  const handleAddNewTransaction = function (transaction, e) {
    console.log("Add new transaction");
  };

  return <Transactions transactionList={transactionList} />;
}
