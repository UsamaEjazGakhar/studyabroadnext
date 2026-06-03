import React from "react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="sec-form">
      <div className="container">
        <div className="form-wrap reveal">
          <div className="form-header">
            <div className="form-header-text">
              <h2>Contact Us</h2>
              <p>We'd love to hear from you. Fill out the form and we'll get back to you shortly.</p>
            </div>
            <div className="form-header-badge">
              <div className="num">24/7</div>
              <div className="lbl">Support</div>
            </div>
          </div>
          {/* Reuse ConsultationForm fields for simplicity */}
          {/* This can be replaced with the full form implementation if needed */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
