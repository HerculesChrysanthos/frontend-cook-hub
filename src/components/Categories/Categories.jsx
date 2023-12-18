// Categories.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = ({ data }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Update the URL and navigate to the "/recipesbyid/" route
    navigate(`/recipesbyid/${category._id}`); //${category._id}
  };

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="categories-container">
      {data.map((category) => (
        <div
          key={category._id}
          className="category-item"
          onClick={() => handleCategoryClick(category)}
          onMouseEnter={() => handleCategoryHover(category)}
          onMouseLeave={handleCategoryLeave}
        >
          {category.name}
          {hoveredCategory === category && (
            <div className="subcategories-menu">
              {category.subcategories.map((subcategory) => (
                <div key={subcategory._id} className="subcategory-item">
                  {subcategory.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
