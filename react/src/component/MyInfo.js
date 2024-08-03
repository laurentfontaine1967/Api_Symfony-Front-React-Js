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
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="mb-5">
        Mes Informations
      </h1>
      <div className="form-group">
        <label  className="mt-5">
          Email:
        </label>
        <p  className="mt-2">
          {userInfo.email}
        </p>
      </div>

      <div className="form-group">
        <label  className="mt-5">
          Role:
        </label>
        <p  className="mt-2">
          {userInfo.roles.join(", ")}
        </p>
      </div>


      <div className="form-group">
        <a href="/change-password" className=" btn btn-info mt-5">
          Changer mon mot de passe
        </a>
      </div>

      {/* Ajoutez d'autres champs selon vos besoins */}
    </div>
  );
};

export default MyInfo;