import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);

  useEffect(() => {
    // Function to fetch recipes with pagination
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes?page=${Number(currentPage)}`
        );
        const { recipes: recipesData, totalRecipes } = response.data;

        console.log(recipesData);
        setRecipes(recipesData);
        setTotalRecipes(totalRecipes);
        // setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  console.log(recipes);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="recipes-container">
      <h1>Συνταγές</h1>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div>
        {/* Pagination component */}{" "}
        <Pagination
          currentPage={currentPage}
          totalRecipes={totalRecipes}
          onPageChange={handlePageChange}
        />{" "}
      </div>
    </div>
  );
};

export default RecipeListPage;
