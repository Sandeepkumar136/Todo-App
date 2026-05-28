import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Contents/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;