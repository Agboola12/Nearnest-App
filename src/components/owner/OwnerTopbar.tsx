import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  CalendarCheck2,
  CalendarClock,
  ChevronRight,
  ExternalLink,
  Menu,
  Star,
  Wrench,
} from 'lucide-react';
import { OWNER_PROFILE } from '../../data/mockOwnerDashboard';
import { OwnerNotification, OwnerNotificationType } from '../../types';

interface OwnerTopbarProps {
  onMenuClick: () => void;
  notifications: OwnerNotification[];
  unreadCount: number;
  onMarkAllRead: () => void;
  activeSection: string;
}

const sectionLabels: Record<string, string> = {
  overview: 'Overview',
  appointments: 'Appointments',
  businesses: 'My Businesses',
  services: 'Services',
  notifications: 'Notifications',
  readiness: 'Setup checklist',
};

const notificationIcons: Record<
  OwnerNotificationType,
  { icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  booking: {
    icon: CalendarClock,
    tone: 'bg-status-pending-bg text-status-pending-text',
  },
  appointment: {
    icon: CalendarCheck2,
    tone: 'bg-status-confirmed-bg text-status-confirmed-text',
  },
  review: {
    icon: Star,
    tone: 'bg-badge-amber-bg text-badge-amber-text',
  },
  system: {
    icon: Wrench,
    tone: 'bg-surface-container text-text-secondary',
  },
};

export const OwnerTopbar: React.FC<OwnerTopbarProps> = ({
  onMenuClick,
  notifications,
  unreadCount,
  onMarkAllRead,
  activeSection,
}) => {
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const previewNotifications = notifications.slice(0, 4);
  const isListingWizard = location.pathname === '/owner/listings/new';
  const breadcrumbLabel = isListingWizard
    ? 'Create a listing'
    : sectionLabels[activeSection] ?? 'Overview';

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
            <span className="hidden sm:inline text-text-muted font-medium">Business Hub</span>
            <ChevronRight className="hidden sm:inline w-4 h-4 text-text-muted" />
            <span className="font-semibold text-text-primary truncate">
              {breadcrumbLabel}
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-wash text-teal-deep text-[11px] font-semibold border border-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Personal + business account
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
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative z-50 p-2.5 rounded-xl text-text-secondary hover:bg-surface-warm hover:text-text-primary border border-border-subtle bg-surface-card transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-surface-card">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-border-subtle bg-surface-card shadow-floating overflow-hidden">
                <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border-subtle">
                  <div>
                    <p className="text-sm font-bold text-text-primary">Notifications</p>
                    <p className="text-[11px] text-text-muted">
                      {unreadCount > 0
                        ? `${unreadCount} item${unreadCount === 1 ? '' : 's'} need your attention`
                        : 'You are all caught up'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    disabled={unreadCount === 0}
                    className="text-[11px] font-semibold text-primary hover:text-teal-deep disabled:text-text-muted disabled:cursor-not-allowed"
                  >
                    Mark all read
                  </button>
                </div>

                {previewNotifications.map((notification) => {
                  const style = notificationIcons[notification.type];
                  const Icon = style.icon;

                  return (
                    <Link
                      key={notification.id}
                      to="/owner#notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-surface-warm transition-colors border-b border-border-subtle ${
                        notification.isRead ? '' : 'bg-teal-wash/25'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${style.tone}`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold text-text-primary">
                          {notification.title}
                        </span>
                        <span className="block text-[11px] text-text-muted mt-0.5 line-clamp-2">
                          {notification.message}
                        </span>
                        <span className="block text-[10px] text-text-muted mt-1">
                          {notification.time}
                        </span>
                      </span>
                    </Link>
                  );
                })}

                <Link
                  to="/owner#notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="flex items-center justify-center gap-1 px-4 py-3 text-xs font-semibold text-primary hover:bg-surface-warm transition-colors"
                >
                  View all notifications
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/account"
            aria-label="Return to personal account"
            title="Return to personal account"
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
              <span className="text-[10px] text-text-muted leading-tight">
                Personal account
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
