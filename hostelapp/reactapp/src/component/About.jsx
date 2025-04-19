import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About <span className="highlight">SmartHostel</span></h1>
        <p>Your digital companion for seamless hostel management.</p>
      </section>

      <section className="about-content">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            At SmartHostel, our goal is to simplify hostel life by integrating smart
            technology. From managing schedules and tracking lectures to sending reminders
            and visualizing progress — we empower students to stay organized, focused, and stress-free.
          </p>
        </div>

        <div className="team">
          <h2>Meet Our Team</h2>
          <div className="team-cards">
            <div className="card">
              <div className="avatar">👩‍💻</div>
              <h3>Priya Sharma</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="card">
              <div className="avatar">🧠</div>
              <h3>Rahul Mehta</h3>
              <p>AI/Backend Developer</p>
            </div>
            <div className="card">
              <div className="avatar">🎨</div>
              <h3>Simran Kaur</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
