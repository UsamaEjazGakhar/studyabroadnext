// app/dashboard/layout.tsx
import React from "react";

/**
 * Layout for the Dashboard route. It simply renders its children inside the
 * root layout, but having an explicit layout file avoids any ambiguity with the
 * Next.js App Router's hierarchical routing.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
