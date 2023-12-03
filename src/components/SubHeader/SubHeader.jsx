// SearchNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function SearchNavbar() {
  const handleSearch = () => {
    // Implement your search logic here
    // For example, you can log a message for demonstration purposes
    console.log('Search button clicked!');
  };
  return (
    <div className="search-container">
    <input type="text" placeholder="Search..." />
    <span className="magnify" onClick={handleSearch}>
      <i className="fas fa-search"></i>
    </span>
  </div>

  );
}

export default SearchNavbar;
