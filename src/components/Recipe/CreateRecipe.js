import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate} from "react-router-dom";

const CreateRecipe = ({ isUpdate, editedRecipe }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    preparationTime: 0,
    cookingTime: 0,
    servings: 0,
    category: "",
    subcategory: "",
    tags: [],
  });

  useEffect(() => {
    if (isUpdate && editedRecipe) {
      console.log("is Update");
      // If in update mode and data is available, populate the form with the edited recipe data
      setRecipe(editedRecipe);
    } else {
      // If not in update mode or no editedRecipe data, set default values for new recipe
      console.log("is Create");
      setRecipe({
        title: "",
        description: "",
        ingredients: [""],
        instructions: "",
        imageUrl: "",
        preparationTime: 0,
        cookingTime: 0,
        servings: 0,
        category: "",
        subcategory: "",
        tags: [],
      });
    }
  }, [isUpdate, editedRecipe]);

  console.log("isUpdate in recipe update", isUpdate);
  console.log("editedRecipe in recipe update", editedRecipe);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);

  useEffect(() => {
    // Retrieve categories from local storage on component mount
    const storedCategories = localStorage.getItem("categories");

    console.log("storedCategories", storedCategories);
    if (storedCategories) {
      // Parse the stored JSON data
      const parsedCategories = JSON.parse(storedCategories);
      console.log("parsedCategories", parsedCategories);
      setCategories(parsedCategories);
    }

    const storedTags = localStorage.getItem("tags");
    if (storedTags) {
      // Parse the stored JSON data
      const parsedTags = JSON.parse(storedTags);
      setTags(parsedTags);
    }
  }, []);

  useEffect(() => {
    // Update tagsOptions whenever tags change
    setTagsOptions(tags.map((tag) => ({ value: tag._id, label: tag.name })));
  }, [tags]);

  useEffect(() => {
    if (isUpdate) {
      // If in update mode, populate the form with the edited recipe data
      setRecipe(editedRecipe);
    }
  }, [isUpdate, editedRecipe]);

  const handleTagsChange = (selectedOptions) => {
    const selectedTagIds = selectedOptions.map((option) => option.value);
    setRecipe({ ...recipe, tags: selectedTagIds });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    const selectedCategory = value;
    console.log("selectedCategory", selectedCategory);
    const selectedSubcategories = selectedCategory
      ? selectedCategory.subcategories
      : [];
    console.log("selectedSubcategories", selectedSubcategories);
    // const categoryId = selectedCategory ? selectedCategory._id : "";

    setRecipe({
      ...recipe,
      category: selectedCategory,
      subcategory: "",
    });

    setSubcategories(selectedSubcategories);
  };

  const handleSubcategoryChange = (event) => {
    const { value } = event.target;
    //  Set the subcategory ID in the recipe state
    const selectedSubcategory = subcategories.find(
      (subcat) => subcat._id === value
    );
    // const subcategoryId = selectedSubcategory ? selectedSubcategory._id : "";
    setRecipe({ ...recipe, subcategory: selectedSubcategory });
    console.log("selectedSubcategory", selectedSubcategory);
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

  const handleImageChange = (event) => {
    const { files } = event.target;
    setRecipe({ ...recipe, imageUrl: files[0] });
  };

  const handleCancel = () => {
    const shouldProceed = window.confirm(
      "Είστε σίγουροι ότι θέλετε να προχωρήσετε στην ενέργεια;"
    );
    if (shouldProceed) {
      window.location.reload();
    }
  };

  const handleSubmit = async (event) => {
    const shouldProceed = window.confirm(
      "Είστε σίγουροι ότι θέλετε να προχωρήσετε στην ενέργεια;"
    );
    if (shouldProceed) {
      event.preventDefault();
      try {
        const formData = new FormData();
        Object.entries(recipe).forEach(([key, value]) => {
          if (key === "imageUrl") {
            //to add imageurl logic
            // { isUpdate && (formData)}
            formData.append("image", value);
          } else if (key === "tags") {
            recipe.tags.forEach((tagId, index) => {
              formData.append(`tags[${index}]`, tagId);
            });
          } else if (key === "ingredients") {
            recipe.ingredients.forEach((ingredient, index) => {
              formData.append(`ingredients[${index}]`, ingredient);
            });
          } else {
            formData.append(key, value);
          }
        });
        console.log("isUpdate", isUpdate);
        if (isUpdate) {
          // If it's an update, make a PUT request
          await axios.put(`/api/recipes/${editedRecipe._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Recipe Updated");
          console.log("isUpdate", isUpdate);
        } else {
          console.log("isUpdate", isUpdate);
          await axios.post("/api/recipes", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Recipe Created");
        }
        console.log("kanei update", isUpdate);
        // After successful request, navigate to the desired page
        navigate("/recipes/my-recipes");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="create-recipe">
      <h2>Δημιουργία Συνταγής</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <label htmlFor="title">Όνομα Συνταγής</label>
        <input
          type="text"
          id="title"
          name="title"
          value={recipe.title}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Περιγραφή</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="image">Προσθήκη Εικόνας </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
          required
        />
        <label htmlFor="preparationTime">Χρόνος Προετοιμασίας (λεπτά)</label>
        <input
          type="number"
          id="preparationTime"
          name="preparationTime"
          value={recipe.preparationTime}
          onChange={handleInputChange}
        />
        <label htmlFor="cookingTime">Χρόνος Μαγειρέματος (λεπτά)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleInputChange}
        />
        <label htmlFor="servings">Μερίδες</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={recipe.servings}
          onChange={handleInputChange}
        />
        <label htmlFor="category">Κατηγορία</label>
        <select
          id="category"
          name="category"
          // value={recipe.category}
          onChange={handleCategoryChange}
        >
          <option value="">
            {isUpdate ? ` ${editedRecipe.category.name}` : "Διάλεξε Κατηγορία"}
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="subcategory">Υποκατηγορία</label>
        <select
          id="subcategory"
          name="subcategory"
          // value={recipe.subcategory}
          onChange={handleSubcategoryChange}
        >
          <option value="">
            {isUpdate
              ? ` ${editedRecipe.subcategory.name}`
              : "Διάλεξε Υποκατηγορία"}
          </option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
        <label htmlFor="tags">Tags</label>
        <Select
          id="tags"
          name="tags"
          isMulti
          options={tagsOptions}
          value={tagsOptions.filter((tag) => recipe.tags.includes(tag.value))}
          onChange={handleTagsChange}
        />
        <button type="submit">Υποβολή</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
