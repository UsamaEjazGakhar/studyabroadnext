import React from "react";

const TrustStrip: React.FC = () => {
  return (
    <div className="trust-strip">
      <div className="container">
        <div className="trust-strip-inner">
          <div className="tcard">
            <div className="tcard-icon ti-gold">🏆</div>
            <div className="tcard-text">
              <h4>15+ Years Experience</h4>
              <p>Trusted industry leaders</p>
            </div>
          </div>
          <div className="tcard">
            <div className="tcard-icon ti-teal">📝</div>
            <div className="tcard-text">
              <h4>100% Admission Success</h4>
              <p>Guaranteed support</p>
            </div>
          </div>
          <div className="tcard">
            <div className="tcard-icon ti-orange">💰</div>
            <div className="tcard-text">
              <h4>Max Scholarships</h4>
              <p>Millions secured</p>
            </div>
          </div>
          <div className="tcard">
            <div className="tcard-icon ti-navy">✈️</div>
            <div className="tcard-text">
              <h4>Complete Visa Support</h4>
              <p>End-to-end guidance</p>
            </div>
          </div>
          <div className="tcard">
            <div className="tcard-icon ti-teal">🌍</div>
            <div className="tcard-text">
              <h4>Global Network</h4>
              <p>500+ university partners</p>
            </div>
          </div>
          <div className="tcard">
            <div className="tcard-icon ti-gold">🎓</div>
            <div className="tcard-text">
              <h4>24/7 Student Support</h4>
              <p>Always here for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
