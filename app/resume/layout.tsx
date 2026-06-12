import React from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="resume-page-layout">
      <aside className="resume-sidebar-col">
        <Sidebar />
      </aside>
      <main className="resume-main-col">{children}</main>
    </div>
  );
}
