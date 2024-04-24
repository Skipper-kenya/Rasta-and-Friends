import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../layout/Layout";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  axios.defaults.withCredentials = true;
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated) {
    return <Layout>{children}</Layout>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
