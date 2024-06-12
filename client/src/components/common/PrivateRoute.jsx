import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  if (token !== null && user !== null) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;