import React from "react";

const Footer: React.FC = () => {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">StudyVerse</div>
            <p>Your trusted partner for international education. We help students achieve their dreams of studying at world-class universities with comprehensive support and guaranteed results.</p>
            <div className="social-row">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#programs">Programs</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#success">Success Stories</a></li>
              <li><a href="#consultation">Get Consultation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              <li><a href="#mbbs">MBBS Abroad</a></li>
              <li><a href="#bds">BDS Abroad</a></li>
              <li><a href="#phd">PhD in China</a></li>
              <li><a href="#">Scholarship Database</a></li>
              <li><a href="#">Study Destinations</a></li>
            </ul>
          </div>
          <div className="footer-col footer-contact">
            <h4>Contact Info</h4>
            <p><i className="fas fa-map-marker-alt"></i> Rawalpindi, Punjab, Pakistan</p>
            <p><i className="fas fa-phone"></i> +92-300-XXXXXXX</p>
            <p><i className="fas fa-envelope"></i> info@studyverse.com</p>
            <p><i className="fab fa-whatsapp"></i> WhatsApp Support — Available 24/7</p>
            <a href="#consultation" className="btn btn-primary btn-sm" style={{marginTop: "1rem"}}>Book Free Call</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 StudyVerse. All rights reserved.</p>
          <p><a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms of Service</a> &nbsp;|&nbsp; <a href="#">Cookies Policy</a></p>
        </div>
      </div>
      
      {/* Floating WhatsApp */}
      <a href="https://wa.me/923331165573?text=Hi%20StudyVerse!%20I%20want%20to%20inquire%20about%20your%20services" className="wa-btn" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }}>
          <img src="/whatsapp-icon-free-png.webp" alt="WhatsApp" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
      </a>
    </footer>
  );
};

export default Footer;
