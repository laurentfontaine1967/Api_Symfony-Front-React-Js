import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
//import bcrypt from "bcrypt";

import { useNavigate } from "react-router-dom";

//registration
const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  //verifier le user

  const [message, setMessage] = useState("");

  //validation du formulaire
  const onSubmit = async (data) => {
    //const verificationToken = CryptoJS.lib.WordArray.random(20).toString();
    //const isVerified = false;

    // Créer un mot de passe haché
    //const hashedPassword = bcrypt.hash(data.password, 10);
    //const role = "user";

    const records = {
      pseudo: data.pseudo,
      email: data.email,
      //verificationToken: verificationToken,
      //IsVerified: isVerified,
      password: data.password,
      //role: role,
    };
    const datas = JSON.stringify(records);
    console.log("Toinsert a new user into the database");
    console.log(datas);
    axios
      .post("https://127.0.0.1:8000/api/users", datas, {
        headers: {
          "Content-Type": "application/ld+json",
        },
      })
      .then((response) => {
        setMessage(response.data);
        console.log(response.data);
        toast.success(response.data);

        setMessage("Création de votre compte avec succès");

        // envoie mail

        // console.log("data mail");
        // console.log(datamail);

        setTimeout(() => {
          navigate("/");
        }, 10000); // 10000 milliseconds = 10 seconds
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi(Insert) des données:", error);
        // toast.error(`Erreur: ${error.message}`);
        toast.error("Pas de connexion(Insert) a la base de données");
      });
  };
  //style
  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    width: "75%",
    margin: "auto",
  };

  const AlertStyle = {
    color: "red",
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group" style={formGroupStyle}>
          <h1 className="mb-5">S'enregistrer</h1>
          <label htmlFor="pseudo">pseudo</label>
          <input
            className="mt-2 form-control"
            id="pseudo"
            {...register("pseudo", {
              required: true,
              maxLength: 20,
              minLength: 4,
            })}
            aria-invalid={errors.pseudo ? "true" : "false"}
          />
          {errors.pseudo?.type === "required" && (
            <p role="alert" style={AlertStyle}>
              pseudo obligatoire
            </p>
          )}

          {errors.pseudo?.type === "minLength" && (
            <p role="alert" style={AlertStyle}>
              4 caractères minimum
            </p>
          )}

          {errors.pseudo?.type === "maxLength" && (
            <p role="alert" style={AlertStyle}>
              20 caractères maximum
            </p>
          )}
          <label className="mt-4" htmlFor="email">
            Adresse mail
          </label>
          <input
            className="mt-2 form-control"
            id="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />

          {errors.email?.type === "required" && (
            <p role="alert" style={AlertStyle}>
              email Obligatoire
            </p>
          )}

          {errors.email?.type === "pattern" && (
            <p role="alert" style={AlertStyle}>
              adresse mail invalide
            </p>
          )}
          {errors.mail && (
            <p role="alert" style={AlertStyle}>
              {errors.mail?.message}
            </p>
          )}

          <label htmlFor="password" class="mt-2 ">
            Mot de passe
          </label>
          <input
            className="mt-3 form-control"
            id="password"
            {...register("password", {
              required: true,
              maxLength: 15,
              minLength: 8,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p role="alert" style={AlertStyle}>
              mot de passe obligatoire
            </p>
          )}

          {errors.password?.type === "minLength" && (
            <p role="alert" style={AlertStyle}>
              8 caractères minimum
            </p>
          )}

          {errors.password?.type === "maxLength" && (
            <p role="alert" style={AlertStyle}>
              15 caractères maximum
            </p>
          )}

          <input type="submit" className="btn btn-dark mt-5" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
