import React, { useState, useEffect } from 'react';

const Tag = () => {
  const [tags, setTags] = useState([]);

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

  return (
    <div>
      <label htmlFor="tagList"></label>
      <ul id="tagList">
        {tags.map((tag) => (
          <li key={tag._id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
