// RecipeCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleRecipeClick = () => {
    // Redirect to the recipe page
    console.log("Selected recipe:", recipe.name);
    navigate(`/recipy/${recipe._id}`);
  };

  return (
    <div
      className="recipe-card"
      onClick={handleRecipeClick}
      style={{ cursor: "pointer" }}
    >
      <h2>{recipe.title}</h2>
      <img
        src={recipe.previewImage}
        alt={recipe.title}
        className="recipe-image"
      />
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;
