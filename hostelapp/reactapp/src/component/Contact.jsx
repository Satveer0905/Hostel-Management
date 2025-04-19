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
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1124.1531263075795!2d77.44473091944387!3d28.633994393394515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee22c60837b7%3A0x7c35343eceb7bde0!2sABES%20Engineering%20College!5e0!3m2!1sen!2sin!4v1689658995340!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
      </div>
    </div>
  );
}

export default Contact;
