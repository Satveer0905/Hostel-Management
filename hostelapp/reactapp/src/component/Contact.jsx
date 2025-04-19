import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      {/* Contact Info Section */}
      <section className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Reach out to us with any queries or feedback.</p>
      </section>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message" rows="6" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Company Info */}
        <div className="company-info">
          <h2>SmartHostel</h2>
          <p><strong>Address:</strong><br /> ABES Engineering Collge ,Ghaziabad, India</p>
          <p><strong>Email:</strong><br /> contact@smarthostel.com</p>
          <p><strong>Phone:</strong><br /> +91 212312312312312</p>
        </div>
      </div>

      {/* Map or Image Section */}
      <div className="map-section">
        <iframe
          title="SmartHostel Location"
          src="https://www.google.com/maps/place/ABES+Engineering+College/@28.6340537,77.4455928,17z/data=!3m1!4b1!4m6!3m5!1s0x390cee22c60837b7:0x7c35343eceb7bde0!8m2!3d28.6340537!4d77.4455928!16s%2Fm%2F0jk_wyv?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
