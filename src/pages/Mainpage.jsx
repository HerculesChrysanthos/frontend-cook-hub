import React from 'react';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import Footer from '../components/Footer/Footer';
import RecipeListPage from '../components/Recipe/RecipeList'; 


const MainPage = () => {
  return (
    <div>
      {/* <SubHeader /> */}
      <ImageSlider />
      <RecipeListPage />
       {/* Card Columns Wrapper */}
       {/* <div className="card-columns-wrapper">
            <Card
              title="Example Title"
              description="This is an example description."
              card_image={card_image}
            />
        </div> */}
    </div>     
  );
};

export default MainPage;