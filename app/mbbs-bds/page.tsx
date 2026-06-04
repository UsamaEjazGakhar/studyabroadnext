
import MBBSBDSContent from "./MBBSBDSContent";

export const metadata = {
  title: "MBBS & BDS Admissions – September 2026 Intake",
  description: "Admission open for MBBS and BDS programs in China & Russia. Explore top universities, scholarship details, and apply via WhatsApp.",
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
const bdsDetails = `
✅ BDS (Bachelor of Dental Surgery)

🏫 Top Dental Universities in China:
• Peking University School of Stomatology
• Shanghai Jiao Tong University

🏫 Top Dental Universities in Russia:
• Moscow State University Dental Faculty
• St. Petersburg State Medical University
`;

const phdDetails = `
✅ PhD (Doctor of Philosophy) – Research focused degree

💰 Scholarship: Full tuition & hostel free, 15000 RMB stipend per year

📚 Available Majors:
- Control Science and Engineering
- Civil Engineering
- Power Engineering and Engineering Thermophysics
- Chemical Engineering and Technology
- Mechanical and Electronic Engineering
- Material Science and Engineering
- Manufacturing Information Systems
- Mechanical Engineering
`;

export default function MBBSBDSPage() {
  return <MBBSBDSContent />;
}

// Inline style objects for consistency
const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.9)",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const headerStyle: React.CSSProperties = { marginBottom: "0.8rem" };

const tagStyle: React.CSSProperties = {
  background: "#00695c",
  color: "#fff",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "0.75rem",
  marginRight: "0.5rem",
};

const h3Style: React.CSSProperties = { fontSize: "1.3rem", fontWeight: 600 as any, margin: "0.3rem 0" };

const bodyStyle: React.CSSProperties = { fontSize: "0.95rem" };

const metaStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.85rem",
  color: "#555",
  marginBottom: "0.6rem",
};
const descStyle = { marginBottom: "0.8rem", lineHeight: "1.4" };
const footStyle = { display: "flex", gap: "0.5rem" };
const exploreBtnStyle = {
  background: "#009688",
  color: "#fff",
  border: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "4px",
  cursor: "pointer",
};
const applyBtnStyle = {
  background: "#00695c",
  color: "#fff",
  border: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
};
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "8px",
  padding: "1.5rem",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};
const closeBtnStyle = {
  marginTop: "1rem",
  background: "#c62828",
  color: "#fff",
  border: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "4px",
  cursor: "pointer",
};
