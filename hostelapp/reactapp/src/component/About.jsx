import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">SmartHostel</div>

        {/* Hamburger icon (mobile) */}
        <div className={`hamburger`}>
          <span />
          <span />
          <span />
        </div>

        {/* Nav links */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/features" className="nav-link">Features</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h1 className="about-title">About SmartHostel</h1>
        <p className="about-intro">
          SmartHostel is designed to streamline hostel management, making it easier
          for administrators and students to manage daily activities and information.
        </p>

        <div className="about-content">
          <div className="about-card">
            <h2>🎯 Our Mission</h2>
            <p>
              Our mission is to provide a seamless, efficient, and transparent solution for hostel management.
              We aim to simplify tasks like room allocation, fee management, and communication.
            </p>
          </div>

          <div className="about-card">
            <h2>💡 What We Offer</h2>
            <ul>
              <li>🛏️ Smart Room & Bed Allocation</li>
              <li>📋 Digital Attendance & Leave Management</li>
              <li>💬 Real-time Communication</li>
              <li>💰 Automated Fee Tracking</li>
              <li>🧾 Visitor Logs & Complaints</li>
              <li>📊 Admin Analytics Dashboard</li>
            </ul>
          </div>
        </div>

        <div className="about-highlight">
          <h2>🚀 Why Choose SmartHostel?</h2>
          <div className="about-benefits">
            <div className="about-benefit">
              <h3>✨ Easy-to-Use</h3>
              <p>Minimal design, optimized for effortless navigation and task management.</p>
            </div>
            <div className="about-benefit">
              <h3>🔐 Secure & Scalable</h3>
              <p>Built with high security and scalable features to adapt to your needs.</p>
            </div>
            <div className="about-benefit">
              <h3>⚙️ Customizable</h3>
              <p>Fully adaptable to your hostel’s specific policies and processes.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta">
          <h2>Start Managing Your Hostel Smartly!</h2>
          <p>Join SmartHostel today and transform your hostel management experience.</p>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
