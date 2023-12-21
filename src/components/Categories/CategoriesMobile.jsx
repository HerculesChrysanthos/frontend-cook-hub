// Categories.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

const CategoriesMobile = ({ data, setOpenMenu }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  return (
    <div className='categories-container categories-mobile'>
      {data.map((category) => (
        <div key={category._id} className='category-item'>
          <span
            onClick={() =>
              setOpenMenu((prevState) => !prevState) &
              navigate(`/recipes/${category._id}`)
            }
          >
            {category.name}
          </span>
          {category.subcategories.length > 0 && (
            <span
              className='show-sub-category'
              onClick={() => setHoveredCategory(category)}
            >
              <MdKeyboardArrowDown />
            </span>
          )}
          {hoveredCategory === category &&
            category.subcategories.length > 0 && (
              <div className='subcategories-menu'>
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory._id}
                    className='subcategory-item'
                    onClick={() =>
                      setOpenMenu((prevState) => !prevState) &
                      navigate(`/recipesub/${subcategory._id}`)
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

export default CategoriesMobile;
