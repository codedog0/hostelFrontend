import { useState } from 'react';
import './App.css';
import LoginForm from './pages/LoginForm.tsx';
import Leaderboards from './pages/Leaderboards.tsx';
import { Route, Routes, Link } from 'react-router';
import Dashboard from './pages/DashBoard.tsx';
import styles from './components/Navbar.module.css';
import Landingpage from './pages/LandingPage.tsx';
import Logout from './pages/Logout.tsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            Hostel Portal
          </Link>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
          <ul className={`${styles.nav_list} ${isMenuOpen ? styles.show : ''}`}>
            <li><Link to="/Leaderboards" className={styles.nav_link}>Allotment Status</Link></li>
            <li><Link to="/login" className={styles.nav_link}>Login</Link></li>
            <li><Link to="/dashboard" className={styles.nav_link}>Dashboard</Link></li>
            <li><Link to="/Logout" className={styles.nav_link}>Logout</Link></li>
          </ul>
        </div>
      </nav>
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookRoom" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Leaderboards" element={<Leaderboards />} />
        </Routes>
      </div>
    </>
  );
}

export default App;