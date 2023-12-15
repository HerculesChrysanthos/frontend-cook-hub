import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../Hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const token = localStorage.getItem("token");
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    preparationTime: 0,
    cookingTime: 0,
    category: "",
    subcategory: "",
    // user: userID,
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Retrieve categories from local storage on component mount
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      // Parse the stored JSON data
      const parsedCategories = JSON.parse(storedCategories);
      console.log("parsedCategories:", parsedCategories);
      console.log("json:", storedCategories);
      // Set the retrieved categories to state
      setCategories(parsedCategories);
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      // Update subcategories based on the selected category
      const selectedCategory = categories.find(
        (cat) => cat.category.name === value
      );
      const selectedSubcategories = selectedCategory
        ? selectedCategory.subcategories
        : [];
      setSubcategories(selectedSubcategories);
    }
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

  const handleTagChange = (event, index) => {
    const { value } = event.target;
    const tags = [...recipe.tags];
    tags[index] = value;
    setRecipe({ ...recipe, tags });
  };

  const handleAddTag = () => {
    const tags = [...recipe.tags, ""];
    setRecipe({ ...recipe, tags });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "/api/recipes",
        { ...recipe },
        {
          headers: { authorization: `Bearer ${token}` },
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
          accept="image/jpeg, image/png"
          required
        />
        <label htmlFor="preparationTime">Χρόνος Προετοιμασίας (λεπτά)</label>
        <input
          type="number"
          id="preparationTime"
          name="preparationTime"
          value={recipe.preparationTime}
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
        <label htmlFor="servings">Μερίδες (λεπτά)</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={recipe.servings}
          onChange={handleChange}
        />
        <label htmlFor="category">Κατηγορία</label>
        <select
          id="category"
          name="category"
          value={recipe.category}
          onChange={handleChange}
        >
          <option value="">Διάλεξε Κατηγορία</option>
          {categories.map((category) => (
            <option key={category.category._id} value={category.category.name}>
              {category.category.name}
            </option>
          ))}
        </select>
        <label htmlFor="subcategory">Υποκατηγορία</label>
        <select
          id="subcategory"
          name="subcategory"
          value={recipe.subcategory}
          onChange={handleChange}
        >
          <option value="">Διάλεξε Υποκατηγορία</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory.name}>
              {subcategory.name}
            </option>
          ))}
        </select>
        <label htmlFor="tags">Tags</label>
        {recipe.tags.map((tag, index) => (
          <input
            key={index}
            type="text"
            name="tags"
            value={tag}
            onChange={(event) => handleTagChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddTag}>
          Προσθήκη Tag
        </button>
        <button type="submit">Υποβολή</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
