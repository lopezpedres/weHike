import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserAuthProvider/UserAuthProvider";

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
