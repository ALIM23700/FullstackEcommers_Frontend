
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    alert("Please login to access the page");
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    alert("Access denied. Admins only.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
