// BDS specific content page
import React from "react";

const bdsDetails = `🦷✨ BDS Admission Open – September 2026 Intake ✨🦷

🌍 Start Your Dental Career in China with Leading Medical Universities!

🔰 Program Available:

✅ BDS (Bachelor of Dental Surgery)

🏫 Top Universities:
• Xi’an Jiaotong University
• Jiangsu University
• Jining Medical University
• Shandong First Medical University
• Shandong Second Medical University
• Yangtze University
• Jiamusi University

💡 Why Choose These Universities?

✅ Specialized Stomatological Affiliated Teaching Hospital (SATH)
✅ Modern Dental Laboratories & Clinical Training
✅ Globally Recognized Degree
🌍 Approved by ECFMG | WHO | WFME
✅ Affordable Tuition Fees & Living Costs
✅ International Student‑Friendly Environment

⏳ Limited Seats Available – Apply Now for Fall 2026!

🤝 Agents & Partner Companies are warmly welcome to collaborate with us!

📞 WhatsApp: +92 333 1165573

📧 Email: themedixus@gmail.com

📩 Contact us today to secure your seat and start your journey toward a successful dental career!`;

export default function BDSContent() {
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
          BDS Programme Details
        </h1>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{bdsDetails}</pre>
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
