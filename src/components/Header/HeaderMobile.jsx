// Header.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import logoImage from "../../images/Group 2.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";
import Tag from "../RecipeByTag/Tag";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import CategoriesMobile from "../Categories/CategoriesMobile";
import { MdKeyboardArrowDown } from "react-icons/md";

const HeaderMobile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const headerRef = useRef(null);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

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

    // Handle the category click if needed add user ref to close
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
    <div className="mobile-menu">
      <nav>
        <div className="logo-container">
          <img src={logoImage} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="burger-menu">
          {!openMenu && (
            <AiOutlineMenu
              size={25}
              onClick={() => setOpenMenu((prevState) => !prevState)}
            />
          )}
        </div>
        <ul className={openMenu ? "header-nav active" : "header-nav"}>
          <span className="close-menu">
            {openMenu && (
              <AiOutlineClose
                size={25}
                onClick={() => setOpenMenu((prevState) => !prevState)}
              />
            )}
          </span>
          <li className="categories-li">
            <span onClick={handleCategoriesClick}>
              Κατηγορίες <MdKeyboardArrowDown />
            </span>
            {isCategoriesDropdownOpen && (
              <CategoriesMobile data={categoriesData} />
            )}
          </li>
          <li className="categories-li">
            <span onClick={handleTagDropdownToggle}>Ετικέτες</span>
            {isTagDropdownOpen && <Tag />}
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
                  onClick={() =>
                    navigate("/login") & setOpenMenu((prevState) => !prevState)
                  }
                >
                  Σύνδεση
                </span>
              </li>
              <li>
                <span
                  className="header-link"
                  onClick={() =>
                    navigate("/Register") &
                    setOpenMenu((prevState) => !prevState)
                  }
                >
                  Εγγραφή
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderMobile;
