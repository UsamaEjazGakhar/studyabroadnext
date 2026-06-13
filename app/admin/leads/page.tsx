import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import LeadsClient from "./LeadsClient";

export default async function AdminLeads() {
// @ts-ignore
  const session = await (getServerSession as any)(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }
  return <LeadsClient />;
}
