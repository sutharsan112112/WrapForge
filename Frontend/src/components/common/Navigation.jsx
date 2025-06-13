// Navigation.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '/src/components/css/Navigation.css'; // Import your CSS file for styling

const Navigation = () => {
    return (
        <nav className="main-navigation">
            <div className="logo">
                <Link to="/">WrapForge</Link> {/* Link to your home page */}
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/about" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/services" activeClassName="active">Vehicle</NavLink>
                </li>
                <li>
                    <NavLink to="/products" activeClassName="active">Gallery</NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active">About us</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;