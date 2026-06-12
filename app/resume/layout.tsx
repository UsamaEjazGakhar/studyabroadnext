import React from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <aside style={{ flexShrink: 0, width: '250px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', zIndex: 100 }}>
        <Sidebar />
      </aside>
      <main style={{ flex: 1, padding: '20px 40px', minWidth: 0, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
