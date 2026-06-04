

import React from "react";

const detailsMap: Record<string, { title: string; content: string }> = {
  mbbs: {
    title: "MBBS Programme Details",
    content: `✅ MBBS (Bachelor of Medicine & Bachelor of Surgery)

🏫 Top Medical Universities in China:
• Xi’an Jiaotong University
• Jiangsu University
• Jining Medical University
• Shandong First Medical University
• Shandong Second Medical University
• Yangtze University
• Jiamusi University

🏫 Top Medical Universities in Russia:
• Kazan Federal University
• Bashkir State Medical University
• Orenburg State Medical University
• Perm State Medical University
• Tver State Medical University
• Crimea Federal University`
  },
  bds: {
    title: "BDS Programme Details",
    content: `✅ BDS (Bachelor of Dental Surgery)

🏫 Top Dental Universities in China:
• Peking University School of Stomatology
• Shanghai Jiao Tong University

🏫 Top Dental Universities in Russia:
• Moscow State University Dental Faculty
• St. Petersburg State Medical University`
  },
  phd: {
    title: "PhD Programme Details",
    content: `✅ PhD (Doctor of Philosophy) – Research focused degree

💰 Scholarship: Full tuition & hostel free, 15000 RMB stipend per year

📚 Available Majors:
- Control Science and Engineering
- Civil Engineering
- Power Engineering and Engineering Thermophysics
- Chemical Engineering and Technology
- Mechanical and Electronic Engineering
- Material Science and Engineering
- Manufacturing Information Systems
- Mechanical Engineering`
  }
};

export const generateMetadata = async ({ params }: { params: { program: string } }) => {
  const entry = detailsMap[params.program] || detailsMap["mbbs"];
  return {
    title: entry.title,
    description: entry.title,
  };
};

export default function ProgrammePage({ params }: { params: { program: string } }) {
  const entry = detailsMap[params.program] || detailsMap["mbbs"];
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
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#00695c" }}>{entry.title}</h1>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{entry.content}</pre>
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
