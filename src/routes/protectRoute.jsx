import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isAllowed = true,
  redirectPath = "/",
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children ? children : <Outlet />;
  }
}
