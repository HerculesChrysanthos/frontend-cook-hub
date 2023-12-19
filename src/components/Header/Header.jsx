// Header.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import logoImage from "../../images/Group 2.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";
import Tag from "../RecipeByTag/Tag";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch tags using Axios
      axios
        .get("/api/tags")
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

    // Fetch categories data always when the component mounts
    axios
      .get("/api/categories/?include=subcategories")
      .then((response) => {
        const data = response.data;
        setCategoriesData(data);

        // Store categories in local storage
        localStorage.setItem("categories", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

      
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleCategoriesClick = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
  };

  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const handleTagDropdownToggle = () => {
    setIsTagDropdownOpen(!isTagDropdownOpen);
  };

  return (
    <header>
      <nav>
        <div className="logo-container">
          <img src={logoImage} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <ul className="header-nav">
          <li className="categories-li">
            <span onClick={handleCategoriesClick}>Κατηγορίες</span>
            {isCategoriesDropdownOpen && <Categories data={categoriesData} />}
          </li>
          <li className="categories-li">
            <span onClick={handleTagDropdownToggle}>Ετικέτες</span>
            {isTagDropdownOpen && <Tag />}
          </li>
          {isLoggedIn && (
            <>
              <li>
                <span
                  className="header-link"
                  onClick={() => navigate("/recipes/my-recipes")}
                >
                  Συνταγές μου
                </span>
              </li>
              <li>
                <span
                  className="header-link"
                  onClick={() => navigate("/recipes/new")}
                >
                  Δημιουργία Συνταγής
                </span>
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
                <span
                  className="header-link"
                  onClick={() => navigate("/login")}
                >
                  Σύνδεση
                </span>
              </li>
              <li>
                <span
                  className="header-link"
                  onClick={() => navigate("/Register")}
                >
                  Εγγραφή
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
