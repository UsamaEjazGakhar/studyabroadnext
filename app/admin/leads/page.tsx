import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import LeadsClient from "./LeadsClient";

export default async function AdminLeads() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }
  return <LeadsClient />;
}
