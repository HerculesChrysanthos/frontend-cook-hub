// Tag.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [hoveredTag, setHoveredTag] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags'); // Replace with your actual API endpoint
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagHover = (tag) => {
    setHoveredTag(tag);
  };

  const handleHoverLeave = () => {
    setHoveredTag(null);
  };

  return (
    <div className='categories-container' onMouseLeave={handleHoverLeave}>
      {tags.map((tag) => (
        <li
          className='category-item'
          key={tag._id}
          onMouseEnter={() => handleTagHover(tag)}
          onClick={() => navigate(`/recipestagId/${tag._id}`)}
        >
          {tag.name}
        </li>
      ))}
    </div>
  );
};

export default Tag;
