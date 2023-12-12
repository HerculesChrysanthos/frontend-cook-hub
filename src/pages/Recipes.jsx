import React from "react";
import Header from "../components/Header/Header";
import RecipeListPage from "../components/Recipe/RecipeList";
import Pagination from "../components/Pagination/Pagination";

const RecipesPage = () => {
  return (
    <div>
        <Header />
        <RecipeListPage />
        <Pagination />
    </div>
  );
};

export default RecipesPage;