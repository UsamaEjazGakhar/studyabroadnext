

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import UniversitiesClient from "./UniversitiesClient";

export default async function AdminUniversities() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }
  return <UniversitiesClient />;
}
