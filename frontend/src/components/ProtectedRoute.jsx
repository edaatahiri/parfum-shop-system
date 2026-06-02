import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
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

    setAuthorized(hasAccess);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
