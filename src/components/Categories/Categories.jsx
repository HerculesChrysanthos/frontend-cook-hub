// Categories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ handleCategoryClick: onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Always fetch categories from the API
        const response = await axios.get("/api/categories/?include=subcategories");
        setCategories(response.data);
        // Update localStorage with the fetched categories
        localStorage.setItem("categories", JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    // Clear localStorage when the component mounts
    localStorage.removeItem("categories");

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Notify the parent component about the selected category
    onCategoryClick(category);
  };

  const handleSubcategoryClick = (subcategory) => {
    // Notify the parent component about the selected subcategory
    onCategoryClick(subcategory);
  };

  return (
    <div className="categories-container">
      <div className="categories-dropdown">
        {loading ? (
          <div>Loading categories...</div>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category.category._id}>
                <span
                  style={{ display: "block" }}
                  onClick={() => handleCategoryClick(category.category)}
                >
                  {category.category.name}
                </span>
                {selectedCategory === category.category && category.subcategories && category.subcategories.length > 0 && (
                  <ul>
                    {category.subcategories.map((subcategory) => (
                      <li
                        key={subcategory._id}
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        <span style={{ display: "block" }}>
                          {subcategory.name}
                        </span>
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