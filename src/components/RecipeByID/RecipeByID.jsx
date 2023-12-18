import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from '../Pagination/Pagination';

const RecipeByID = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Use the useParams hook to get the category ID from the URL
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes?page=${Number(currentPage)}${
            categoryId ? `&categoryId=${categoryId}` : ''
          }`
        );

        const { recipes: recipesData, totalRecipes } = response.data;

        setRecipes(recipesData);
        setTotalRecipes(totalRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [currentPage, categoryId]); // Include categoryId in the dependency array

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(0);
  };

  return (
    <div className="recipe-by-id-container">
      <h1>Συνταγές</h1>
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

export default RecipeByID;
