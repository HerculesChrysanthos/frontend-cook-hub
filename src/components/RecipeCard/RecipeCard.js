// RecipeCard.js
import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.mainImage} alt={recipe.title} className="recipe-image" />
      <p>{recipe.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RecipeCard;
