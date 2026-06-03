import React from "react";

const Services: React.FC = () => {
  return (
    <section id="services" className="sec-services">
      <div className="container">
        <div className="sec-head center">
          <div className="sec-label">Our Services</div>
          <h2 className="sec-title">Complete Support for Your Success</h2>
          <p className="sec-desc">
            From application to arrival, we handle every detail of your international education journey.
          </p>
        </div>
        <div className="srv-grid">
          {/* Admission Processing */}
          <div className="srv-card">
            <div className="srv-icon si-1">📋</div>
            <h3>Admission Processing</h3>
            <p>
              Complete application management, document preparation, and university coordination for seamless admissions.
            </p>
          </div>
          {/* Scholarship Assistance */}
          <div className="srv-card">
            <div className="srv-icon si-2">💰</div>
            <h3>Scholarship Assistance</h3>
            <p>
              Identify and apply for scholarships matching your profile with maximum funding potential.
            </p>
          </div>
          {/* Visa Guidance */}
          <div className="srv-card">
            <div className="srv-icon si-3">🛂</div>
            <h3>Visa Guidance</h3>
            <p>
              Expert visa consultation, interview preparation, and complete documentation support for first-attempt approval.
            </p>
          </div>
          {/* SOP & Statement */}
          <div className="srv-card">
            <div className="srv-icon si-4">✍️</div>
            <h3>SOP &amp; Statement</h3>
            <p>
              Professionally written Statement of Purpose and Personal Statements that make you stand out.
            </p>
          </div>
          {/* Interview Preparation */}
          <div className="srv-card">
            <div className="srv-icon si-5">🎤</div>
            <h3>Interview Preparation</h3>
            <p>
              Mock interviews, strategy sessions, and confidence building for university and visa interviews.
            </p>
          </div>
          {/* Accommodation Support */}
          <div className="srv-card">
            <div className="srv-icon si-6">🏠</div>
            <h3>Accommodation Support</h3>
            <p>
              Arrange student housing, on-campus options, and neighborhood guidance for comfortable living abroad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
