// Header.js
import React from 'react';
import logoImage from '../../images/Group 2.svg';
import '@fortawesome/fontawesome-free/css/all.css';

const Header = () => {
  const handleSearch = () => {
    // Implement your search logic here
    // For example, you can log a message for demonstration purposes
    console.log('Search button clicked!');
  };
  return (
    <header>
       <div className="logo-container">
          <img src={logoImage} alt="Logo" />
        </div>
      <nav>
        <ul className="header-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/">Recipes</a></li>
          <li><a href="/">Category</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/Register">Register</a></li>
        </ul> 
        <br/>  
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <span className="magnify" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;