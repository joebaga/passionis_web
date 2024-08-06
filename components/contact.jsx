// pages/contact.jsx

import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <h2>Business Name</h2>
        <p>123 Business St.</p>
        <p>City, State, ZIP</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@business.com</p>
      </div>
      <div className="location">
        <h2>Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.7180801236985!2d-122.0842493846915!3d37.42206597982543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb0a75d8d21db%3A0x95b1d9cbfa41bb6!2sGoogleplex!5e0!3m2!1sen!2sus!4v1620924468062!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
