import React from 'react';
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom"; //best practice to use this component instead of link tag
import ReorderIcon from '../ReorderIcon/ReorderIcon'; 
import "../../styles/Navbar.css";

function Navbar() {
  return (
    <div className='navbar'>
      <div className='leftSide'>
          <img src={Logo} />
          <Link to='/Login'> Login </Link>
          <Link to='/Register'> Register </Link>
      </div>
      <div className='rightSide'>
        <Link to='/'> Home </Link>
        <Link to="/menu"> Recipes </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <button>
          <ReorderIcon />
        </button>
        </div>
    </div>
  )
}

export default Navbar;

