import React from "react";
import Header from "../components/Header/Header";
import CreateRecipe from "../components/Recipe/CreateRecipe";
import MyRecipes from "../components/MyRecipes/MyRecipes";
import Pagination from "../components/Pagination/Pagination";

const MyRecipesPage = () => {
  return (
    <div>
        <Header />
        <MyRecipes />
        <Pagination />
    </div>
  );
};

export default MyRecipesPage;