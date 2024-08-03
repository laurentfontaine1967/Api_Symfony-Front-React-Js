import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const AdminRoute = ({ element, ...rest }) => {
  const { user, isAdmin } = useContext(UserContext);

  console.log("user:", user);
  console.log("isAdmin:", isAdmin);
  console.log("isAdmin() result:", isAdmin());

  if (user === null) {
    return <div style={{ color: "white" }}>Chargement en cours ...</div>;
  }

  return user && isAdmin() ? element : <Navigate to="/login" />;
};

export default AdminRoute;
