import React from "react";

export const metadata = {
  title: "PhD Scholarships in China – Free Tuition & Stipend",
  description: "Apply for fully funded PhD programs in China with tuition, hostel free, and a 15,000 RMB yearly stipend. Various engineering majors available. Contact us via WhatsApp or email.",
};

const majors = [
  "Control Science and Engineering",
  "Civil Engineering",
  "Power Engineering and Engineering Thermophysics",
  "Chemical Engineering and Technology",
  "Mechanical and Electronic Engineering",
  "Material Science and Engineering",
  "Manufacturing Information Systems",
  "Mechanical Engineering",
];

export default function PhdPage() {
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
        <h1 style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
          fontWeight: 600,
        }}>
          Call for PhD Programs – Full Scholarship
        </h1>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Country: <strong>China</strong>
        </p>
        <article
          style={{
            background: "rgba(255,255,255,0.8)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>Scholarship Benefits</h2>
          <ul style={{ paddingLeft: "1.2rem" }}>
            <li>Tuition & hostel – <strong>Free</strong></li>
            <li>Annual stipend: <strong>15,000 RMB</strong></li>
          </ul>
          <h2 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
            Available PhD Majors
          </h2>
          <ul style={{ columns: 2, columnGap: "2rem", paddingLeft: "1.2rem" }}>
            {majors.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </article>
        <section style={{ marginTop: "2rem", textAlign: "center" }}>
          <p>
            <strong>Welcome to apply through us.</strong>
          </p>
          <p>Agents and companies are most welcome to work with us.</p>
          <p>
            For more details, contact us via WhatsApp or Email:
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            📱 <a href="https://wa.me/923331165573" style={{ color: "#00695c" }}>+92 333 1165573</a><br />
            ✉️ <a href="mailto:themedixus@gmail.com" style={{ color: "#00695c" }}>themedixus@gmail.com</a>
          </p>
        </section>
      </section>
    </main>
  );
}
