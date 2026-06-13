

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import UniversitiesClient from "./UniversitiesClient";

export default async function AdminUniversities() {
  const session = await (getServerSession as any)(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }
  return <UniversitiesClient />;
}
