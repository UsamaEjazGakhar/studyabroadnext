import React from "react";

const CTA: React.FC = () => {
  return (
    <section className="sec-cta">
      <div className="cta-dec" />
      <div className="container">
        <div className="cta-inner reveal">
          <h2>
            Ready to <span>Transform</span> Your Future?
          </h2>
          <p>
            Join thousands of successful students studying at world‑class universities. Get your free consultation today — no commitment required.
          </p>
          <div className="cta-btns">
            <a href="#consultation" className="btn btn-primary btn-lg">
              <i className="fas fa-rocket" /> Get Free Consultation
            </a>
            <a href="https://wa.me/923001234567" className="btn btn-ghost btn-lg">
              <i className="fab fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
