import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import RecipeCard from "../RecipeCard/RecipeCard";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");

  console.log('token', token);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Function to fetch recipes with pagination
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/api/recipes/my-recipes?page=${Number(currentPage)}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { recipes: recipesData, totalRecipes } = response.data;
        setRecipes(recipesData);
        setTotalRecipes(totalRecipes);
        setErrorMessage(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Recipe not found
          setRecipes([]);
          setTotalRecipes(0);
          setErrorMessage("Δεν έχετε δημοσιευμένες συνταγές ακόμη.");
        } else if (error.response && (error.response.status === 401 || error.response.status === 403)){
          //user not connecter or token expiration
          setErrorMessage("Πρέπει να συνδεθείτε για να δείτε τις συνταγές σας.");
        } else {
          console.error("Error fetching recipes:", error);
          setErrorMessage("Error fetching recipes.");
        }
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="recipes-container">
      <h2>Οι συνταγές μου</h2>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <div className="recipes-list">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          {/* Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalRecipes={totalRecipes}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
