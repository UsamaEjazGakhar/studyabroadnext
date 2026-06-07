import React from "react";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function EditAlertPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const alertId = Number(params.id);
  if (isNaN(alertId)) {
    redirect(`/admin/scholarship-alerts`);
  }

  const alert = await prisma.scholarshipAlert.findUnique({
    where: { id: alertId },
    select: {
      id: true,
      title: true,
      region: true,
      amount: true,
      deadline: true,
      link: true,
      description: true,
      universityId: true,
      countryId: true,
      university: { select: { name: true } },
      country: { select: { name: true } },
    },
  });

  if (!alert) {
    redirect(`/admin/scholarship-alerts`);
  }

  async function updateAlert(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const region = formData.get("region") as string;
    const universityId = Number(formData.get("universityId"));
    const countryId = Number(formData.get("countryId"));
    const amount = formData.get("amount") as string | null;
    const deadline = formData.get("deadline") as string | null;
    const link = formData.get("link") as string | null;
    const description = formData.get("description") as string | null;

    await prisma.scholarshipAlert.update({
      where: { id: alertId },
      data: {
        title,
        region,
        universityId,
        countryId,
        amount: amount || undefined,
        deadline: deadline ? new Date(deadline) : undefined,
        link: link || undefined,
        description: description || undefined,
      },
    });
    redirect(`/admin/scholarship-alerts/view/${alertId}`);
  }

  return (
    <>
      <Head>
        <title>Edit Scholarship Alert</title>
        <meta name="description" content={`Edit ${alert.title}`} />
      </Head>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "var(--text-head)" }}>Edit Alert</h1>
        <form action={updateAlert} style={{ display: "flex", flexDirection: "column", maxWidth: "600px", gap: "1rem" }}>
          <label>
            Title
            <input type="text" name="title" defaultValue={alert.title} required />
          </label>
          <label>
            Region
            <input type="text" name="region" defaultValue={alert.region} required />
          </label>
          <label>
            University ID
            <input type="number" name="universityId" defaultValue={alert.universityId} required />
          </label>
          <label>
            Country ID
            <input type="number" name="countryId" defaultValue={alert.countryId} required />
          </label>
          <label>
            Amount
            <input type="text" name="amount" defaultValue={alert.amount || ""} />
          </label>
          <label>
            Deadline
            <input type="date" name="deadline" defaultValue={alert.deadline ? new Date(alert.deadline).toISOString().split('T')[0] : ""} />
          </label>
          <label>
            Link
            <input type="url" name="link" defaultValue={alert.link || ""} />
          </label>
          <label>
            Description
            <textarea name="description" defaultValue={alert.description || ""} rows={4} />
          </label>
          <button type="submit" style={{ background: "var(--primary)", color: "#000", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }}>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
