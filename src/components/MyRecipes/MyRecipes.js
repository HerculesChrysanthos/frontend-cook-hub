import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import RecipeCard from "../RecipeCard/RecipeCard";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Function to fetch recipes with pagination
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`api/recipes/my-recipes`, headers);
        const { data, totalPages } = response.data;
        setRecipes(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="recipes-container">
      <h2>Οι συνταγές μου</h2>
    <div className="recipes-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
    </div>
  );

//   return (
//     <div>
//       <h2>Οι συνταγές μου</h2>
//       {recipes.map((recipe) => (
//         <div key={recipe.id}>
//           {/* Display recipe details */}
//           <p>{recipe.name}</p>
//           <p>{recipe.description}</p>
//           {/* Add more details as needed */}
//         </div>
//       ))}
//       <div>
//         {/* Pagination component */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
};

export default MyRecipes;
