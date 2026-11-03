import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  LogIn,
  Search,
  ShieldCheck,
  Store,
  UserCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface JourneyStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  highlights: string[];
}

const USER_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Search for local businesses and services in your neighbourhood.',
    icon: Search,
    iconClassName: 'bg-teal-wash border-teal-light/20 text-primary',
    highlights: ['Search by name, service or category', 'Use your location or postcode'],
  },
  {
    step: '02',
    title: 'Explore',
    description:
      'View business profiles, services, prices, locations and reviews before you decide.',
    icon: Store,
    iconClassName: 'bg-secondary-fixed border-secondary/20 text-on-secondary-fixed',
    highlights: ['Real service menus and prices', 'Reviews, photos and location details'],
  },
  {
    step: '03',
    title: 'Book',
    description: 'Choose the service you need, pick a date and select an available time.',
    icon: CalendarCheck,
    iconClassName: 'bg-tertiary-fixed/40 border-tertiary-fixed/50 text-tertiary',
    highlights: ['Pick a real-time available slot', 'Add a note for the provider'],
  },
  {
    step: '04',
    title: 'Connect',
    description:
      'Sign in when required to confirm the booking, then manage all your appointments.',
    icon: UserCheck,
    iconClassName: 'bg-status-confirmed-bg border-status-confirmed-text/20 text-status-confirmed-text',
    highlights: ['Sign in only when you confirm', 'Track everything from your account'],
  },
];

export const UserSteps: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="user-steps-heading"
      className="scroll-mt-24 border-b border-border-subtle bg-surface-warm px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-teal-wash px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-deep">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            For neighbours
          </div>
          <h2
            id="user-steps-heading"
            className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
          >
            From first search to confirmed booking
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            Four clear steps, with no dead-end phone calls and no stale opening hours. Browse
            freely — you only need an account when you are ready to confirm.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed border-border-subtle lg:block"
          />

          <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {USER_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.step}
                  className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${step.iconClassName}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="select-none text-4xl font-extrabold tracking-tighter text-surface-container-highest">
                      {step.step}
                    </span>
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                    Step {step.step}
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-border-subtle/80 pt-4">
                    {step.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs font-medium text-text-secondary"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-card px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-wash text-primary">
              <LogIn className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">
                Browsing is always open
              </p>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-text-secondary sm:text-sm">
                You can explore the directory and compare providers without signing in. NearNest
                only asks you to sign in when you confirm a booking or manage your appointments.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3 pl-13 sm:pl-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 active:scale-95"
            >
              Start exploring
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border-subtle bg-surface-warm px-4 py-2.5 text-xs font-semibold text-text-primary transition-all hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 active:scale-95"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
