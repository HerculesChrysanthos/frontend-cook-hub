// Card.jsx
import React, { useState } from 'react';

const Card = ({ card_image, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
        <img src={card_image} className="card-img-top" alt="Card" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {/* Add any additional content or features as needed */}
      </div>
    </div>
  );
};

export default Card;
