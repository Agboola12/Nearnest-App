import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Settings2,
  ShieldCheck,
  Store,
  X,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { OWNER_PROFILE } from '../../data/mockOwnerDashboard';

interface OwnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sectionLinks = [
  { label: 'Appointments', href: '#appointments', icon: CalendarDays },
  { label: 'Services & listings', href: '#listings', icon: Store },
  { label: 'Verification', href: '#readiness', icon: ShieldCheck },
];

export const OwnerSidebar: React.FC<OwnerSidebarProps> = ({ isOpen, onClose }) => {
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
          <span className="w-9 h-9 rounded-lg bg-teal-wash text-primary flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-text-primary truncate">
              {OWNER_PROFILE.businessName}
            </span>
            <span className="block text-[11px] font-semibold text-status-confirmed-text mt-0.5">
              Verified listing
            </span>
          </span>
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        </Link>

        <div className="mt-6 px-2">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
            Workspace
          </p>
          <nav className="space-y-1">
            <NavLink
              to="/owner"
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-surface-card text-primary font-semibold shadow-subtle border border-border-subtle'
                    : 'text-text-secondary hover:bg-surface-container hover:text-text-primary border border-transparent'
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </NavLink>

            {sectionLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-container hover:text-text-primary border border-transparent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </a>
              );
            })}
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
            Add new listing
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
            <p className="text-[11px] text-text-muted truncate">Business owner</p>
          </div>
          <Link
            to="/account"
            aria-label="Account settings"
            className="p-1.5 rounded-lg text-text-muted hover:bg-surface-container hover:text-text-primary transition-colors"
          >
            <Settings2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
