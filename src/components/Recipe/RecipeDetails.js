import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const RecipeDetails = () => {
  const { recipeId } = useParams();

  console.log(recipeId);

  // retrieve userObject stored in login
  const { userObject } = useAuth();
  // retrieve token from local storage
  const token = localStorage.getItem("token");

  const [recipeData, setRecipeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const data = response.data;

        console.log(data);

        setRecipeData(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Recipe not found
          setErrorMessage("Δεν υπάρχει συνταγ.");
        } else {
          console.error("Error fetching recipe data:", error);
        }
      }
    };

    fetchData();
  }, [recipeId]);

  // const handleLike = () => {
  //   // You can implement logic here to update the likes on the server as well.
  //   setLikes(likes + 1);
  // };

  const handleEdit = async () => {
    console.log("userObject.id", userObject.id);
    console.log("recipeData.user._id.id", recipeData.user._id);
    if (userObject.id === recipeData.user._id) {
      const shouldDelete = window.confirm(
        "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν τη συνταγή;"
      );
      if (shouldDelete) {
        try {
          await axios.delete(`/api/recipes/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Redirect to a different page or perform any other action after deletion
          navigate("/recipes");
        } catch (error) {
          console.error("Error deleting recipe:", error);
          // 
        }
      }
    }
  };

  const handleDelete = async () => {
    console.log("userObject.id", userObject.id);
    console.log("recipeData.user._id.id", recipeData.user._id);
    if (userObject.id === recipeData.user._id) {
      const shouldDelete = window.confirm(
        "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν τη συνταγή;"
      );
      if (shouldDelete) {
        try {
          await axios.delete(`/api/recipes/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Redirect to a different page or perform any other action after deletion
          navigate("/recipes/my-recipes");
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // Recipe not found
            setErrorMessage("Δεν υπάρχει συνταγή.");
          } else {
            console.error("Error fetching recipe data:", error);
          }
        }
      }
    }
  };

  return (
    <div className="recipe-container">
      {recipeData ? (
        <div className="recipe-details">
          <h2>{recipeData.title}</h2>
          <p>{recipeData.description}</p>
          <img
            src={recipeData.mainImage}
            alt={recipeData.title}
            className="recipe-image"
          />
          <div>
            {/* <button onClick={handleLike}>Like</button>
            <span>{likes} Likes</span> */}
            {userObject.id === recipeData.user._id && (
              <>
                <button onClick={handleEdit}>Επεξεργασία</button>
                <button onClick={handleDelete}>Διαγραφή</button>
              </>
            )}
          </div>
          <p>Χρόνος προετοιμασίας: {recipeData.preparationTime} minutes</p>
          <p>Χρόνος μαγειρέματος: {recipeData.cookingTime} minutes</p>
          <p>Μερίδες: {recipeData.servings}</p>
          <h3>Συστατικά:</h3>
          <ul>
            {recipeData.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Εκτέλεση:</h3>
          <p>{recipeData.instructions}</p>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default RecipeDetails;
