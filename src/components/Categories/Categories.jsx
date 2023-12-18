// Categories.jsx
import React, { useState } from 'react';

const Categories = ({ data }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
