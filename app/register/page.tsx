"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        // after successful registration, redirect to login
        router.push("/login");
      }
    } catch (e) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-1)" }}>
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "14px", boxShadow: "var(--sh-md)", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ fontFamily: "var(--font-head)", marginBottom: "1.5rem", textAlign: "center", color: "var(--navy)" }}>Create Account</h2>
          {error && <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
    </>
  );
}
