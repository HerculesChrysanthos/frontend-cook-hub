import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../Hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    preparationTime: 0,
    cookingTime: 0,
    categories: [],
    subcategories: [],
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "/api/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2> Δημιουργία Συνταγής </h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <label htmlFor="name">Όνομα Συνταγής</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Περιγραφή</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Συστατικά</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Προσθήκη Συστατικού
        </button>
        <label htmlFor="instructions">Οδηγίες</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="image">Προσθήκη Εικόνας </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg"
          required
        />
                <label htmlFor="cookingTime">Χρόνος Προετοιμασίας (λεπτά)</label>
        <input
          type="number"
          id="preparationTime"
          name="preparationTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Χρόνος Μαγειρέματος (λεπτά)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Υποβολή</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
