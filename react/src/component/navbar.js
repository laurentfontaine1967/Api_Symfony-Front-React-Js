import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import React, { useContext } from "react";

function Navb() {
  const { user, isAdmin } = useContext(UserContext);
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li>
            {!user ? (
              <li class="nav-item">
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>
            ) : null}

            {user ? (
              <li class="nav-item">
                <Link class="nav-link" to="/#">
                  Bonjour, {user.pseudo}!
                </Link>
              </li>

            ) : (
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
                
              </li>
            )}

{user ? (
              <li class="nav-item">
                <Link class="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            ) : null}
            
            {isAdmin() && (
              <li class="nav-item">
                <Link class="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            {/* <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navb;
