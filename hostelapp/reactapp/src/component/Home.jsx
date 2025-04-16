import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSignInClick = () => {
    setShowPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <div>
      <h2 id="homeHeading">Home</h2>

      {/* Navigation Bar */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><button className="sign-in-button nav-signin" onClick={handleSignInClick}>Sign In</button></li>
        </ul>
      </nav>

      {/* Prompt Modal */}
      {showPrompt && (
        <div className="prompt">
          <div className="prompt-content">
            <h3>What would you like to do?</h3>
            <button onClick={() => { setShowPrompt(false); window.location.href = '/login'; }}>Login</button>
            <button onClick={() => { setShowPrompt(false); window.location.href = '/register'; }}>Register</button>
            <button onClick={handleClosePrompt}>Cancel</button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Home;
