import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    imageUrl: '',
    preparationTime: 1,
    cookingTime: 1,
    servings: 1,
    category: '',
    subcategory: '',
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);

  useEffect(() => {
    // Retrieve categories from local storage on component mount
    const storedCategories = localStorage.getItem('categories');

    console.log('storedCategories', storedCategories);
    if (storedCategories) {
      // Parse the stored JSON data
      const parsedCategories = JSON.parse(storedCategories);
      console.log('parsedCategories', parsedCategories);
      setCategories(parsedCategories);
    }

    const storedTags = localStorage.getItem('tags');
    if (storedTags) {
      // Parse the stored JSON data
      const parsedTags = JSON.parse(storedTags);
      setTags(parsedTags);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

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
    console.log('selectedCategory', selectedCategory);
    const selectedSubcategories = selectedCategory
      ? selectedCategory.subcategories
      : [];

    console.log('selectedSubcategories', selectedSubcategories);

    setRecipe({
      ...recipe,
      category: selectedCategory._id,
      subcategory: '',
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

    setRecipe({ ...recipe, subcategory: selectedSubcategory._id });
    console.log('selectedSubcategory', selectedSubcategory);
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    if (
      recipe.ingredients.length &&
      recipe.ingredients[recipe.ingredients.length - 1] !== ''
    ) {
      const ingredients = [...recipe.ingredients, ''];
      console.log(ingredients);
      setRecipe({ ...recipe, ingredients });
    }
  };

  const handleRemoveLastIngredient = () => {
    if (recipe.ingredients.length > 1) {
      recipe.ingredients.pop();
      setRecipe({ ...recipe, ingredients: recipe.ingredients });
    }
  };

  const handleImageChange = (event) => {
    const { files } = event.target;
    setRecipe({ ...recipe, imageUrl: files[0] });
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    const shouldProceed = window.confirm(
      'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην ενέργεια;'
    );
    if (shouldProceed) {
      event.preventDefault();
      try {
        const formData = new FormData();
        Object.entries(recipe).forEach(([key, value]) => {
          if (key === 'imageUrl') {
            //to add imageurl logic
            // { isUpdate && (formData)}
            formData.append('image', value);
          } else if (key === 'tags') {
            recipe.tags.forEach((tagId, index) => {
              formData.append(`tags[${index}]`, tagId);
            });
          } else if (key === 'ingredients') {
            recipe.ingredients.forEach((ingredient, index) => {
              formData.append(`ingredients[${index}]`, ingredient);
            });
          } else {
            formData.append(key, value);
          }
        });

        await axios.post('/api/recipes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Recipe Created');

        // After successful request, navigate to the desired page
        navigate('/recipes/my-recipes');
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='create-recipe'>
      <h2> Δημιουργία Συνταγής</h2>
      <form onSubmit={handleSubmit} className='recipe-form'>
        <label htmlFor='title'>Όνομα Συνταγής</label>
        <input
          type='text'
          id='title'
          name='title'
          value={recipe.title}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='description'>Περιγραφή</label>
        <textarea
          id='description'
          name='description'
          value={recipe.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <label htmlFor='ingredients'>Συστατικά</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type='text'
            name='ingredients'
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type='button' onClick={handleAddIngredient}>
          Προσθήκη Συστατικού
        </button>
        <button type='button' onClick={handleRemoveLastIngredient}>
          Αφαίρεση τελευταίου Συστατικού
        </button>
        <label htmlFor='instructions'>Οδηγίες</label>
        <textarea
          id='instructions'
          name='instructions'
          value={recipe.instructions}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor='image'>Προσθήκη Εικόνας </label>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/jpeg, image/png'
          onChange={handleImageChange}
          required
        />
        <label htmlFor='preparationTime'>Χρόνος Προετοιμασίας (λεπτά)</label>
        <input
          type='number'
          id='preparationTime'
          name='preparationTime'
          value={recipe.preparationTime}
          onChange={handleInputChange}
          min='1'
          required
        />
        <label htmlFor='cookingTime'>Χρόνος Μαγειρέματος (λεπτά)</label>
        <input
          type='number'
          id='cookingTime'
          name='cookingTime'
          value={recipe.cookingTime}
          onChange={handleInputChange}
          min='1'
          required
        />

        <label htmlFor='servings'>Μερίδες</label>
        <input
          type='number'
          id='servings'
          name='servings'
          value={recipe.servings}
          onChange={handleInputChange}
          min='1'
          required
        />
        <label htmlFor='category'>Κατηγορία</label>
        <select
          id='category'
          name='category'
          // value={recipe.category}
          onChange={handleCategoryChange}
          required
        >
          <option value=''>Διάλεξε Κατηγορία</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor='subcategory'>Υποκατηγορία</label>
        <select
          id='subcategory'
          name='subcategory'
          // value={recipe.subcategory}
          onChange={handleSubcategoryChange}
        >
          <option value=''>Διάλεξε Υποκατηγορία</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
        <label htmlFor='tags'>Tags</label>
        <Select
          id='tags'
          name='tags'
          isMulti
          options={tagsOptions}
          value={tagsOptions.filter((tag) => recipe.tags.includes(tag.value))}
          onChange={handleTagsChange}
          required
        />
        <button type='submit' disabled={isLoading}>
          {isLoading ? (
            <div className='flex-inline'>
              Γίνεται υποβολή
              <div className='loader'></div>
            </div>
          ) : (
            'Υποβολή'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
