import React from "react";

const WhyUs: React.FC = () => {
  return (
    <section id="why" className="sec-why">
      <div className="why-bg-dec" />
      <div className="container">
        <div className="why-grid">
          {/* Left content */}
          <div className="why-content">
            <div className="sec-label">Why Choose Us</div>
            <h2 className="sec-title">Industry Leaders in Education Abroad</h2>
            <p className="sec-desc" style={{ color: "rgba(255,255,255,0.6)" }}>
              Recognized by partner universities worldwide with a proven track record of
              student success spanning 15+ years.
            </p>
            <div className="why-list">
              {/* Expert Consultants */}
              <div className="why-item">
                <div className="why-dot wd-teal">🏆</div>
                <div className="why-item-text">
                  <h4>Expert Consultants</h4>
                  <p>15+ years helping students achieve international education goals with personalized guidance.</p>
                </div>
              </div>
              {/* 500+ University Partners */}
              <div className="why-item">
                <div className="why-dot wd-gold">🌍</div>
                <div className="why-item-text">
                  <h4>500+ University Partners</h4>
                  <p>Exclusive partnerships across 50+ countries ensuring the best opportunities for every student.</p>
                </div>
              </div>
              {/* End-to-End Journey Support */}
              <div className="why-item">
                <div className="why-dot wd-orange">🚀</div>
                <div className="why-item-text">
                  <h4>End-to-End Journey Support</h4>
                  <p>From application to landing — visa, SOP, accommodation, and 24/7 WhatsApp support.</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <a href="#consultation" className="btn btn-teal">Start Your Journey</a>
            </div>
          </div>

          {/* Right visual (Achievement Card) */}
          <div className="why-visual">
            <div className="achieve-card">
              <div className="ac-top">
                <div className="ac-title">📊 Our Track Record</div>
                <div className="ac-badge">2024</div>
              </div>
              <div className="ac-metrics">
                <div className="acm">
                  <div className="acm-num">5K+</div>
                  <div className="acm-lbl">Students Placed</div>
                </div>
                <div className="acm">
                  <div className="acm-num" style={{ color: "var(--gold)" }}>98%</div>
                  <div className="acm-lbl">Visa Success</div>
                </div>
                <div className="acm">
                  <div className="acm-num" style={{ color: "var(--orange-light)" }}>500M</div>
                  <div className="acm-lbl">PKR Scholarships</div>
                </div>
                <div className="acm">
                  <div className="acm-num">25+</div>
                  <div className="acm-lbl">Countries</div>
                </div>
              </div>
              <div className="ac-bar-wrap">
                <div className="ac-bar-label">
                  <span>MBBS Placements</span><span>96%</span>
                </div>
                <div className="ac-bar">
                  <div className="ac-bar-fill abf-teal" style={{ width: "96%" }} />
                </div>
              </div>
              <div className="ac-bar-wrap">
                <div className="ac-bar-label">
                  <span>Scholarship Success</span><span>89%</span>
                </div>
                <div className="ac-bar">
                  <div className="ac-bar-fill abf-gold" style={{ width: "89%" }} />
                </div>
              </div>
              <div className="ac-bar-wrap">
                <div className="ac-bar-label">
                  <span>Visa Approvals</span><span>98%</span>
                </div>
                <div className="ac-bar">
                  <div className="ac-bar-fill abf-teal" style={{ width: "98%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
