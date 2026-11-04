import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Store,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { OWNER_PROFILE } from '../../data/mockOwnerDashboard';

interface OwnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  unreadNotifications: number;
  onNavigate: (section: string) => void;
}

const sectionLinks = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointment Management', icon: CalendarDays },
  { id: 'businesses', label: 'My Businesses', icon: Store },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export const OwnerSidebar: React.FC<OwnerSidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  unreadNotifications,
  onNavigate,
}) => {
  const location = useLocation();
  const isListingWizard = location.pathname === '/owner/listings/new';
  const isAppointmentsPage = location.pathname === '/owner/appointments';

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-warm border-r border-border-subtle flex flex-col overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0 shadow-floating' : '-translate-x-full'
      }`}
      aria-label="Business owner navigation"
    >
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between gap-2 px-1 pb-5">
          <BrandLogo to="/owner" subtext="Business Hub" />
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Link
          to="/listing/the-heritage-barber-and-co"
          className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-surface-card p-2.5 shadow-subtle hover:border-primary/40 hover:shadow-elevated transition-all"
        >
          <img
            src={OWNER_PROFILE.businessLogo}
            alt={OWNER_PROFILE.businessName}
            className="w-9 h-9 rounded-lg object-cover border border-border-subtle shrink-0"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-text-primary truncate">
              {OWNER_PROFILE.businessName}
            </span>
            <span className="block text-[11px] font-semibold text-status-confirmed-text mt-0.5">
              Verified business
            </span>
          </span>
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        </Link>

        <div className="mt-6 px-2">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
            Business workspace
          </p>
          <nav className="space-y-1">
            {sectionLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isListingWizard
                ? link.id === 'businesses'
                : isAppointmentsPage
                  ? link.id === 'appointments'
                  : activeSection === link.id;
              const isNotifications = link.id === 'notifications';
              const href =
                link.id === 'appointments' ? '/owner/appointments' : `/owner#${link.id}`;

              return (
                <Link
                  key={link.id}
                  to={href}
                  onClick={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'bg-surface-card text-primary font-semibold shadow-subtle border border-border-subtle'
                      : 'text-text-secondary hover:bg-surface-container hover:text-text-primary border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{link.label}</span>
                  {isNotifications && unreadNotifications > 0 && (
                    <span className="min-w-[20px] px-1.5 py-0.5 rounded-full bg-status-pending-bg text-status-pending-text text-[10px] font-bold text-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 mt-2 border-t border-border-subtle">
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-container hover:text-text-primary border border-transparent transition-colors"
              >
                <UserRound className="w-5 h-5" />
                <span className="flex-1">Personal Account</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-6 px-2">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
            Grow your presence
          </p>
          <Link
            to="/owner/listings/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Add Business
          </Link>
        </div>
      </div>

      <div className="mt-auto px-4 pb-5 pt-6 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-container hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Public directory
        </Link>

        <Link
          to="/auth"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-status-rejected-bg/50 hover:text-status-rejected-text transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Link>

        <div className="border-t border-border-subtle pt-3 mt-3 flex items-center gap-3 px-1">
          <img
            src={OWNER_PROFILE.avatar}
            alt={OWNER_PROFILE.fullName}
            className="w-9 h-9 rounded-full object-cover border border-border-subtle shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary truncate">
              {OWNER_PROFILE.fullName}
            </p>
            <p className="text-[11px] text-text-muted truncate">
              One account · personal + business
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
