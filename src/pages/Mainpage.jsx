import React from 'react';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import card_image from '../images/image.jpg';
import card_image_2 from '../images/image_1.jpg';
import Card from '../components/Card/Card'; // Import your Card component


const MainPage = () => {
  return (
    <div>
      <Header />
      <ImageSlider />
      <br/>
      {/* Recipes Section Header */}
      <h2>Recipes</h2>
       {/* Card Columns Wrapper */}
       <div className="card-columns-wrapper">
            <Card
              title="Example Title"
              description="This is an example description."
              card_image={card_image}
            />
             <Card
              title="Example Title_2"
              description="This is an example description_2."
              card_image={card_image_2}
            />
        </div>
    </div>     
  );
};

export default MainPage;