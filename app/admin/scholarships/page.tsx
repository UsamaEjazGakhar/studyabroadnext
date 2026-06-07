import React, { useState } from "react";
import Head from "next/head";

export default function AddScholarshipPage() {
  const [formData, setFormData] = useState({
    title: "",
    region: "Europe",
    university: "",
    amount: "",
    deadline: "",
    link: "",
    description: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await fetch("/api/admin/scholarship-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("Scholarship added successfully!");
        setFormData({
          title: "",
          region: "Europe",
          university: "",
          amount: "",
          deadline: "",
          link: "",
          description: "",
        });
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error || "Failed to add"}`);
      }
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Add Scholarship – Admin</title>
        <meta name="description" content="Add a new scholarship alert for the admin dashboard" />
      </Head>
      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1.5rem", background: "#fff", borderRadius: "12px", boxShadow: "var(--sh-sm)" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--navy)" }}>Add Scholarship Alert</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="title" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="region" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            >
              <option value="Europe">Europe</option>
              <option value="Russia">Russia</option>
              <option value="China">China</option>
            </select>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="university" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              University (optional)
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="amount" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              Amount (optional)
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="deadline" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              Deadline (optional) – YYYY-MM-DD
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="link" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              Link (optional)
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="description" style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{ width: "100%", padding: ".6rem", borderRadius: "6px", border: "1px solid var(--surface-3)" }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: "0.6rem 1.2rem", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
          >
            Add Scholarship
          </button>
          {status && <p style={{ marginTop: "1rem", color: status.startsWith("Error") ? "var(--warning)" : "var(--success)" }}>{status}</p>}
        </form>
      </div>
    </>
  );
}
