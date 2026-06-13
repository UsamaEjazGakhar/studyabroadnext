"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Helper to safely show alerts
function showAlert(message: string) {
  (globalThis as any).alert(message);
}

// Type for the send alerts API response
interface TriggerResponse {
  sentCount: number;
  subscriberCount: number;
  message?: string;
}



export default function TriggerButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTrigger = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/scholarships/send-alerts", {
        method: "POST",
      });
      const data = (await res.json()) as TriggerResponse;
      
      if (res.ok) {
        showAlert(`Success! Sent ${data.sentCount} alerts to ${data.subscriberCount} subscribers.`);
        router.refresh();
      } else {
        showAlert(`Error: ${data.message}`);
      }
    } catch (error) {
      showAlert("Failed to trigger emails.");
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
