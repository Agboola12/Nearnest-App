import React from 'react';
import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/common/SiteHeader';
import { SiteFooter } from '../components/common/SiteFooter';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface">
      <SiteHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
