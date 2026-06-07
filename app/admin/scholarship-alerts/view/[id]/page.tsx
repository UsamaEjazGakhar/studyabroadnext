import React from "react";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ViewAlertPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const alert = await prisma.scholarshipAlert.findUnique({
    where: { id: Number(params.id) },
    include: { university: true, country: true },
  });

  if (!alert) {
    redirect("/admin/scholarship-alerts");
  }

  return (
    <>
      <Head>
        <title>View Scholarship Alert</title>
        <meta name="description" content={`View details for ${alert.title}`} />
      </Head>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "var(--text-head)" }}>{alert.title}</h1>
        <p><strong>Region:</strong> {alert.region}</p>
        <p><strong>University:</strong> {alert.university?.name || "N/A"}</p>
        <p><strong>Country:</strong> {alert.country?.name || "N/A"}</p>
        <p><strong>Amount:</strong> {alert.amount || "N/A"}</p>
        <p><strong>Deadline:</strong> {alert.deadline ? new Date(alert.deadline).toLocaleDateString() : "N/A"}</p>
        <p><strong>Link:</strong> {alert.link && <a href={alert.link} target="_blank" rel="noopener noreferrer">Open</a>}</p>
        <p><strong>Description:</strong></p>
        <div style={{ whiteSpace: "pre-wrap" }}>{alert.description}</div>
      </div>
    </>
  );
}
