// Categories.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = ({ data }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className='categories-container'>
      {data.map((category) => (
        <div
          key={category._id}
          className='category-item'
          onMouseEnter={() => handleCategoryHover(category)}
          onMouseLeave={handleCategoryLeave}
        >
          <span onClick={() => navigate(`/recipes/${category._id}`)}>
            {category.name}
          </span>
          {hoveredCategory === category &&
            category.subcategories.length > 0 && (
              <div className='subcategories-menu'>
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory._id}
                    className='subcategory-item'
                    onClick={() =>
                      navigate(`/recipes/${category._id}/${subcategory._id}`)
                    }
                  >
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
