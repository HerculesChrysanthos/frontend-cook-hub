import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../RecipeCard/RecipeCard'; // Import your RecipeCard component
import Pagination from '../Pagination/Pagination'; // Import your Pagination component

const RecipeByID = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch recipes based on the selected category and current page
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes?page=${Number(currentPage)}${
            selectedCategoryId ? `&categoryId=${selectedCategoryId}` : ''
          }`
        );
       // const response = await axios.get('/api/recipes/?categoryId=656f5050854bac62ce32390f');
        const { recipes: recipesData, totalRecipes } = response.data;

        setRecipes(recipesData);
        setTotalRecipes(totalRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [currentPage, selectedCategoryId]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(0);
  };

  return (
    <div className="recipes-container">
      <h1>Συνταγές</h1>
      <div className="category-dropdown">
        {/* Dropdown for categories */}
        <label htmlFor="category">Select Category: </label>
        <select
          id="category"
          value={selectedCategoryId || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div>
        {/* Pagination component */}
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