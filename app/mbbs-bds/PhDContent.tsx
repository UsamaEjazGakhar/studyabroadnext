// PhD specific content page
import React from "react";

export const metadata = {
  title: "PhD Programme Details – September 2026 Intake",
  description: "Call for PhD Programs open for Scholarship – China. Tuition & hostel free, 15000 RMB stipend per year."
};

const phdDetails = `Call for PhD Programs open for Scholarship\n\nCountry: China\n\nScholarship\nTuition hostel Free\n15000 RMB student stipend Per Year\n\nAvailable PhD Majors:\n\nControl Science and Engineering\nCivil engineering\nPower engineering and engineering thermophysic\nChemical engineering and technology\nMechanical and electronic engineering\nMaterial science and engineering\nManufacturing information systems\nMechanical engineering\n\nWelcome to apply through Us\nAgents and companies are most welcome to work with Us\nFor more details contact with Us\nWhat's app contact\n+923331165573\n\nE.mail: themedixus@gmail.com`;

export default function PhDContent() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
        color: "#212121",
        fontFamily: "'Inter', sans-serif",
        padding: "2rem",
      }}
    >
      <section style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#00695c" }}>
          PhD Programme Details
        </h1>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{phdDetails}</pre>
        <a
          href="/"
          style={{
            marginTop: "1rem",
            display: "inline-block",
            color: "#00695c",
            textDecoration: "none",
          }}
        >
          ← Back to Programs
        </a>
      </section>
    </main>
  );
}
