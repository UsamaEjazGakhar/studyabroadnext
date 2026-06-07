import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import LogoutButton from "../../../LogoutButton";

const prisma = new PrismaClient();

export default async function CountryCostPage({ params }: { params: Promise<{ country: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const resolvedParams = await params;
  const country = await prisma.country.findUnique({
    where: { name: resolvedParams.country },
    select: { name: true, createdAt: true },
  });

  if (!country) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Country Not Found</h1>
        <p>No data available for {resolvedParams.country}.</p>
        <Link href="/admin">← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{country.name} – Cost Breakdown</title>
        <meta name="description" content={`Cost breakdown details for ${country.name}.`} />
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>{country.name} – Cost Breakdown</h1>
            <LogoutButton />
          </div>
          {/* Placeholder content – replace with actual cost data */}
          <p>Here you can display tuition fees, living expenses, accommodation costs, and other financial details for {country.name}.</p>
          <ul>
            <li>Tuition Fees: <strong>Data pending</strong></li>
            <li>Living Costs: <strong>Data pending</strong></li>
            <li>Hostel Details: <strong>Data pending</strong></li>
            <li>Other Fees: <strong>Data pending</strong></li>
          </ul>
          <Link href={`/admin/countries/${resolvedParams.country}`} style={{ color: "var(--link)" }}>← Back to Overview</Link>
      </>
    </>
  );
}
