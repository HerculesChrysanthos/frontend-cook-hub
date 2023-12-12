import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import mongoose from 'mongoose';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  console.log(recipeId);

  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Instantiate mongoose using the 'new' keyword
        const objectIdRecipeId = new mongoose.Types.ObjectId(recipeId);

        const response = await axios.get(`/api/recipes/${objectIdRecipeId}`);
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
    <div className="container">
      {recipeData ? (
        <div className="recipe-details">
          <h2>{recipeData.title}</h2>
          <p>{recipeData.description}</p>
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
          {/* <p>Category: {recipeData.category.name}</p> */}
          {/* <p>Subcategory: {recipeData.subcategory.name}</p> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;