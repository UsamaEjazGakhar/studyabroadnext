import React from "react";

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-mesh">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="blob" />
        <div className="blob2" />
      </div>
      <div className="container">
        <div className="hero-inner">
          {/* Content */}
          <div className="hero-left">
            <div className="hero-eyebrow anim-up">
              <div className="dot" />
              <span>Pakistan's #1 Study Abroad Consultancy</span>
            </div>
            <h1 className="hero-h1 anim-up delay-1">
              Your Gateway to<br />
              <span className="hl">Global Education</span><br />
              Excellence
            </h1>
            <p className="hero-p anim-up delay-2">
              Study at world-class universities with full scholarships, expert guidance, and guaranteed admission support. Transform your dreams into reality.
            </p>
            <div className="hero-btns anim-up delay-3">
              <a href="#consultation" className="btn btn-primary btn-lg">
                <i className="fas fa-rocket" /> Free Consultation
              </a>
              <a href="#programs" className="btn btn-ghost btn-lg">
                Explore Programs <i className="fas fa-arrow-right" />
              </a>
            </div>
            <div className="hero-stats anim-up delay-4">
              <div className="hstat">
                <div className="hstat-num" data-target="5000">5000+</div>
                <div className="hstat-lbl">Students Placed</div>
              </div>
              <div className="hstat">
                <div className="hstat-num">500M+</div>
                <div className="hstat-lbl">Scholarships Won</div>
              </div>
              <div className="hstat">
                <div className="hstat-num" data-target="25">25+</div>
                <div className="hstat-lbl">Countries Served</div>
              </div>
            </div>
          </div>
          {/* Visual */}
          <div className="hero-visual anim-in delay-2">
            <div className="globe-wrap">
              <div className="globe-bg" />
              <div className="globe-grid" />
              <div className="globe-glow" />
              <div className="globe-ring gr1" />
              <div className="globe-ring gr2" />
              <div className="globe-ring gr3" />
              {/* SVG world lines overlay */}
              <svg viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.25}}>
                <circle cx="220" cy="220" r="215" fill="none" stroke="rgba(0,201,177,0.4)" strokeWidth="1" />
                <ellipse cx="220" cy="220" rx="130" ry="215" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <ellipse cx="220" cy="220" rx="215" ry="80" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <ellipse cx="220" cy="220" rx="215" ry="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="5" y1="220" x2="435" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="220" y1="5" x2="220" y2="435" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {/* Dots representing cities */}
                <circle cx="150" cy="160" r="5" fill="var(--teal)" opacity="0.9" />
                <circle cx="260" cy="140" r="4" fill="var(--gold)" opacity="0.9" />
                <circle cx="310" cy="200" r="5" fill="rgba(255,107,43,0.9)" />
                <circle cx="180" cy="270" r="3.5" fill="var(--teal)" opacity="0.7" />
                <circle cx="240" cy="300" r="4" fill="var(--gold)" opacity="0.7" />
                {/* Connecting arcs */}
                <path d="M 150 160 Q 200 100 260 140" fill="none" stroke="rgba(0,201,177,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M 260 140 Q 290 165 310 200" fill="none" stroke="rgba(240,180,41,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M 150 160 Q 160 215 180 270" fill="none" stroke="rgba(255,107,43,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
              {/* Floating cards */}
              <div className="fcard fcard-1">
                <span className="fc-icon">🎓</span>
                <div>
                  <div style={{fontSize:"0.75rem",color:"#7A95B0"}}>Placed Today</div>
                  <div>MBBS — Beijing</div>
                </div>
              </div>
              <div className="fcard fcard-2">
                <span className="fc-icon">⭐</span>
                <div>
                  <div style={{fontSize:"0.75rem",color:"#7A95B0"}}>Scholarship</div>
                  <div>$24,000 Secured</div>
                </div>
              </div>
              <div className="fcard fcard-3">
                <span className="fc-icon">✅</span>
                <div>
                  <div style={{fontSize:"0.75rem",color:"#7A95B0"}}>Visa Approved</div>
                  <div>100% Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
