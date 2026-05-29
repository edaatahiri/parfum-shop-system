import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const currentRole = (localStorage.getItem("userRole") || "")
    .trim()
    .toLowerCase();

  const hasAccess =
    ["admin", "manager"].includes(currentRole) ||
    (loggedInUser &&
      loggedInUser.role &&
      ["admin", "manager"].includes(
        loggedInUser.role.toString().toLowerCase().trim(),
      )) ||
    (loggedInUser && loggedInUser.email === "et72862@ubt-uni.net") ||
    (loggedInUser && loggedInUser.email === "rozafe.shkodra@gmail.com");

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
