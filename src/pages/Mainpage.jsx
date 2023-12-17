import React from "react";
import Header from "../components/Header/Header";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Footer from "../components/Footer/Footer";
import RecipeListPage from "../components/Recipe/RecipeList";

const MainPage = () => {
  return (
    <div>
      <Header />
      <ImageSlider />
      <RecipeListPage />
      <Footer />
    </div>
  );
};

export default MainPage;
