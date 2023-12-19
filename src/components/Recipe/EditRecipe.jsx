import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EditRecipe = ({ editedRecipe }) => {
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
    if (editedRecipe) {
      // Assuming that editedRecipe.data has the same structure as your recipe state
      setRecipe({
        user: editedRecipe.user._id || "",
        title: editedRecipe.title || "",
        description: editedRecipe.description || "",
        ingredients: editedRecipe.ingredients || [""],
        instructions: editedRecipe.instructions || "",
        imageUrl: editedRecipe.imageUrl || "",
        preparationTime: editedRecipe.preparationTime || 0,
        cookingTime: editedRecipe.cookingTime || 0,
        servings: editedRecipe.servings || 0,
        category: editedRecipe.category._id || "",
        subcategory: editedRecipe.subcategory._id || "",
        tags: editedRecipe.tags || [""],
      });
    }
  }, [editedRecipe]);

  console.log("editedRecipe in recipe update", editedRecipe);
  console.log("id in recipe update", editedRecipe._id);
  //   console.log("id in recipe update", editRecipe._id);
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

  const handleTagsChange = (selectedOptions) => {
    const selectedTagIds = selectedOptions.map((option) => option.value);
    setRecipe({ ...recipe, tags: selectedTagIds });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    const selectedCategory = categories.find((cat) => cat._id === value);
    console.log("selectedCategory", selectedCategory);
    const selectedSubcategories = selectedCategory
      ? selectedCategory.subcategories
      : [];

    console.log("selectedSubcategories", selectedSubcategories);

    setRecipe({
      ...recipe,
      category: selectedCategory._id,
      subcategory: "",
    });

    // allagi dunamika sti lista subcategories analoga me to category pou dialekse
    setSubcategories(selectedSubcategories);
  };

  const handleSubcategoryChange = (event) => {
    const { value } = event.target;
    //  Set the subcategory ID in the recipe state
    const selectedSubcategory = subcategories.find(
      (subcat) => subcat._id === value
    );
    // const subcategoryId = selectedSubcategory ? selectedSubcategory._id : "";
    setRecipe({ ...recipe, subcategory: selectedSubcategory._id });
    console.log("selectedSubcategory", selectedSubcategory);
  };

  const handleInputChange = (event) => {
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

  const handleDeleteImage = () => {
    delete recipe.previewImage;
    delete recipe.mainImage;
    console.log(recipe);
  };

  const handleImageChange = (event) => {
    const { files } = event.target;
    setRecipe({ ...recipe, imageUrl: files[0] });
  };

  const handleSubmit = async (event) => {
    const shouldProceed = window.confirm(
      "Είστε σίγουροι ότι θέλετε να προχωρήσετε στην ενέργεια;"
    );
    console.log("recipe234", recipe);
    if (shouldProceed) {
      console.log("recipe", recipe);
      event.preventDefault();
      try {
        const formData = new FormData();
        // Object.entries(recipe).forEach(([key, value]) => {
        //   if (key === "imageUrl") {
        //     //to add imageurl logic
        //     // { isUpdate && (formData)}
        //     formData.append("image", value);
        //   } else if (key === "tags") {
        //     recipe.tags.forEach((tagId, index) => {
        //       formData.append(`tags[${index}]`, tagId);
        //     });
        //   } else if (key === "ingredients") {
        //     recipe.ingredients.forEach((ingredient, index) => {
        //       formData.append(`ingredients[${index}]`, ingredient);
        //     });
        //   } else {
        //     formData.append(key, value);
        //   }
        // });

        Object.entries(recipe).forEach(([key, value]) => {
          if (key === "category" || key === "subcategory") {
            formData.append(key, value._id); // Assuming you want to append the _id property
          } else if (key === "imageUrl") {
            formData.append("image", value);
          } else if (key === "tags") {
            recipe.tags.forEach((tagId, index) => {
              formData.append("tags[]", tagId);
            });
          } else if (key === "ingredients") {
            recipe.ingredients.forEach((ingredient, index) => {
              formData.append("ingredients[]", ingredient);
            });
          } else {
            formData.append(key, value);
          }
        });

        console.log("formData", formData);

        // If it's an update, make a PUT request
        await axios.put(`/api/recipes/${recipe._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Recipe Updated");
        // After successful request, navigate to the desired page
        navigate("/recipes/my-recipes");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="create-recipe">
      <h2>Επεξεργασία συνταγής</h2>
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
        <label> Εικόνα </label>
        <div>
          <img
            src={recipe.previewImage}
            className="recipe-image"
            alt="Preview"
          />
          <button type="button" onClick={handleDeleteImage}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
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
          <option value="">{editedRecipe.category.name}</option>
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
          <option value="">{editedRecipe.subcategory.name}</option>
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
          // value={editedRecipe.tags.map((tag) => ({
          //   value: tag.name,
          //   label: tag.name,
          // }))}
          value={tagsOptions.filter((tag) => recipe.tags.includes(tag.value))}
          onChange={handleTagsChange}
        />
        <button type="submit">Υποβολή</button>
      </form>
    </div>
  );
};

export default EditRecipe;
