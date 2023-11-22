// Header.js
import React from 'react';
import logoImage from '../../images/Group 2.svg';


const Header = () => {
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
          <li className="magnify"><a href="/search">Search</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/Register">Register</a></li>
        </ul>   
      </nav>
    </header>
  );
};

export default Header;
