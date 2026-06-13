"use client";
import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    }) as any;

    if (res?.error) {
      if (res.error?.includes('Pending approval')) {
        setError('Your account is pending admin approval. Please wait for activation.');
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    } else {
      const session = await getSession();
      const role = (session?.user as any)?.role;
      if (role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    }
  };

  return (
    <>
      <Header />
      <section className="login-section">
        <div className="glass-card">
          <h2 className="sec-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Welcome Back</h2>
          {error && <p className="badge badge-orange" style={{ textAlign: "center", marginBottom: "1rem" }}>{error}</p>}
          <form onSubmit={handleSubmit} className="form-grid" style={{ gap: "1rem" }}>
            <div className="fg">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail((e.target as any).value)} required placeholder="you@email.com" />
            </div>
            <div className="fg">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword((e.target as any).value)} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifySelf: "center" }}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="nav-cta" style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
            <a href="/" className="btn btn-ghost" style={{color: "#000"}}>Back to Home</a>
            <a href="/register" className="btn btn-primary">Create Account</a>
          </div>
        </div>
      </section>
      <style jsx>{`
        .login-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-1);
          padding: 2rem;
        }
        .glass-card {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: var(--r-md);
          box-shadow: var(--sh-md);
          padding: 2rem 1.5rem;
          max-width: 420px;
          width: 100%;
        }
      `}</style>
    </>
  );
}
