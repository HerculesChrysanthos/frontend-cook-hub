import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Function to fetch recipes with pagination
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `api/recipes?user=${userId}`
        );
        const { data, totalPages } = response.data;
        setRecipes(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>Your Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          {/* Display recipe details */}
          <p>{recipe.name}</p>
          <p>{recipe.description}</p>
          {/* Add more details as needed */}
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

export default MyRecipes;
