import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import EditRecipe from './EditRecipe';

const RecipeDetails = () => {
  const { recipeId } = useParams();

  console.log(recipeId);
  const [isEditing, setIsEditing] = useState(false);

  // retrieve userObject stored in login
  const { userObject } = useAuth();
  // retrieve token from local storage
  const token = localStorage.getItem('token');

  const [recipeData, setRecipeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const data = response.data;

        setRecipeData(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Recipe not found
          setErrorMessage('Δεν υπάρχει συνταγ.');
        } else {
          console.error('Error fetching recipe data:', error);
        }
      }
    };

    fetchData();
  }, [recipeId]);

  console.log('recipe data', recipeData);

  const handleDelete = async () => {
    if (userObject.id === recipeData.user._id) {
      const shouldDelete = window.confirm(
        'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν τη συνταγή;'
      );
      if (shouldDelete) {
        try {
          await axios.delete(`/api/recipes/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Redirect to a different page or perform any other action after deletion
          navigate('/recipes');
        } catch (error) {
          console.error('Error deleting recipe:', error);
          //
        }
      }
    }
  };

  const handleUpdade = () => {
    setIsEditing(true);
  };

  return (
    <div className='recipe-container'>
      {isEditing ? (
        <EditRecipe isUpdate={isEditing} editedRecipe={recipeData} />
      ) : (
        <>
          {recipeData ? (
            <div className='recipe-details'>
              <h2>{recipeData?.title}</h2>
              <p>{recipeData?.description}</p>
              <img
                src={recipeData?.mainImage}
                alt={recipeData?.title}
                className='recipe-image'
              />
              <div>
                {userObject?.id === recipeData?.user._id && (
                  <>
                    <button onClick={handleUpdade}>Επεξεργασία</button>
                    <span style={{ margin: '0 1px' }}></span>
                    <button onClick={handleDelete}>Διαγραφή</button>
                  </>
                )}
              </div>
              <p>Χρόνος προετοιμασίας: {recipeData?.preparationTime} minutes</p>
              <p>Χρόνος μαγειρέματος: {recipeData?.cookingTime} minutes</p>
              <p>Μερίδες: {recipeData?.servings}</p>
              <h3>Συστατικά:</h3>
              <ul>
                {recipeData?.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Εκτέλεση:</h3>
              <p>{recipeData?.instructions}</p>
              <div className='cats-frame'>
                <div className='category'>
                  <div className='label'>{recipeData?.category.name}</div>
                </div>
                <div className='subcategory'>
                  <div className='label'>{recipeData?.subcategory.name}</div>
                </div>
              </div>
              <ul class='tag-list'>
                {recipeData?.tags?.map(({ name }, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{errorMessage}</p>
          )}
        </>
      )}
    </div>
  );
};
export default RecipeDetails;
