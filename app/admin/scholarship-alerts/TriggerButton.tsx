"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function TriggerButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTrigger = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/scholarships/send-alerts", {
        method: "POST",
      });
      const data = await res.json();
      
      if (res.ok) {
        alert(`Success! Sent ${data.sentCount} alerts to ${data.subscriberCount} subscribers.`);
        router.refresh();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to trigger emails.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleTrigger}
      disabled={loading}
      style={{
        padding: "0.5rem 1rem",
        background: "var(--success)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: 600,
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? "Sending..." : "Trigger Email Broadcast"}
    </button>
  );
}
