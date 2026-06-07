"use client";

import React, { useState, useEffect } from "react";

import LogoutButton from "../LogoutButton";

// Simple Modal component
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "8px",
          minWidth: "350px",
          maxWidth: "40%",
          maxHeight: "80vh",
          overflow: "auto",
          color: "#000000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function LeadsClient() {
  type Lead = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    program: string;
    country: string;
    education: string;
    message?: string;
    createdAt: string;
  };

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Lead>>({
    name: "",
    email: "",
    phone: "",
    program: "",
    country: "",
    education: "",
    message: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Modal handling
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* ---------- fetch leads ---------- */
  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------- form helpers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", program: "", country: "", education: "", message: "" });
    setEditId(null);
  };

  /* ---------- submit (create / update) ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/admin/leads/${editId}` : "/api/admin/leads";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      const saved = await res.json();
      setLeads((prev) => (editId ? prev.map((l) => (l.id === saved.id ? saved : l)) : [...prev, saved]));
      resetForm();
      setModalMode(null);
    } catch {
      setError("Something went wrong – check the console.");
    }
  };

  /* ---------- edit & view actions ---------- */
  const openEdit = (lead: Lead) => {
    setEditId(lead.id);
    setForm(lead);
    setModalMode("edit");
    setSelectedLead(lead);
  };

  const openView = (lead: Lead) => {
    setSelectedLead(lead);
    setModalMode("view");
  };

  const openAdd = () => {
    resetForm();
    setModalMode("add");
  };

  /* ---------- delete confirmation ---------- */
  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    await fetch(`/api/admin/leads/${deleteId}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <>
        {/* Header with title and add button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ background: "#020620ff", color: "#fff", padding: "0.5rem 1rem", borderRadius: "4px", margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>
            Lead List
          </h2>
          <button
            onClick={openAdd}
            style={{
              background: "#3b4cca",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Add Lead
          </button>
        </div>


        {/* Leads Table */}
        {loading ? (
          <p style={{ color: "#fff" }}>Loading leads…</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--surface-2)" }}>
                <th style={{ padding: "0.5rem" }}>Date</th>
                <th style={{ padding: "0.5rem" }}>Name</th>
                <th style={{ padding: "0.5rem" }}>Contact</th>
                <th style={{ padding: "0.5rem" }}>Program & Country</th>
                <th style={{ padding: "0.5rem" }}>Education</th>
                <th style={{ padding: "0.5rem" }}>Message</th>
                <th style={{ padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: "1px solid var(--surface-2)" }}>
                  <td style={{ padding: "0.5rem" }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "0.5rem", fontWeight: 600, color: "var(--text-head)" }}>{lead.name}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <div>{lead.email}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    <div>
                      <span className="badge badge-teal" style={{ marginBottom: "0.2rem" }}>{lead.program}</span>
                    </div>
                    <div>
                      <span className="badge badge-orange">{lead.country}</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.5rem" }}>{lead.education}</td>
                  <td style={{ padding: "0.5rem", maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.message || "-"}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <button onClick={() => openView(lead)} style={{ marginRight: "0.5rem", background: "transparent", color: "#0d6efd", border: "none", cursor: "pointer" }}>View</button>
                    <button onClick={() => openEdit(lead)} style={{ marginRight: "0.5rem", background: "transparent", color: "#ffc107", border: "none", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => confirmDelete(lead.id)} style={{ background: "transparent", color: "#ff6666", border: "none", cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal for Add/Edit */}
        {(modalMode === "add" || modalMode === "edit") && (
          <Modal onClose={() => setModalMode(null)}>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>{modalMode === "edit" ? "Edit Lead" : "Add Lead"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <input name="name" placeholder="Name" required value={form.name ?? ""} onChange={handleChange} style={{ flex: "1 1 200px", padding: "0.5rem" }} />
              <input name="email" type="email" placeholder="Email" required value={form.email ?? ""} onChange={handleChange} style={{ flex: "1 1 200px", padding: "0.5rem" }} />
              <input name="phone" placeholder="Phone" value={form.phone ?? ""} onChange={handleChange} style={{ flex: "1 1 150px", padding: "0.5rem" }} />
              <input name="program" placeholder="Program" required value={form.program ?? ""} onChange={handleChange} style={{ flex: "1 1 150px", padding: "0.5rem" }} />
              <input name="country" placeholder="Country" required value={form.country ?? ""} onChange={handleChange} style={{ flex: "1 1 150px", padding: "0.5rem" }} />
              <input name="education" placeholder="Education" required value={form.education ?? ""} onChange={handleChange} style={{ flex: "1 1 150px", padding: "0.5rem" }} />
              <textarea name="message" placeholder="Message (optional)" value={form.message ?? ""} onChange={handleChange} rows={2} style={{ flex: "1 1 100%", padding: "0.5rem" }} />
              <button type="submit" style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>{modalMode === "edit" ? "Update" : "Create"}</button>
              <button type="button" onClick={() => setModalMode(null)} style={{ background: "transparent", color: "#ff6666", border: "1px solid #ff6666", padding: "0.5rem 1rem" }}>Cancel</button>
            </form>
          </Modal>
        )}

        {/* Modal for View */}
        {modalMode === "view" && selectedLead && (
          <Modal onClose={() => setModalMode(null)}>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Lead Details</h2>
            <div style={{ marginBottom: "0.5rem" }}><strong>Name:</strong> {selectedLead.name}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Email:</strong> {selectedLead.email}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Phone:</strong> {selectedLead.phone || "-"}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Program:</strong> {selectedLead.program}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Country:</strong> {selectedLead.country}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Education:</strong> {selectedLead.education}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Message:</strong> {selectedLead.message || "-"}</div>
            <button onClick={() => setModalMode(null)} style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>Close</button>
          </Modal>
        )}

        {/* Modal for Delete confirmation */}
        {deleteId !== null && (
          <Modal onClose={() => setDeleteId(null)}>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Confirm Delete</h2>
            <p style={{ color: "#fff" }}>Are you sure you want to delete this lead?</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={handleDelete} style={{ background: "#ff6666", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>Yes</button>
              <button onClick={() => setDeleteId(null)} style={{ background: "transparent", color: "#fff", border: "1px solid #fff", padding: "0.5rem 1rem", cursor: "pointer" }}>No</button>
            </div>
          </Modal>
        )}
    </>
  );
}
