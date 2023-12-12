import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(null);

  useEffect(() => {
    // Function to fetch recipes with pagination
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `api/recipes?page=${Number(currentPage)}`
        );
        const { recipes: recipesData, totalRecipes, totalPages } = response.data;

        console.log(recipesData);
        setRecipes(recipesData);
        setTotalRecipes(totalRecipes);
        setTotalPages(totalPages);
        // const { data, totalPages } = response.data;
        // console.log(data);
        // setRecipes(data);
        // setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          {/* Display recipe details */}
          <p>{recipe.name}</p>
          <p>{recipe.description}</p>
        </div>
      ))}
      <div>
        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RecipeListPage;
