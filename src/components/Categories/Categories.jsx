// Categories.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = ({ data }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setHoveredSubcategory(null); // Reset hovered subcategory when hovering over a main category
  };

  const handleSubcategoryHover = (subcategory) => {
    setHoveredSubcategory(subcategory);
  };

  const handleHoverLeave = () => {
    setHoveredCategory(null);
    setHoveredSubcategory(null);
  };

  return (
    <div className="categories-container" onMouseLeave={handleHoverLeave}>
      {data.map((category) => (
        <div
          key={category._id}
          className="category-item"
          onMouseEnter={() => handleCategoryHover(category)}
        >
          <span onClick={() => navigate(`/recipes/${category._id}`)}>
            {category.name}
          </span>
          {(hoveredCategory === category || hoveredSubcategory) &&
            category.subcategories.length > 0 && (
              <div className="subcategories-menu">
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory._id}
                    className="subcategory-item"
                    onClick={() =>
                      navigate(`/recipes/${category._id}/${subcategory._id}`)
                    }
                    onMouseEnter={() => handleSubcategoryHover(subcategory)}
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
