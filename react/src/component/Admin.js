import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    const fetchRegistered = async () => {
      try {
        const response = await axios.get("https://localhost:8000/api/users");
        const data = response.data;
        console.log(data);

        // Vérifier que 'data['hydra:member']' est défini et est un tableau
        if (Array.isArray(data['hydra:member'])) {
          setRegistered(data['hydra:member']);
          //const role =registereddata['hydra:member'][0].roles
         //console.log(role);


        } else {
          throw new Error("Données inattendues");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        toast.error("Pas de connexion à la BDD");
      }
    };

    fetchRegistered();
  }, []);

  const delUser = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:8000/api/users/${id}`);
      if (response.status !== 204) {
        throw new Error("Erreur lors de la suppression");
      }
      toast.success("Utilisateur supprimé avec succès");
      setRegistered((prevRegistered) =>
        prevRegistered.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast.error("Utilisateur non supprimé");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-2" style={{ color: "white" }}>
        Page d'administration des utilisateurs
      </h1>
      <ToastContainer />

      {registered.length === 0 ? (
        <h4 style={{ color: "white" }} className="mt-4">
          Pas d'utilisateurs inscrits
        </h4>
      ) : (
        <div className="table-responsive">
          <table className="table mt-4 table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Role</th>
                <th>IsVerified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registered.map((register) => (
                <tr key={register.id}>
                  <td>{register.pseudo || "N/A"}</td>
                  <td>{register.email}</td>
                   <td>{register.roles ? register.roles.join(", ") : "N/A"}</td> 
                  <td>{register.IsVerified ? "Oui" : "Non"}</td>
                  <td>
                    <button
                      onClick={() => delUser(register.id)}
                      className="btn btn-danger mx-2"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
