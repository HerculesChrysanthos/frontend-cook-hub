import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import RecipeByID from "../components/RecipeByID/RecipeByID";

const RecipeByIDPage = () => {
  return (
    <div>
        <Header />
        <RecipeByID />
        <Footer />
    </div>
  );
};

export default RecipeByIDPage;