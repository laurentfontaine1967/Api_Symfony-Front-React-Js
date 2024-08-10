import { UserContext } from "../contexts/UserContext";
import React, { useContext } from "react";

const Footer = () => {
  const { user } = useContext(UserContext);

  return (
    <footer className="text-center text-lg-start mt-auto"style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">Link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 4</a>
              </li>
            </ul>
          </div>
          {/* Répétez le bloc ci-dessus pour d'autres colonnes */}
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
       <span style={{color:"white"}}>© 2024 Copyright:</span> 
        <span style={{color:"white"}}> Laurent FONTAINE</span>
      </div>
    </footer>
  );
};

export default Footer;
