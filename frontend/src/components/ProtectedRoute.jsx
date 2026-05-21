import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const isAdmin =
    (loggedInUser &&
      loggedInUser.role &&
      loggedInUser.role.toString().toLowerCase() === "admin") ||
    (loggedInUser && loggedInUser.email === "et72862@ubt-uni.net") ||
    (loggedInUser && loggedInUser.email === "rozafe.shkodra@gmail.com");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
