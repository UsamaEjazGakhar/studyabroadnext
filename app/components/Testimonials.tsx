import React from "react";

const Testimonials: React.FC = () => {
  return (
    <section id="success" className="sec-testimonials">
      <div className="container">
        <div className="sec-head center">
          <div className="sec-label">Student Success</div>
          <h2 className="sec-title">Stories of Transformation</h2>
          <p className="sec-desc">
            Meet students who achieved their dreams of studying abroad with our expert guidance.
          </p>
        </div>
        <div className="test-grid">
          {/* Card 1 */}
          <div className="test-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-text">
              "StudyVerse transformed my dreams into reality. From application to admission, their support was exceptional. I'm now studying at a top medical university with a full scholarship!"
            </p>
            <div className="test-author">
              <div className="test-av ta-1">AK</div>
              <div className="test-author-info">
                <h4>Aman Kumar</h4>
                <p>MBBS Student, China</p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="test-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-text">
              "The visa guidance was incredible! They prepared me thoroughly and my visa was approved on the first attempt. Highly recommend their services to everyone!"
            </p>
            <div className="test-author">
              <div className="test-av ta-2">PS</div>
              <div className="test-author-info">
                <h4>Priya Sharma</h4>
                <p>BDS Student, Russia</p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="test-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-text">
              "Outstanding support throughout my PhD journey. The scholarship they helped me secure covers my entire program — tuition, accommodation, and living. Truly grateful!"
            </p>
            <div className="test-author">
              <div className="test-av ta-3">RG</div>
              <div className="test-author-info">
                <h4>Rajesh Gupta</h4>
                <p>PhD Scholar, China</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
