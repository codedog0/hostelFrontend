import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Hostel Allocation
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link to="/" className={styles.nav_link}>Home</Link>
          <Link to="/dashboard" className={styles.nav_link}>Dashboard</Link>
          <Link to="/profile" className={styles.nav_link}>Profile</Link>
        </div>

        {/* Mobile Navigation */}
        <div className={styles.mobileNav}>
          {/* Hamburger Button */}
          <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={styles.menuDropdown}>
              <Link to="/" className={styles.dropdownLink} onClick={toggleMenu}>Home</Link>
              <Link to="/dashboard" className={styles.dropdownLink} onClick={toggleMenu}>Dashboard</Link>
              <Link to="/profile" className={styles.dropdownLink} onClick={toggleMenu}>Profile</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;