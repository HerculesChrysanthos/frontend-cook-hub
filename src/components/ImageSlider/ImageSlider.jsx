import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_1 from "../../images/image_1.jpg";
import image from "../../images/image.jpg";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [image_1, image];

  // Custom styles for the slider container
  const sliderStyles = {
    width: '100%', // Set the desired width
    margin: 'auto', // Center the slider
  };

   // Custom styles for each slide (image)
   const slideStyles = {
    height: '70%', // Set the desired height
  };

  return (
    <div className="image-slider" style={sliderStyles}>
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} style={slideStyles}>
          <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '100%' }} />
        </div>
      ))}
    </Slider>
    </div>

  );
};

export default ImageSlider;
