"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const mockEvents = [
  { id: 1, title: "Study in Europe Scholarship Workshop", type: "Webinar", date: "July 15, 2026 - 10:00 AM", status: "Upcoming", image: "/events/europe.jpg" },
  { id: 2, title: "MBBS Admissions in China: Live Q&A", type: "Live Q&A", date: "July 20, 2026 - 2:00 PM", status: "Upcoming", image: "/events/china.jpg" },
  { id: 3, title: "Global Education Fair 2026", type: "Education Fair", date: "August 10, 2026 - 9:00 AM", status: "Register Now", image: "/events/fair.jpg" },
];

export default function EventsPage() {
  return (
    <div>
      <Header />
      <div style={{ padding: "4rem 2rem", fontFamily: "var(--font-body)", background: "var(--surface-1)", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h1 style={{ fontFamily: "var(--font-head)", color: "var(--navy)", fontSize: "3rem", marginBottom: "1rem" }}>
              Events & Webinars
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
              Join our online webinars, university sessions, scholarship workshops, and education fairs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
            {mockEvents.map(e => (
              <div key={e.id} style={{
                background: "#fff",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                boxShadow: "var(--sh-md)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(el) => el.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(el) => el.currentTarget.style.transform = "none"}
              >
                <div style={{ height: "200px", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                  {/* Placeholder for actual image */}
                  [Event Image]
                </div>
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span className="badge badge-teal">{e.type}</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>{e.date}</span>
                  </div>
                  <h3 style={{ margin: "0 0 1rem 0", color: "var(--navy)", fontSize: "1.4rem" }}>{e.title}</h3>
                  <div style={{ marginTop: "auto" }}>
                    <button className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", background: "var(--orange)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontWeight: "600", cursor: "pointer" }}>
                      {e.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "5rem", padding: "3rem", background: "var(--navy)", borderRadius: "var(--r-lg)", color: "#fff", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Don't Miss Out on Future Opportunities!</h2>
            <p style={{ marginBottom: "2rem", fontSize: "1.1rem", opacity: 0.9 }}>Subscribe to our event alert newsletter.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <input type="email" placeholder="Enter your email address" style={{ padding: "1rem", width: "100%", maxWidth: "350px", borderRadius: "var(--r-md)", border: "none" }} />
              <button className="btn btn-primary" style={{ padding: "1rem 2rem", background: "var(--teal)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontWeight: "600", cursor: "pointer" }}>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
