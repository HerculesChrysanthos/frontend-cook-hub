// CategoryNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ReorderIcon from '../ReorderIcon/ReorderIcon'; 
import '../../styles/CategoryNavbar.css'; 

function CategoryNavbar() {
  return (
    <div className='cat-navbar'>
      {/* Include the categories apo ekfonisi */}
      <Link to='/category1'>Italian</Link>
      <Link to='/category2'>Vegeterian</Link>
      <Link to='/category2'>Greek</Link>
      <Link to='/category2'>Fusion</Link>
      <Link to='/category2'>Category 4</Link>
      <Link to='/category2'>Category 4</Link>
      <button>
        <ReorderIcon />
      </button>
    </div>
  );
}

export default CategoryNavbar;
