// This component renders the MBBS programme details page.
// It is a Server Component (no client‑side interactivity needed).

export const metadata = {
  title: "MBBS Programme Details",
  description: "Details for MBBS admissions – September 2026 intake.",
};

const mbbsDetails = `
✅ MBBS (Bachelor of Medicine & Bachelor of Surgery)

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
• Crimea Federal University
`;

export default function MBBSBDSContent() {
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
          MBBS Programme Details
        </h1>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{mbbsDetails}</pre>
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
