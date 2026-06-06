import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

type ScholarshipAlert = {
  id: number;
  title: string;
  description: string;
  link?: string;
  createdAt: string;
};

export default function ScholarshipAlertsClient() {
  const [alerts, setAlerts] = useState<ScholarshipAlert[]>([]);
  const [modalMode, setModalMode] = useState<null | "add" | "edit" | "view">(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selected, setSelected] = useState<ScholarshipAlert | null>(null);

  useEffect(() => {
    fetch("/api/admin/scholarship-alerts")
      .then((res) => res.json())
      .then(setAlerts)
      .catch(console.error);
  }, []);

  const resetForm = () => {
    setSelected(null);
    setModalMode(null);
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      title: (form.title as any).value,
      description: (form.description as any).value,
      link: (form.link as any).value,
    };
    const res = await fetch("/api/admin/scholarship-alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const newAlert = await res.json();
      setAlerts((prev) => [...prev, newAlert]);
      resetForm();
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;
    const form = e.currentTarget;
    const data = {
      title: (form.title as any).value,
      description: (form.description as any).value,
      link: (form.link as any).value,
    };
    const res = await fetch(`/api/admin/scholarship-alerts/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      resetForm();
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    const res = await fetch(`/api/admin/scholarship-alerts/${deleteId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAlerts((prev) => prev.filter((a) => a.id !== deleteId));
      setDeleteId(null);
      resetForm();
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2 style={{ background: "#020620ff", color: "#fff", padding: "0.5rem 1rem" }}>
          Scholarship Alerts
        </h2>
        <button
          onClick={() => setModalMode("add")}
          style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Add Alert
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Title</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Created</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id}>
              <td style={{ padding: "0.5rem" }}>{a.title}</td>
              <td style={{ padding: "0.5rem" }}>{new Date(a.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "0.5rem" }}>
                <button onClick={() => { setSelected(a); setModalMode("view"); }} style={{ marginRight: "0.5rem" }}>
                  View
                </button>
                <button onClick={() => { setSelected(a); setModalMode("edit"); }} style={{ marginRight: "0.5rem" }}>
                  Edit
                </button>
                <button onClick={() => { setSelected(a); setDeleteId(a.id); }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add / Edit Modal */}
      {(modalMode === "add" || modalMode === "edit") && (
        <Modal onClose={resetForm}>
          <h2 style={{ color: "#000", marginBottom: "1rem" }}>{modalMode === "add" ? "Add Alert" : "Edit Alert"}</h2>
          <form onSubmit={modalMode === "add" ? handleAdd : handleEdit}>
            <div style={{ marginBottom: "0.5rem" }}>
              <label>Title</label>
              <input name="title" defaultValue={selected?.title || ""} required style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <label>Description</label>
              <textarea name="description" defaultValue={selected?.description || ""} required style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <label>Link</label>
              <input name="link" defaultValue={selected?.link || ""} style={{ width: "100%" }} />
            </div>
            <button type="submit" style={{ background: "#3b4cca", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>
              {modalMode === "add" ? "Create" : "Update"}
            </button>
          </form>
        </Modal>
      )}

        {/* Delete Confirmation Modal */}
        {deleteId !== null && (
          <Modal onClose={() => setDeleteId(null)}>
            <h2 style={{ color: "#000", marginBottom: "1rem" }}>Confirm Delete</h2>
            <p style={{ color: "#000" }}>Are you sure you want to delete this scholarship alert?</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleDelete}
                style={{ background: "#ff6666", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteId(null)}
                style={{ background: "transparent", color: "#000", border: "1px solid #000", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                No
              </button>
            </div>
          </Modal>
        )}

      {modalMode === "view" && selected && (
        <Modal onClose={resetForm}>
          <h2 style={{ color: "#000", marginBottom: "1rem" }}>{selected.title}</h2>
          <p>{selected.description}</p>
          {selected.link && (
            <p>
              <a href={selected.link} target="_blank" rel="noopener noreferrer">
                More info
              </a>
            </p>
          )}
          <button onClick={resetForm} style={{ marginTop: "1rem" }}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
