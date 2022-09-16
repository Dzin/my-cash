import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectRoute";
import { ToastContainer } from "react-toastify";

// elementos
import Home from "../pages/home";
import Teste from "../pages/Teste";

export default function SwitchRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
