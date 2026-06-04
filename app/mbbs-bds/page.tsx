
import MBBSBDSContent from "./MBBSBDSContent";

export const metadata = {
  title: "MBBS & BDS Admissions – September 2026 Intake",
  description: "Admission open for MBBS and BDS programs in China & Russia. Explore top universities, scholarship details, and apply via WhatsApp.",
};

// Duplicate MBBS details removed; using MBBSBDSContent component

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
  background: "#000b69ff",
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
  background: "linear-gradient(135deg, #0A2A45, #6B7280)",
  color: "#FFFFFF",
  border: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "4px",
  cursor: "pointer",
};
const applyBtnStyle = {
  background: "linear-gradient(135deg, #0A2A45, #6B7280)",
  color: "#FFFFFF",
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
