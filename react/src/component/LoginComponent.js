import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginStyle = {
  width: "70%",
  margin: "auto",
};

const aStyle = { margin: "auto" };

function searchRole(roleInfo) {
  let role;
  if (roleInfo === "ROLE_ADMIN") {
    role = "37332b7a-5694-4255-9d9b-c90ed1781b13";
  } else {
    role = "e4a387b9-87ad-45c2-9abd-9cc4c2346b5b";
  }
  return role;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const { login } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const onSubmit = (data) => {
    const datas = JSON.stringify(data);
    //console.log(datas);
    axios
      .post("https://127.0.0.1:8000/api/login", datas)
      .then((response) => {
        setUser(response.data.user);
        //console.log(response.data.user);
        setMessage(`Bienvenue, ${response.data.user.pseudo}!`);
        toast.success(`Bienvenue, ${response.data.user.pseudo}!`);
        const id = response.data.user.id;
        const pseudo = response.data.user.pseudo;
        const Aryrole = response.data.user.roles;
        const roleInfo = Aryrole[0];
        const role = searchRole(roleInfo);
        // Mettre à jour le contexte utilisateur
        login({ id, pseudo, role });
        reset();
        setTimeout(() => {
          navigate("/MyInfo");
        }, 2000);
      })

      .catch((error) => {
        // console.error("Erreur lors de la connexion:", error);
        toast.error("Mot de passe ou Email incorrect");
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      <form style={LoginStyle} onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <h1 className="mb-5">Connexion</h1>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          />
          <label htmlFor="password" className="mt-3">
            Mot de passe
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Connexion"
          />
        </div>
        <a href="/forgot-password" style={aStyle} class=" mt-5 btn btn-warning">
          Mot de passe oublié ?
        </a>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default LoginForm;
