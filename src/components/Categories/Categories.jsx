// Categories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ handleCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubcategories, setShowSubcategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories/?include=subcategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = (index) => {
    setShowSubcategories(index);
  };

  const handleMouseLeave = () => {
    setShowSubcategories(null);
  };

  return (
    <div className="categories-container" onMouseLeave={handleMouseLeave}>
      <div className="categories-dropdown">
        {loading ? (
          <div>Loading categories...</div>
        ) : (
          <ul>
            {categories.map((category, index) => (
              <li
                key={category.category._id}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <span style={{ display: 'block' }}>{category.category.name}</span>
                {showSubcategories === index && category.subcategories && category.subcategories.length > 0 && (
                  <ul>
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory._id} onClick={() => handleCategoryClick(subcategory)}>
                        <span style={{ display: 'block' }}>{subcategory.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;