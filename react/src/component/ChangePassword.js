import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user) {
      axios
        .get(`https://127.0.0.1:8000/api/users/${user.id}`)
        .then((response) => {
          setUserInfo(response.data);
          setEmail(response.data.email); // Pré-remplir le champ email si nécessaire
          console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations utilisateur:",
            error
          );
          toast.error(
            "Erreur lors de la récupération des informations utilisateur"
          );
        });
    }
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

   const data ={

    email: userInfo.email,
    roles: userInfo.roles,
    pseudo:userInfo.pseudo,
    password: newPassword,
   }

 const datas =JSON.stringify(data);

console.log(datas);
console.log(userInfo.id);

    try {
      // Si la vérification réussit, procéder au changement de mot de passe
      const response = await axios.put(
        `https://127.0.0.1:8000/api/users/${user.id}`,datas,{
        
          headers: {
            "Content-Type": "application/ld+json",
          },
        }
      );

    

      if (response.status === 200) {
        toast.success("Mot de passe changé avec succès");
        setTimeout(() => {
          navigate("/MyInfo");
        }, 2000);



      } else {
        toast.error("Erreur lors du changement de mot de passe");
      }
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      toast.error("Erreur lors du changement de mot de passe");
    }
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    margin: "auto",
  };

  return (
    <div className="container my-5 p-4 rounded shadow-sm bg-light">
  <h2 className="mb-4 text-center text-primary font-weight-bold">
    Changer le mot de passe
  </h2>

  <form onSubmit={handlePasswordChange}>
    <div className="form-group">
      <label className="font-weight-bold text-muted">Email</label>
      <input
        type="email"
        value={email}
        readOnly
        required
        className="form-control bg-white text-dark border-0 mb-3"
      />

      <label className="font-weight-bold text-muted">Mot de passe actuel</label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
        className="form-control bg-white text-dark border-0 mb-3"
      />

      <label className="font-weight-bold text-muted">Nouveau mot de passe</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className="form-control bg-white text-dark border-0 mb-3"
      />

      <label className="font-weight-bold text-muted">Confirmer le nouveau mot de passe</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="form-control bg-white text-dark border-0 mb-4"
      />

      <button type="submit" className="btn btn-primary btn-lg btn-block">
        Changer le mot de passe
      </button>
    </div>
  </form>
  <ToastContainer />
</div>
  );
};

export default ChangePassword;
