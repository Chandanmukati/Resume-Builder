// ============================================
// HEADER COMPONENT
// Navigation bar with app branding
// ============================================

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRobot, FaFileAlt, FaPalette, FaSun, FaMoon } from 'react-icons/fa';

function Header({ theme, toggleTheme }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FaRobot className="logo-icon" />
          <span>AI Resume Builder</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/builder" className={isActive('/builder')}>
            <FaFileAlt /> Builder
          </Link>
          <Link to="/templates" className={isActive('/templates')}>
            <FaPalette /> Templates
          </Link>
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;