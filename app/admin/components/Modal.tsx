import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const contentStyle: React.CSSProperties = {
  background: "#ffffff",
  color: "#000000",
  padding: "1.5rem",
  borderRadius: "8px",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
