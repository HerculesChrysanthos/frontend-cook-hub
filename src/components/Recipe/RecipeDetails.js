import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'; // Assuming you're using React Router

const RecipeDetails = () => {
  // Step 1: Get recipe id from urlParams
  const { recipeId } = useParams();

  // Step 2: Use useEffect to capture data
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  use API endpoint to fetch recipe data
        const response =  await axios.get("/api/recipes/${recipeId}");
        const data = response.data; // No need for response.json() with axios


        console.log(data)

        // Step 2. When data is fetched, store them in a useState hook
        setRecipeData(data);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchData();
  }, [recipeId]);

  // Step 3: Render the recipe
  return (
    <div>
      {recipeData ? (
        <div>
          <h2>{recipeData.title}</h2>
          <p>{recipeData.description}</p>
          {/* Add more elements to display other recipe details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
