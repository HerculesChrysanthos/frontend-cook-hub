import React from 'react';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import card_image from '../images/image.jpg';
import Card from '../components/Card/Card'; // Import your Card component


const MainPage = () => {
  return (
    <div>
      <Header />
      <ImageSlider />
       {/* Card Columns Wrapper */}
       <div className="card-columns-wrapper">
            <Card
              title="Example Title"
              description="This is an example description."
              card_image={card_image}
            />
        </div>
    </div>     
  );
};

export default MainPage;