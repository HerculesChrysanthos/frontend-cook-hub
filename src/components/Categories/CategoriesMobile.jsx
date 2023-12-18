// Categories.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const CategoriesMobile = ({ data }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="categories-container">
      {data.map((category) => (
        <div
          key={category._id}
          className="category-item"
          onClick={() => navigate(`/recipesbyid/${category._id}`)}
        >
          {category.name}
          {category.subcategories.length > 0 && (
            <span
              className="show-sub-category"
              onClick={() => setHoveredCategory(category)}
            >
              <MdKeyboardArrowDown />
            </span>
          )}
          {hoveredCategory === category &&
            category.subcategories.length > 0 && (
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

export default CategoriesMobile;
