// Tag.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/tags");
        const tagsData = response.data;
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = (tagId) => {
    // Navigate to RecipeByTag with the selected tag ID
    navigate(`/recipebytag/${tagId}`);
  };

  return (
    <div className="tag-container">
      <div className="tag-list">
        {tags.map((tag) => (
          <div
            key={tag.id} // Add a unique key prop
            className="tag"
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;