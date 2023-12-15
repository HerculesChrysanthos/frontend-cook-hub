import React, { useState, useRef } from "react";
import logoImage from "../../images/Group 2.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Categories from '../Categories/Categories';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showCategories, setShowCategories] = useState(false);
  const headerRef = useRef(null);

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category);
    // Handle the category click if needed
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <header ref={headerRef}>
      <div className="logo-container">
        <img src={logoImage} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <nav>
      <ul className="header-nav">
          <li>
            <a
              href="/Categories"
              onClick={(e) => {
                e.preventDefault();
                handleCategoriesClick();
              }}
            >
              Κατηγορίες
            </a>
            {showCategories && (
              <Categories handleCategoryClick={handleCategoryClick} />
            )}
          </li>
          {isLoggedIn && (
            <>
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
          {!isLoggedIn && (
            <>
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