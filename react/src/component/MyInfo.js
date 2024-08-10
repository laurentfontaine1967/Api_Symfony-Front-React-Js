import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyInfo = () => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:8000/api/users/${user.id}`)
        .then((response) => {
          setUserInfo(response.data);
          console.log(response.data)
          setLoading(false);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations utilisateur:",
            error
          );
          toast.error(
            "Erreur lors de la récupération des informations utilisateur"
          );
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!userInfo) {
    return <div>Informations utilisateur non disponibles</div>;
  }




  return (
    
<div className="container my-5 p-4 rounded shadow-sm bg-light">
  <ToastContainer />
  <h1 className="mb-4 text-center display-4 font-weight-bold text-primary">
    Mes Informations
  </h1>
  
  <div className="form-group">
    <label className="font-weight-bold text-muted">
      Email:
    </label>
    <p className="form-control bg-white text-dark border-0">
      {userInfo.email}
    </p>
  </div>

  <div className="form-group">
    <label className="font-weight-bold text-muted">
      Rôle:
    </label>
    <p className="form-control bg-white text-dark border-0">
      {userInfo.roles.join(", ")}
    </p>
  </div>

  <div className="form-group text-center mt-4">
    <a href="/change-password" className="btn btn-primary btn-lg">
      Changer mon mot de passe
    </a>
  </div>

  {/* Ajoutez d'autres champs selon vos besoins */}
</div>

    
  );
};

export default MyInfo;