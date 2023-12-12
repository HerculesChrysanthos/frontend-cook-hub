import React, { useState, useEffect } from 'react';
import Header from "../components/Header/Header"; 
import RecipeDetails from '../components/Recipe/RecipeDetails'; 
import Footer from "../components/Footer/Footer";

const RecipeDetailPage = () => {
  return (
    <div>
      <Header />
        <RecipeDetails  />
        <Footer />
    </div>
  );
};

export default RecipeDetailPage;
