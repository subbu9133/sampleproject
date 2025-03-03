import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">POS System</h1>
      
      <div className="nav-links">
        <Link to="/Home" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/sales" className="nav-link">Sales</Link>
        <Link to="/products/add" className="nav-link">Add Products</Link>
        <Link to="/sales/record" className="nav-link">Record New Sale</Link>
      </div>
    </nav>
  );
};

export default Navbar;
