"use client";

import React, { useState } from "react";
import LogoutButton from "../../LogoutButton";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
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
          minWidth: "400px",
          maxWidth: "90%",
          maxHeight: "85vh",
          overflowY: "auto",
          color: "#000000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface Scholarship {
  id: number;
  title: string;
  description?: string | null;
  deadline?: string | null;
  benefits?: string | null;
  eligibility?: string | null;
  requiredDocuments?: string | null;
  categoryId: number;
  universityId: number;
  category?: { name: string };
  university?: { name: string };
}

interface University {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Props {
  countryName: string;
  countryId: number;
  initialScholarships: Scholarship[];
  universities: University[];
  categories: Category[];
}

export default function CountryScholarshipsClient({
  countryName,
  countryId,
  initialScholarships,
  universities,
  categories,
}: Props) {
  const [scholarships, setScholarships] = useState<Scholarship[]>(initialScholarships);
  const [form, setForm] = useState<Partial<Scholarship>>({
    title: "",
    description: "",
    deadline: "",
    benefits: "",
    eligibility: "",
    requiredDocuments: "",
    categoryId: categories[0]?.id || 1,
    universityId: universities[0]?.id || 1,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "categoryId" || name === "universityId" ? parseInt(value) : value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      deadline: "",
      benefits: "",
      eligibility: "",
      requiredDocuments: "",
      categoryId: categories[0]?.id || 1,
      universityId: universities[0]?.id || 1,
    });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      countryId,
    };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/admin/scholarships/${editId}` : "/api/admin/scholarships";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      const saved = await res.json();

      setScholarships((prev) =>
        editId ? prev.map((s) => (s.id === saved.id ? saved : s)) : [saved, ...prev]
      );
      resetForm();
      setModalMode(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong – check console logs.");
    }
  };

  const openEdit = (sch: Scholarship) => {
    setEditId(sch.id);
    setForm({
      title: sch.title || "",
      description: sch.description || "",
      deadline: sch.deadline ? new Date(sch.deadline).toISOString().split("T")[0] : "",
      benefits: sch.benefits || "",
      eligibility: sch.eligibility || "",
      requiredDocuments: sch.requiredDocuments || "",
      categoryId: sch.categoryId,
      universityId: sch.universityId,
    });
    setSelectedScholarship(sch);
    setModalMode("edit");
  };

  const openView = (sch: Scholarship) => {
    setSelectedScholarship(sch);
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
    try {
      const res = await fetch(`/api/admin/scholarships/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setScholarships((prev) => prev.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete scholarship.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", margin: 0, color: "#000000" }}>
          {countryName} Scholarships
        </h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={openAdd}
            style={{
              background: "var(--primary)",
              color: "#000000",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            + Add Scholarship
          </button>
          <LogoutButton />
        </div>
      </div>

      {scholarships.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", background: "var(--surface-1)", borderRadius: "12px", border: "1px dashed var(--surface-3)" }}>
          <p style={{ color: "var(--text-body)", fontSize: "1.1rem", margin: "0 0 1rem 0" }}>
            No scholarships available for {countryName} at the moment.
          </p>
          <button
            onClick={openAdd}
            style={{
              background: "var(--primary)",
              color: "#000000",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Create First Scholarship
          </button>
        </div>
      ) : (
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--surface-3)", boxShadow: "var(--sh-sm)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#000" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--surface-2)", textAlign: "left" }}>
                <th style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>Title</th>
                <th style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>University</th>
                <th style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>Category</th>
                <th style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>Deadline</th>
                <th style={{ padding: "0.75rem 0.5rem", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((sch) => (
                <tr key={sch.id} style={{ borderBottom: "1px solid var(--surface-2)" }}>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: 600, color: "#000000" }}>
                    {sch.title}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", color: "var(--text-body)" }}>
                    {sch.university?.name || "Default University"}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <span
                      style={{
                        padding: "0.2rem 0.6rem",
                        background: "var(--surface-3)",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      {sch.category?.name || "General"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", color: "var(--text-body)" }}>
                    {sch.deadline ? new Date(sch.deadline).toLocaleDateString() : "No Deadline"}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                    <button
                      onClick={() => openView(sch)}
                      style={{ marginRight: "0.75rem", background: "transparent", color: "var(--primary)", border: "none", cursor: "pointer", fontWeight: 500 }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEdit(sch)}
                      style={{ marginRight: "0.75rem", background: "transparent", color: "#ffc107", border: "none", cursor: "pointer", fontWeight: 500 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(sch.id)}
                      style={{ background: "transparent", color: "#ff6666", border: "none", cursor: "pointer", fontWeight: 500 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(modalMode === "add" || modalMode === "edit") && (
        <Modal onClose={() => setModalMode(null)}>
          <h2 style={{ color: "#000", marginTop: 0, marginBottom: "1.5rem" }}>
            {modalMode === "edit" ? "Edit Scholarship" : "Add Scholarship"}
          </h2>
          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Scholarship Title *</label>
              <input
                name="title"
                placeholder="Ex. Merit Scholarship 2026"
                required
                value={form.title ?? ""}
                onChange={handleChange}
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem" }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>University</label>
                <select
                  name="universityId"
                  value={form.universityId ?? 1}
                  onChange={handleChange}
                  style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem" }}
                >
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Category</label>
                <select
                  name="categoryId"
                  value={form.categoryId ?? 1}
                  onChange={handleChange}
                  style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem" }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Deadline</label>
              <input
                name="deadline"
                type="date"
                value={form.deadline ?? ""}
                onChange={handleChange}
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Description</label>
              <textarea
                name="description"
                placeholder="Provide a brief description of the scholarship..."
                value={form.description ?? ""}
                onChange={handleChange}
                rows={3}
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Benefits</label>
              <textarea
                name="benefits"
                placeholder="Ex. 100% Tuition fee waiver, $1000 monthly stipend..."
                value={form.benefits ?? ""}
                onChange={handleChange}
                rows={2}
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Eligibility</label>
              <textarea
                name="eligibility"
                placeholder="Ex. Minimum GPA 3.5/4.0, TOEFL 90+..."
                value={form.eligibility ?? ""}
                onChange={handleChange}
                rows={2}
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>Required Documents</label>
              <textarea
                name="requiredDocuments"
                placeholder="Ex. Transcripts, Recommendation letters, SOP..."
                value={form.requiredDocuments ?? ""}
                onChange={handleChange}
                rows={2}
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {modalMode === "edit" ? "Update Scholarship" : "Create Scholarship"}
              </button>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                style={{
                  flex: 1,
                  background: "transparent",
                  color: "#ff6666",
                  border: "1px solid #ff6666",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {modalMode === "view" && selectedScholarship && (
        <Modal onClose={() => setModalMode(null)}>
          <h2 style={{ color: "#000", marginTop: 0, marginBottom: "1.25rem" }}>Scholarship Details</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <div>
              <strong>Title:</strong> {selectedScholarship.title}
            </div>
            <div>
              <strong>University:</strong> {selectedScholarship.university?.name || "Default University"}
            </div>
            <div>
              <strong>Category:</strong> {selectedScholarship.category?.name || "General"}
            </div>
            <div>
              <strong>Deadline:</strong> {selectedScholarship.deadline ? new Date(selectedScholarship.deadline).toLocaleDateString() : "No Deadline"}
            </div>
            <div>
              <strong>Description:</strong>
              <p style={{ margin: "0.25rem 0 0 0", color: "#555", whiteSpace: "pre-wrap" }}>
                {selectedScholarship.description || "-"}
              </p>
            </div>
            <div>
              <strong>Benefits:</strong>
              <p style={{ margin: "0.25rem 0 0 0", color: "#555", whiteSpace: "pre-wrap" }}>
                {selectedScholarship.benefits || "-"}
              </p>
            </div>
            <div>
              <strong>Eligibility:</strong>
              <p style={{ margin: "0.25rem 0 0 0", color: "#555", whiteSpace: "pre-wrap" }}>
                {selectedScholarship.eligibility || "-"}
              </p>
            </div>
            <div>
              <strong>Required Documents:</strong>
              <p style={{ margin: "0.25rem 0 0 0", color: "#555", whiteSpace: "pre-wrap" }}>
                {selectedScholarship.requiredDocuments || "-"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalMode(null)}
            style={{
              marginTop: "1.5rem",
              width: "100%",
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <Modal onClose={() => setDeleteId(null)}>
          <h2 style={{ color: "#000", marginTop: 0, marginBottom: "1rem" }}>Confirm Delete</h2>
          <p style={{ color: "#000", margin: "0 0 1.5rem 0" }}>
            Are you sure you want to delete this scholarship? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleDelete}
              style={{
                flex: 1,
                background: "#ff6666",
                color: "#fff",
                border: "none",
                padding: "0.75rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setDeleteId(null)}
              style={{
                flex: 1,
                background: "transparent",
                color: "#000",
                border: "1px solid #000",
                padding: "0.75rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              No, Keep
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
