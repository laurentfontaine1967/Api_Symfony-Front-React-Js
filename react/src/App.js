import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./component/registerForm";
import Navb from "./component/navbar";
import { UserProvider } from "./contexts/UserContext";
import LoginForm from "./component/LoginComponent";
import AdminRoute from "./component/AdminRoute";
import Admin from "./component/Admin";
import LogOut from "./component/Logout";
import MyInfo from "./component/MyInfo";

function App() {
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/cookie-bar/cookiebar-latest.min.js?forceLang=fr&customize=1&always=1&top=1&showNoConsent=1"
        ></script>
      </head>
      <UserProvider>
        <BrowserRouter>
          <Navb />
          <Routes>
            <Route exact path="/register" element={<RegisterForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
            <Route exact path="/logout" element={<LogOut />} />
            <Route exact path="/MyInfo" element={<MyInfo />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
