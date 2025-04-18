import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about who we are</p>
      </div>
      <div className="about-content">
        <p>
          We are a group of passionate <strong>Computer Science Engineering</strong> students from <strong>ABES Engineering College, Ghaziabad</strong>, currently in our <strong>third year</strong>.
        </p>
        <p>
          This Hostel Management System is a reflection of our dedication towards building efficient and real-world web applications using modern technologies like <strong>React</strong> and <strong>Node.js</strong>.
        </p>
        <p>
          We aim to simplify the management of hostel operations while delivering a user-friendly and responsive experience.
        </p>
        <p>
          Thank you for visiting!
        </p>
      </div>
    </div>
  );
}

export default About;
