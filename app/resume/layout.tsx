import React from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <div className="sidebar"><Sidebar /></div>
      <main>{children}</main>
    </div>
  );
}
