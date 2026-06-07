'use client';

import React from "react";

export default function DeleteButton({ alertId }: { alertId: number }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/admin/scholarship-alerts/${alertId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete");
    } else {
      // Refresh to reflect removal
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "0.3rem 0.6rem",
        background: "var(--danger)",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "0.75rem",
      }}
    >
      Delete
    </button>
  );
}
