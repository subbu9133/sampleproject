import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/tokenUtils";

const PrivateRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
