import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component
import RecipeDetails from './RecipeDetails'; // Create a RecipeDetails component for displaying recipe details

const RecipePage = () => {
  return (
    <div>
      <Header />
        <RecipeDetails  />
        <Footer />
    </div>
  );
};

export default RecipePage;
