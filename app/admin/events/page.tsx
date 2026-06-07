import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

const EVENT_TYPES = [
  "Online Webinar",
  "University Session",
  "Scholarship Workshop",
  "Education Fair",
  "Live Q&A Session"
];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { type?: string; status?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const selectedType = searchParams.type || "";
  const selectedStatus = searchParams.status || "upcoming"; // 'upcoming' or 'past'
  
  const now = new Date();
  
  const whereClause: any = {};
  if (selectedType) {
    whereClause.type = selectedType;
  }
  
  if (selectedStatus === "upcoming") {
    whereClause.date = { gte: now };
  } else if (selectedStatus === "past") {
    whereClause.date = { lt: now };
  }

  const events = await prisma.event.findMany({
    where: whereClause,
    orderBy: { date: selectedStatus === "upcoming" ? "asc" : "desc" },
  });

  return (
    <>
      <Head>
        <title>Events & Webinars – Admin</title>
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>Events & Webinars</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + Schedule Event
              </button>
              <LogoutButton />
            </div>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "var(--sh-sm)",
              marginBottom: "2rem",
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Status Filter */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link
                href={`/admin/events?status=upcoming${selectedType ? `&type=${encodeURIComponent(selectedType)}` : ""}`}
                style={{
                  padding: "0.5rem 1rem",
                  background: selectedStatus === "upcoming" ? "var(--text-head)" : "var(--surface-2)",
                  color: selectedStatus === "upcoming" ? "#fff" : "var(--text-head)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Upcoming
              </Link>
              <Link
                href={`/admin/events?status=past${selectedType ? `&type=${encodeURIComponent(selectedType)}` : ""}`}
                style={{
                  padding: "0.5rem 1rem",
                  background: selectedStatus === "past" ? "var(--text-head)" : "var(--surface-2)",
                  color: selectedStatus === "past" ? "#fff" : "var(--text-head)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Past
              </Link>
            </div>
            
            <div style={{ width: "1px", height: "30px", background: "var(--surface-3)" }}></div>

            {/* Type Filter */}
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link
                  href={`/admin/events?status=${selectedStatus}`}
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    background: selectedType === "" ? "var(--primary)" : "var(--surface-2)",
                    color: selectedType === "" ? "#fff" : "var(--text-head)",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  All Types
                </Link>
              </li>
              {EVENT_TYPES.map((type) => (
                <li key={type}>
                  <Link
                    href={`/admin/events?status=${selectedStatus}&type=${encodeURIComponent(type)}`}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      background: selectedType === type ? "var(--primary)" : "var(--surface-2)",
                      color: selectedType === type ? "#fff" : "var(--text-head)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {events.length === 0 ? (
              <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
                No {selectedStatus} events found matching the selected criteria.
              </p>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    border: "1px solid var(--surface-3)",
                    boxShadow: "var(--sh-sm)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ background: "var(--surface-2)", padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.25rem 0.5rem",
                          background: "#fff",
                          color: "var(--primary)",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}
                      >
                        {evt.type}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        {new Date(evt.date).toLocaleDateString()} at {new Date(evt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-head)" }}>{evt.title}</h3>
                    <p style={{ margin: "0 0 1.5rem 0", color: "var(--text-body)", fontSize: "0.9rem", flexGrow: 1, lineHeight: "1.5" }}>
                      {evt.description || "No description provided."}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <a
                        href={evt.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: evt.link ? "var(--link)" : "var(--text-muted)",
                          textDecoration: evt.link ? "underline" : "none",
                          fontWeight: 500,
                          fontSize: "0.9rem"
                        }}
                      >
                        {evt.link ? "Meeting Link" : "No Link Added"}
                      </a>
                      <button
                        style={{
                          padding: "0.4rem 1rem",
                          background: "var(--surface-3)",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          color: "var(--text-head)",
                          fontSize: "0.85rem",
                          fontWeight: 500
                        }}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
      </>
    </>
  );
}
