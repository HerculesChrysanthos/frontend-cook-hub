// Header.js
import React from "react";
import logoImage from "../../images/Group 2.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userObject } = useAuth();

  return (
    <header>
      <div className="logo-container">
        <img src={logoImage} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <nav>
        <ul className="header-nav">
          <li>
            <a href="/">Category</a>
          </li>
          <li>
            <a href="/my-recipes">My Recipes</a>
          </li>
          <li className="magnify">
            <a href="/search">Search</a>
          </li>
          {!isLoggedIn && ( //is logged in true then - conditional rendering
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/Register">Register</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
