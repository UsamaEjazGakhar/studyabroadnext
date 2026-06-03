import React from "react";

const Header: React.FC = () => {
  return (
    <header id="header">
      <div className="navbar">
        <div className="logo">StudyVerse</div>
        <nav className="nav-links" id="nav-links">
          <a href="#home">Home</a>
          <a href="#programs">Programs</a>
          <a href="#services">Services</a>
          <a href="#why">Why Us</a>
          <a href="#success">Success Stories</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-cta">
          <a href="#consultation" className="btn btn-primary btn-sm">Apply Now</a>
          <button className="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
