// Header.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import logoImage from "../../images/Group 2.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Categories from "../Categories/Categories";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showCategories, setShowCategories] = useState(false);
  const headerRef = useRef(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    const storedTags = localStorage.getItem("tags");
    // Fetch tags using Axios
    if (storedTags === null) {
      axios
        .get("api/tags")
        .then((response) => {
          const data = response.data;
          setTags(data);

          // Store tags in local storage
          localStorage.setItem("tags", JSON.stringify(data));
        })
        .catch((error) => {
          // Handle any errors during the API request
          console.error("Error fetching tags:", error);
        });
    }

    if (storedCategories === null) {
      axios
        .get("/api/categories/?include=subcategories")
        .then((response) => {
          const data = response.data;
          setTags(data);

          // Store tags in local storage
          localStorage.setItem("categories", JSON.stringify(data));
        })
        .catch((error) => {
          // Handle any errors during the API request
          console.error("Error fetching categories:", error);
        });
    }
  }, []);

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category);
    
    // Handle the category click if needed
  };

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
          {isLoggedIn && ( //is logged in false then - conditional rendering
            <>
              {" "}
              {/* react fragment to have one parent*/}
              <li>
                <a href="/recipes/my-recipes">Συνταγές μου</a>
              </li>
              <li>
                <a href="/recipes/new">Δημιουργία Συνταγής</a>
              </li>
              <li>
                <a href="/recipesbyid">Συνταγές Aνά Κατηγορία</a>
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
