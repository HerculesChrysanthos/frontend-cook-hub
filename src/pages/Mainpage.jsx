import React from 'react';
import Header from '../components/Header/Header';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import card_image from '../images/image.jpg';
import SubHeader from '../components/SubHeader/SubHeader'; 
import Footer from '../components/Footer/Footer';


const MainPage = () => {
  return (
    <div>
      <Header />
      {/* <SubHeader /> */}
      <ImageSlider />
       {/* Card Columns Wrapper */}
       {/* <div className="card-columns-wrapper">
            <Card
              title="Example Title"
              description="This is an example description."
              card_image={card_image}
            />
        </div> */}
        <Footer />
    </div>     
  );
};

export default MainPage;