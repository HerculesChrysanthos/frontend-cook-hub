import React from "react";
import Header from "../components/Header/Header";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import card_image from "../images/image.jpg";
import SubHeader from "../components/SubHeader/SubHeader";
import LoginHandling from "../components/Login/LoginHandling";

const MainPage = () => {
  return (
    <div>
      <Header />
      <LoginHandling />
    </div>
  );
};

export default MainPage;
