import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">SmartHostel</div>

        {/* Hamburger icon (mobile) */}
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>

        {/* Nav links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login/Register</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Welcome to <span className="highlight">SmartHostel</span>
        </h1>
        <h2 className="tagline">Your Digital Hostel Companion</h2>
        <p className="subtext">
          Manage your hostel life effortlessly—stay organized, informed, and connected.
        </p>
        <div className="buttons">
          <Link to="/features" className="btn explore">Explore Features</Link>
          <Link to="/login" className="btn login">Login to Get Started</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
