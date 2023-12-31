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
  const [categoryName, setCategoryName] = useState(null);
  const [message, setMessage] = useState(null);

  // Use the useParams hook to get the category ID from the URL
  const { categoryId } = useParams();
  console.log({ categoryId });

  console.log();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes?page=${Number(currentPage)}${
            categoryId ? `&categoryId=${categoryId}` : ''
          }`
        );

        const recipesData = response.data.recipes;
        const totalRecipesData = response.data.totalRecipes;

        if (totalRecipesData === 0) {
          setRecipes([]);
          setTotalRecipes(0);
          setMessage('Δεν υπάρχουν συνταγές στην κατηγορία');
          setCategoryName(null);
        } else {
          console.log(response.data);
          const { category } = recipesData[0]; // Extract subcategory from the first recipe
          setRecipes(recipesData);
          setTotalRecipes(totalRecipesData);
          setCategoryName(category ? category.name : null);
          setMessage(null);
          console.log('categoryName when recipes exist', { categoryName });
        }
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

  console.log(recipes);
  return (
    <div className='recipe-by-id-container'>
      <h1>{categoryName && categoryName}</h1>
      {message ? (
        <div className='no-results'>
          <h2> {message}</h2>
        </div>
      ) : (
        <div className='recipes-list'>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
      {/* <div className="recipes-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div>Η κατηγορία είναι άδεια</div>
        )}
      </div> */}
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
