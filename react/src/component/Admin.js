import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    const fetchRegistered = async () => {
      try {
        const response = await fetch("https://127.0.0.1:8000/api/users");
        const data = await response.json();
        console.log(data); // Vérifiez les données reçues de l'API
        setRegistered(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Pas de connexion à la BDD");
      }
    };

    fetchRegistered();
  }, []);

  //delete User
  function delUser(id) {
    fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Utilisateur supprimé avec succès");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Utilisateur non supprimé");
      });
  }

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
                  <td>{register.pseudo}</td>
                  <td>{register.email}</td>
                  <td>{register.role}</td>
                  <td>{register.IsVerified}</td>
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
