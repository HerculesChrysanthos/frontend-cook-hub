import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import RecipeCard from '../RecipeCard/RecipeCard';
import { useParams } from 'react-router-dom';

const RecipeByTag = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [tagNames, setTagNames] = useState([]); // New state for storing tag names
  const [tagName, setTagName] = useState('');
  const { tagId } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let apiUrl = `/api/recipes`;

        // If a tag is selected, add the tagId to the API endpoint
        if (tagId) {
          apiUrl += `?tagId=${tagId}`;
        }

        const response = await axios.get(apiUrl, {
          params: {
            page: Number(currentPage),
          },
        });

        const recipesData = response.data.recipes;
        const totalRecipesData = response.data.totalRecipes;

        // Extract tag names from the first recipe (assuming all recipes have the same tags)
        const tagNamesFromRecipe =
          recipesData.length > 0
            ? recipesData[0].tags.map((tag) => tag.name)
            : [];

        console.log(recipesData);
        setRecipes(recipesData);
        setTotalRecipes(totalRecipesData);
        setTagNames(tagNamesFromRecipe);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
    const allTagsString = localStorage.getItem('tags');
    const allTags = JSON.parse(allTagsString);
    setTagName(allTags.find((tag) => tag._id === tagId));
  }, [currentPage, tagId]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='recipes-container'>
      {/* Display tag names in the heading */}
      <h1>Συνταγές {tagName.name}</h1>

      <div className='recipes-list'>
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

export default RecipeByTag;
