import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    setTimeout(() => {
        navigate("/");
      }, 2000);
    })
  

return (<div className="container mt-5">Déconnexion en cours...</div>)

};

export default LogOut;