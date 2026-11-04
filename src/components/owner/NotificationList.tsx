import React from 'react';
import {
  BellRing,
  CalendarCheck2,
  CalendarPlus,
  CheckCheck,
  Star,
  Wrench,
} from 'lucide-react';
import { OwnerNotification, OwnerNotificationType } from '../../types';

interface NotificationListProps {
  notifications: OwnerNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const notificationStyles: Record<
  OwnerNotificationType,
  { icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  booking: {
    icon: CalendarPlus,
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

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
}) => {
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <section
      id="notifications"
      className="rounded-2xl border border-border-subtle bg-surface-card shadow-subtle scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 lg:p-6 border-b border-border-subtle">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
            <BellRing className="w-3.5 h-3.5" />
            Activity
          </p>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-text-primary">Notifications</h2>
          <p className="mt-1 text-sm text-text-secondary">
            New bookings, appointment changes and customer updates in one place.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-wash text-teal-deep text-[11px] font-bold">
            {unreadCount} unread
          </span>
          <button
            type="button"
            onClick={onMarkAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-subtle bg-surface-card text-text-secondary text-xs font-semibold hover:bg-surface-warm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="p-10 text-center">
          <span className="w-12 h-12 rounded-xl bg-teal-wash text-primary flex items-center justify-center mx-auto mb-4">
            <BellRing className="w-6 h-6" />
          </span>
          <h3 className="text-lg font-bold text-text-primary">You are all caught up</h3>
          <p className="mt-1 text-sm text-text-secondary">
            New booking requests and appointment updates will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border-subtle">
          {notifications.map((notification) => {
            const style = notificationStyles[notification.type];
            const Icon = style.icon;

            return (
              <li key={notification.id}>
                <button
                  type="button"
                  onClick={() => onMarkRead(notification.id)}
                  className={`w-full text-left flex items-start gap-3 px-5 lg:px-6 py-4 transition-colors hover:bg-surface-warm/60 ${
                    notification.isRead ? 'bg-surface-card' : 'bg-teal-wash/30'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.tone}`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span
                        className={`text-sm ${
                          notification.isRead
                            ? 'font-semibold text-text-secondary'
                            : 'font-bold text-text-primary'
                        }`}
                      >
                        {notification.title}
                      </span>
                      <span className="text-[10px] font-medium text-text-muted whitespace-nowrap shrink-0">
                        {notification.time}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                      {notification.message}
                    </span>
                  </span>
                  {!notification.isRead && (
                    <span
                      className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"
                      aria-label="Unread notification"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
