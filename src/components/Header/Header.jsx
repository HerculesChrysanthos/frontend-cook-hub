// Header.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import logoImage from "../../images/Group 2.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";
import Tag from "../RecipeByTag/Tag";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const headerRef = useRef(null);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
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

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category);

    // Handle the category click if needed
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
      <div className="logo-container">
        <img src={logoImage} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <nav>
        <ul className="header-nav">
          <li>
                {/* Categories dropdown */}
                <span onClick={handleCategoriesClick}>Κατηγορίες</span>
                {isCategoriesDropdownOpen && <Categories data={categoriesData} />}
          </li>
          {isLoggedIn && (
            <>
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
          {!isLoggedIn && (
            <>
              <li>
                <a href="/recipesbyid">Συνταγές Aνά Κατηγορία</a>
              </li>
              <li>
                <Link to="/recipebytag/:tagId">Συνταγές Aνά ετικέτα</Link>
              </li>
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
