import React from 'react';
import '../assets/style.css'; // Include your CSS file here

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Online Academy</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="cta">
          <a href="#signup" className="btn-signup">Sign Up</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
