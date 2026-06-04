"use client";
import React from "react";
import Link from "next/link";


const Programs: React.FC = () => {
  return (
    <section id="programs" className="sec-programs">
      <div className="container">
        <div className="sec-head center">
          <div className="sec-label">Academic Programs</div>
          <h2 className="sec-title">Featured Study Programs</h2>
          <p className="sec-desc">
            Explore our most popular education pathways — scholarships, career pathways, and global recognition included.
          </p>
        </div>
        <div className="prog-grid">
          {/* MBBS Abroad */}
          <div className="prog-card">
            <div className="pc-header pc-mbbs">
              <span className="pc-tag">Most Popular</span>
              <h3 className="pc-h3">MBBS Abroad</h3>
            </div>
            <div className="pc-body">
              <div className="pc-meta">
                <span>
                  <i className="fas fa-map-marker-alt"></i> China &amp; Russia
                </span>
                <span>
                  <i className="fas fa-clock"></i> 5–6 Years
                </span>
              </div>
              <p className="pc-desc">
                Study medicine at world-renowned universities with fully funded scholarships and guaranteed placements in healthcare worldwide.
              </p>
              <div className="pc-foot">
                                <Link href="/mbbs-bds/mbbs" className="btn btn-teal btn-sm">Explore</Link>
                <a href="#consultation" className="btn btn-primary btn-sm">Apply Now</a>
              </div>
            </div>
          </div>
          {/* BDS Abroad */}
          <div className="prog-card">
            <div className="pc-header pc-bds">
              <span className="pc-tag">Growing Demand</span>
              <h3 className="pc-h3">BDS Abroad</h3>
            </div>
            <div className="pc-body">
              <div className="pc-meta">
                <span>
                  <i className="fas fa-map-marker-alt"></i> China &amp; Russia
                </span>
                <span>
                  <i className="fas fa-clock"></i> 4–5 Years
                </span>
              </div>
              <p className="pc-desc">
                Pursue dental studies with international recognition, modern facilities, and lucrative career opportunities globally.
              </p>
              <div className="pc-foot">
                                <Link href="/mbbs-bds" className="btn btn-teal btn-sm">Explore</Link>
                <a href="#consultation" className="btn btn-primary btn-sm">Apply Now</a>
              </div>
            </div>
          </div>
          {/* PhD in China */}
          <div className="prog-card">
            <div className="pc-header pc-phd">
              <span className="pc-tag">Research Focused</span>
              <h3 className="pc-h3">PhD in China</h3>
            </div>
            <div className="pc-body">
              <div className="pc-meta">
                <span>
                  <i className="fas fa-map-marker-alt"></i> China
                </span>
                <span>
                  <i className="fas fa-clock"></i> 3–4 Years
                </span>
              </div>
              <p className="pc-desc">
                Advance your research career with fully funded scholarships, world-class mentorship, and publication opportunities.
              </p>
              <div className="pc-foot">
                                  <Link href="/mbbs-bds/phd" className="btn btn-teal btn-sm">Explore</Link>
                <a href="#consultation" className="btn btn-primary btn-sm">Apply Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
