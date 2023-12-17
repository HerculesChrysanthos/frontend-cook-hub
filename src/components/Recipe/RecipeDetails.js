import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  console.log(recipeId);

  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const data = response.data;

        console.log(data);

        setRecipeData(data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchData();
  }, [recipeId]);

  return (
    <div className="recipe-container">
      {recipeData ? (
        <div className="recipe-details">
          <h2>{recipeData.title}</h2>
          <p>{recipeData.description}</p>
          <img src={recipeData.mainImage} alt={recipeData.title} className="recipe-image" />
          <p>Χρόνος προετοιμασίας: {recipeData.preparationTime} minutes</p>
          <p>Χρόνος μαγειρέματος: {recipeData.cookingTime} minutes</p>
          <p>Μερίδες: {recipeData.servings}</p>
          <h3>Συστατικά:</h3>
          <ul>
            {recipeData.ingredients.map((ingredient) => (
              <li key={ingredient._id}>
                {ingredient.quantity} {ingredient.measurement} {ingredient.name}
              </li>
            ))}
          </ul>
          <h3>Εκτέλεση:</h3>
          <p>{recipeData.instructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;