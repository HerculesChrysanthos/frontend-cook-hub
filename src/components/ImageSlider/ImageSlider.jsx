import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image_1 from '../../images/image_1.jpg';
import image from '../../images/image.jpg';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const images = [image_1, image];

  // Custom styles for the slider container
  const sliderStyles = {
    width: '80%', // Adjust the desired width
    margin: 'auto',
    padding: '10px',
    border: '2px solid #ddd', // Add a border as a frame
    borderRadius: '10px', // Optional: Add border-radius for a rounded frame
    overflow: 'hidden', // Hide overflowing content (in this case, the rounded corners)
  };

  // Custom styles for each slide (image)
  const slideStyles = {
    height: '70%',
  };

  return (
    <div className='image-slider' style={sliderStyles}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ ...slideStyles, margin: '0 10px' }}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
