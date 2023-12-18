import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
import Pagination from "../Pagination/Pagination";

const RecipeBySub = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [selectedSubCategoryId, setselectedSubCategoryId] = useState(null);

  // Use the useParams hook to get the subcategory ID from the URL
  const { subcategoryId } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes?page=${Number(currentPage)}${
            subcategoryId ? `&subcategoryId=${subcategoryId}` : ""
          }`
        );

        const {
          recipes: recipesData,
          totalRecipes,
          categoryName,
        } = response.data;
        console.log(response.data);
        setRecipes(recipesData);
        setTotalRecipes(totalRecipes);
        setCategoryName(categoryName);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [currentPage, subcategoryId]); // Include subcategoryId in the dependency array

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (subcategoryId) => {
    setselectedSubCategoryId(subcategoryId);
    setCurrentPage(0);
  };

  return (
    <div className="recipe-by-id-container">
      <h1>Συνταγές {categoryName}</h1>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalRecipes={totalRecipes}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RecipeBySub;
