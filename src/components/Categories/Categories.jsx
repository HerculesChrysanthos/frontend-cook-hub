// Categories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ handleCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <div className="categories-dropdown">
        {loading ? (
          <div>Loading categories...</div>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category.id} onClick={() => handleCategoryClick(category)}>
                <span style={{ display: 'block' }}>{category.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );  
};

export default Categories;