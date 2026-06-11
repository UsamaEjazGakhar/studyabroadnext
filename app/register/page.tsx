// Updated register page with file uploads and proper API endpoint
"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [modalConfig, setModalConfig] = useState({ show: false, type: "success", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!firstName || !lastName) {
      setError("First and last name required");
      return;
    }
    if (!profilePic || !paymentProof) {
      setError("Profile picture and payment proof are required");
      return;
    }
    setLoading(true);
    try {
      const startTime = performance.now();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("profilePic", profilePic);
      formData.append("paymentProof", paymentProof);
      formData.append("categoryId", categoryId);

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const duration = Math.round(performance.now() - startTime);
      const baseMessage = !res.ok ? (data.message || data.error || "Registration failed") : "Your account has been successfully created and is currently pending admin approval. You will receive an email once it is approved.";
      const fullMessage = `${baseMessage} Ready in ${duration}ms`;
      if (!res.ok) {
        setModalConfig({ show: true, type: "error", message: fullMessage });
      } else {
        setModalConfig({ show: true, type: "success", message: fullMessage });
      }
    } catch (e) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <>

      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-1)" }}>
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "14px", boxShadow: "var(--sh-md)", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ fontFamily: "var(--font-head)", marginBottom: "1.5rem", textAlign: "center", color: "var(--navy)" }}>Create Account</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} encType="multipart/form-data">
            <div className="fg">
              <label>First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="First Name" />
            </div>
            <div className="fg">
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Last Name" />
            </div>
            <div className="fg">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="fg">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="fg">
              <label>Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            </div>
            <div className="fg">
              <label>Profile Picture</label>
              <input type="file" accept="image/*" onChange={e => setProfilePic(e.target.files?.[0] || null)} required />
            </div>
            <div className="fg">
              <label>Payment Proof</label>
              <input type="file" accept="image/*" onChange={e => setPaymentProof(e.target.files?.[0] || null)} required />
                <label>Category</label>
                <select name="categoryId" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                  <option value="" disabled>Select a category</option>
                  <option value="1">MBBS</option>
                  <option value="2">BDS</option>
                  <option value="3">PHD</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: "center" }}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div style={{ marginTop: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <a href="/" className="btn btn-ghost" style={{ padding: "0.5rem 1rem", color: "var(--navy)", background: "rgba(255,255,255,0.3)" }}>Back to Home</a>
            <a href="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Already have an account? Login</a>
          </div>
        </div>
      </div>

      {modalConfig.show && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", padding: "2rem", borderRadius: "12px", 
            textAlign: "center", maxWidth: "400px", width: "90%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {modalConfig.type === "success" ? "✅" : "❌"}
            </div>
            <h2 style={{ color: modalConfig.type === "success" ? "var(--navy)" : "#d32f2f", marginBottom: "1rem" }}>
              {modalConfig.type === "success" ? "Registration Successful!" : "Registration Failed"}
            </h2>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>{modalConfig.message}</p>
            {modalConfig.type === "success" ? (
              <button 
                onClick={() => router.push("/login")}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Proceed to Login
              </button>
            ) : (
              <button 
                onClick={() => setModalConfig({ ...modalConfig, show: false })}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", background: "#d32f2f" }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
