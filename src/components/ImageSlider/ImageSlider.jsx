import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_1 from "../../images/image_1.jpg";
import image from "../../images/image.jpg";
import image_2 from "../../images/image_3avif.avif";

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
    maxHeight: '800px', // Set the desired maximum height
  };

   // Custom styles for each slide (image)
   const slideStyles = {
    height: '90%', // Set the desired height
  };

  return (
    <div style={sliderStyles}>
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