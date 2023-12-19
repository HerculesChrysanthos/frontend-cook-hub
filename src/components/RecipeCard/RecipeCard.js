// RecipeCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../images/Group 2.svg";

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
      <img
        src={recipe.previewImage ? recipe.previewImage : logoImage}
        alt={recipe.title}
        className="recipe-image"
      />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;
