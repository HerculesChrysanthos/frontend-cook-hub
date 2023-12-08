// Header.js
import React from "react";
import logoImage from "../../images/Group 2.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    // Call the logout function from the useAuth hook
    logout();

    // Redirect to the login page or any other page after logout
    navigate("/");
  };

  return (
    <header>
      <div className="logo-container">
        <img src={logoImage} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <nav>
        <ul className="header-nav">
          <li>
            <a href="/">Κατηγορίες</a>
          </li>

          {/* <li className="magnify">
            <a href="/search">Search</a>
          </li> */}
          {isLoggedIn && ( //is logged in false then - conditional rendering
            <>
              {" "}
              {/* react fragment to have one parent*/}
              <li>
                <a href="/my-recipes">Συνταγές μου</a>
              </li>
              <li>
                <a href="/create-recipe">Δημιουργία Συνταγής</a>
              </li>
              <li>
                <a href="/" onClick={handleLogout}>
                  Αποσύνδεση
                </a>
              </li>
            </>
          )}
          {!isLoggedIn && ( //is logged in true then - conditional rendering
            <>
              {" "}
              {/* react fragment to have one parent*/}
              <li>
                <a href="/login">Σύνδεση</a>
              </li>
              <li>
                <a href="/Register">Εγγραφή</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
