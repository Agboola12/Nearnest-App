import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { OwnerSidebar } from '../components/owner/OwnerSidebar';
import { OwnerTopbar } from '../components/owner/OwnerTopbar';
import { OWNER_NOTIFICATIONS } from '../data/mockOwnerDashboard';
import { OwnerNotification } from '../types';

export interface OwnerOutletContext {
  notifications: OwnerNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const SECTION_IDS = ['overview', 'appointments', 'businesses', 'services', 'notifications'];

export const OwnerLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [notifications, setNotifications] = useState<OwnerNotification[]>(OWNER_NOTIFICATIONS);

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;
  const isAppointmentsPage = location.pathname === '/owner/appointments';
  const navigationSection = isAppointmentsPage ? 'appointments' : activeSection;

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const sectionId = location.hash.replace('#', '');
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.key, location.pathname]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-104px 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  const markNotificationRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const outletContext: OwnerOutletContext = {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return (
    <div className="min-h-screen bg-surface-base font-sans text-on-surface scroll-smooth">
      <OwnerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={navigationSection}
        unreadNotifications={unreadCount}
        onNavigate={setActiveSection}
      />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-text-primary/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <div className="min-h-screen flex flex-col lg:pl-64">
        <OwnerTopbar
          onMenuClick={() => setSidebarOpen(true)}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={markAllNotificationsRead}
          activeSection={navigationSection}
        />

        <main className="flex-1 pt-16">
          <Outlet context={outletContext} />
        </main>

        <footer className="border-t border-border-subtle bg-surface-warm/50 px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-text-muted">
            <span className="font-semibold text-text-secondary">NearNest Business Hub</span>
            <div className="flex items-center gap-4">
              <span>Frontend preview · sample data only</span>
              <Link to="/account" className="text-primary hover:text-teal-deep font-semibold">
                Personal account
              </Link>
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
