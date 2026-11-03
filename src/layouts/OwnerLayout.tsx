import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OwnerSidebar } from '../components/owner/OwnerSidebar';
import { OwnerTopbar } from '../components/owner/OwnerTopbar';

export const OwnerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-base font-sans text-on-surface scroll-smooth">
      <OwnerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-text-primary/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <div className="min-h-screen flex flex-col lg:pl-64">
        <OwnerTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 pt-16">
          <Outlet />
        </main>

        <footer className="border-t border-border-subtle bg-surface-warm/50 px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-text-muted">
            <span className="font-semibold text-text-secondary">NearNest Business Hub</span>
            <div className="flex items-center gap-4">
              <span>Frontend preview · sample data only</span>
              <Link to="/" className="text-primary hover:text-teal-deep font-semibold">
                Public directory
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
