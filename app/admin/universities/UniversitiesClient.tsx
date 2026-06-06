"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../LogoutButton";

function Modal({ children, onClose }) {
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

export default function UniversitiesClient() {
  type University = {
    id: number;
    name: string;
    country: string;
    website?: string;
    createdAt: string;
  };

  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<University>>({
    name: "",
    country: "",
    website: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // fetch universities
  useEffect(() => {
    fetch("/api/admin/universities")
      .then((r) => r.json())
      .then((data) => {
        setUniversities(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", country: "", website: "" });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/admin/universities/${editId}` : "/api/admin/universities";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      const saved = await res.json();
      setUniversities((prev) =>
        editId ? prev.map((u) => (u.id === saved.id ? saved : u)) : [...prev, saved]
      );
      resetForm();
      setModalMode(null);
    } catch {
      setError("Something went wrong – check the console.");
    }
  };

  const openEdit = (uni: University) => {
    setEditId(uni.id);
    setForm(uni);
    setSelectedUniversity(uni);
    setModalMode("edit");
  };

  const openView = (uni: University) => {
    setSelectedUniversity(uni);
    setModalMode("view");
  };

  const openAdd = () => {
    resetForm();
    setModalMode("add");
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    await fetch(`/api/admin/universities/${deleteId}`, { method: "DELETE" });
    setUniversities((prev) => prev.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ background: "#020620ff", color: "#fff", padding: "0.5rem 1rem", borderRadius: "4px", margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>
            University List
          </h2>
          <button onClick={openAdd} style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>
            Add University
          </button>
        </div>
        {loading ? (
          <p style={{ color: "#fff" }}>Loading universities…</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--surface-2)" }}>
                <th style={{ padding: "0.5rem" }}>Date</th>
                <th style={{ padding: "0.5rem" }}>Name</th>
                <th style={{ padding: "0.5rem" }}>Country</th>
                <th style={{ padding: "0.5rem" }}>Website</th>
                <th style={{ padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((uni) => (
                <tr key={uni.id} style={{ borderBottom: "1px solid var(--surface-2)" }}>
                  <td style={{ padding: "0.5rem" }}>{new Date(uni.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "0.5rem", fontWeight: 600, color: "var(--text-head)" }}>{uni.name}</td>
                  <td style={{ padding: "0.5rem" }}>{uni.country}</td>
                  <td style={{ padding: "0.5rem" }}>
                    {uni.website ? (
                      <a href={uni.website} target="_blank" rel="noopener noreferrer" style={{ color: "#0d6efd" }}>
                        {uni.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    <button onClick={() => openView(uni)} style={{ marginRight: "0.5rem", background: "transparent", color: "#0d6efd", border: "none", cursor: "pointer" }}>View</button>
                    <button onClick={() => openEdit(uni)} style={{ marginRight: "0.5rem", background: "transparent", color: "#ffc107", border: "none", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => confirmDelete(uni.id)} style={{ background: "transparent", color: "#ff6666", border: "none", cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add/Edit Modal */}
        {(modalMode === "add" || modalMode === "edit") && (
          <Modal onClose={() => setModalMode(null)}>
            <h2 style={{ color: "#000", marginBottom: "1rem" }}>{modalMode === "edit" ? "Edit University" : "Add University"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <input name="name" placeholder="Name" required value={form.name ?? ""} onChange={handleChange} style={{ flex: "1 1 200px", padding: "0.5rem" }} />
              <input name="country" placeholder="Country" required value={form.country ?? ""} onChange={handleChange} style={{ flex: "1 1 150px", padding: "0.5rem" }} />
              <input name="website" placeholder="Website" value={form.website ?? ""} onChange={handleChange} style={{ flex: "1 1 250px", padding: "0.5rem" }} />
              <button type="submit" style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>{modalMode === "edit" ? "Update" : "Create"}</button>
              <button type="button" onClick={() => setModalMode(null)} style={{ background: "transparent", color: "#ff6666", border: "1px solid #ff6666", padding: "0.5rem 1rem" }}>Cancel</button>
            </form>
          </Modal>
        )}

        {/* View Modal */}
        {modalMode === "view" && selectedUniversity && (
          <Modal onClose={() => setModalMode(null)}>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>University Details</h2>
            <div style={{ marginBottom: "0.5rem" }}><strong>Name:</strong> {selectedUniversity.name}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Country:</strong> {selectedUniversity.country}</div>
            <div style={{ marginBottom: "0.5rem" }}><strong>Website:</strong> {selectedUniversity.website || "-"}</div>
            <button onClick={() => setModalMode(null)} style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>Close</button>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId !== null && (
          <Modal onClose={() => setDeleteId(null)}>
            <h2 style={{ color: "#000", marginBottom: "1rem" }}>Confirm Delete</h2>
            <p style={{ color: "#000" }}>Are you sure you want to delete this university?</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={handleDelete} style={{ background: "#ff6666", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>Yes</button>
              <button onClick={() => setDeleteId(null)} style={{ background: "transparent", color: "#000", border: "1px solid #000", padding: "0.5rem 1rem", cursor: "pointer" }}>No</button>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}
