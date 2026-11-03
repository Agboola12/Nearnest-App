import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CalendarClock, ChevronRight, ExternalLink, Menu, ShieldCheck } from 'lucide-react';
import { OWNER_PROFILE } from '../../data/mockOwnerDashboard';

interface OwnerTopbarProps {
  onMenuClick: () => void;
}

export const OwnerTopbar: React.FC<OwnerTopbarProps> = ({ onMenuClick }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-1 rounded-xl text-text-primary hover:bg-surface-warm border border-border-subtle transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="flex items-center gap-2 text-sm min-w-0" aria-label="Breadcrumb">
            <span className="hidden sm:inline text-text-muted font-medium">Provider Portal</span>
            <ChevronRight className="hidden sm:inline w-4 h-4 text-text-muted" />
            <span className="font-semibold text-text-primary truncate">Overview</span>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-wash text-teal-deep text-[11px] font-semibold border border-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Demo workspace
          </span>

          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-surface-warm hover:text-text-primary border border-transparent hover:border-border-subtle transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View public site
          </Link>

          <div className="relative">
            {notificationsOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
                aria-hidden="true"
              />
            )}
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative z-50 p-2.5 rounded-xl text-text-secondary hover:bg-surface-warm hover:text-text-primary border border-border-subtle bg-surface-card transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-card" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-border-subtle bg-surface-card shadow-floating overflow-hidden">
                <div className="px-4 py-3 border-b border-border-subtle">
                  <p className="text-sm font-bold text-text-primary">Notifications</p>
                  <p className="text-[11px] text-text-muted">2 items need your attention</p>
                </div>
                <a
                  href="#appointments"
                  onClick={() => setNotificationsOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-surface-warm transition-colors border-b border-border-subtle"
                >
                  <span className="w-8 h-8 rounded-lg bg-status-pending-bg text-status-pending-text flex items-center justify-center shrink-0">
                    <CalendarClock className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-text-primary">
                      2 appointment requests
                    </span>
                    <span className="block text-[11px] text-text-muted mt-0.5">
                      Elena and Grace are waiting for approval.
                    </span>
                  </span>
                </a>
                <a
                  href="#readiness"
                  onClick={() => setNotificationsOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-surface-warm transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-teal-wash text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-text-primary">
                      Finish your listing setup
                    </span>
                    <span className="block text-[11px] text-text-muted mt-0.5">
                      Connect your calendar to prevent double bookings.
                    </span>
                  </span>
                </a>
              </div>
            )}
          </div>

          <Link
            to="/account"
            aria-label="Owner account"
            className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-border-subtle hover:opacity-90 transition-opacity"
          >
            <img
              src={OWNER_PROFILE.avatar}
              alt={OWNER_PROFILE.fullName}
              className="w-8 h-8 rounded-full object-cover border border-border-subtle"
            />
            <span className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-text-primary leading-tight">
                {OWNER_PROFILE.fullName}
              </span>
              <span className="text-[10px] text-text-muted leading-tight">Owner</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
