// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifiez l'authentification de l'utilisateur ici, par exemple avec un token dans le localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = () => {
    return user && user.role === "37332b7a-5694-4255-9d9b-c90ed1781b13";
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
