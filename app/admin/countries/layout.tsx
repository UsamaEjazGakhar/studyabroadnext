import React from "react";

/**
 * Pass‑through layout for country routes. It simply renders the
 * nested page content while inheriting the parent admin layout.
 */
export default function CountriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
