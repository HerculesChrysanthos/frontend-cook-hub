import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from '../Pagination/Pagination';

const RecipeBySub = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [selectedSubCategoryId, setselectedSubCategoryId] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState(null); // New state for subcategory name

  // Use the useParams hook to get the subcategory ID from the URL
  const { subcategoryId } = useParams();
  console.log({ subcategoryId });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `/api/recipes?page=${Number(currentPage)}${
            subcategoryId ? `&subcategoryId=${subcategoryId}` : ''
          }`
        );

        const { recipes: recipesData, totalRecipes } = response.data;

        if (recipesData.length > 0) {
          const { subcategory } = recipesData[0]; // Extract subcategory from the first recipe
          setRecipes(
            recipesData.filter(
              (recipe) => recipe.subcategory?._id === subcategoryId
            )
          ); // Filter recipes based on subcategoryId
          setSubcategoryName(subcategory ? subcategory.name : null); // Set subcategory name
        }

        setTotalRecipes(totalRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
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
    <div className='recipe-by-id-container'>
      <h1>{subcategoryName}</h1>{' '}
      {/* Display subcategory name if available, otherwise use categoryName */}
      <div>
        {recipes.length > 0 ? (
          <div className='recipes-list'>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className='no-results'>
            <h2>Δεν υπάρχουν συνταγές</h2>
          </div>
        )}
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
