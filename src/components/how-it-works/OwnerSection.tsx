import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Store,
  UserPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface OwnerStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

const OWNER_STEPS: OwnerStep[] = [
  {
    title: 'Join NearNest',
    description: 'Create a free owner account and tell us a little about your business.',
    icon: UserPlus,
  },
  {
    title: 'Add your business',
    description: 'Add your name, location, opening hours and photos to join the directory.',
    icon: Store,
  },
  {
    title: 'List services and prices',
    description: 'Publish what you offer, how long it takes and your starting prices.',
    icon: ClipboardList,
  },
  {
    title: 'Receive appointment requests',
    description: 'Get notified when neighbours request a booking, with all the details you need.',
    icon: Inbox,
  },
  {
    title: 'Manage your bookings',
    description: 'Confirm, reschedule or cancel appointments from one simple owner dashboard.',
    icon: CalendarCheck,
  },
];

export const OwnerSection: React.FC = () => {
  return (
    <section
      id="for-businesses"
      aria-labelledby="owner-section-heading"
      className="scroll-mt-24 border-b border-border-subtle bg-surface-warm px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-elevated">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Owner content */}
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/60 bg-secondary-fixed px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-secondary-fixed">
                <Store className="h-3.5 w-3.5" aria-hidden="true" />
                For business owners
              </div>

              <h2
                id="owner-section-heading"
                className="mt-4 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
              >
                Bring your business into the neighbourhood loop.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Join local shops, trades, churches and schools using NearNest to be found by
                nearby residents, take appointment requests and keep their listing up to date.
              </p>

              <ol className="mt-8 space-y-5">
                {OWNER_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title} className="relative flex gap-4">
                      {index < OWNER_STEPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[19px] top-11 h-[calc(100%_-_1rem)] w-px bg-border-subtle"
                        />
                      )}
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-light/20 bg-teal-wash text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-sm font-bold text-text-primary sm:text-base">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-text-secondary sm:text-sm">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/owner/listings/new"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-deep hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 active:scale-95"
                >
                  <Store className="h-4 w-4" aria-hidden="true" />
                  Add your business
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/owner"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-warm px-5 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 active:scale-95"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" aria-hidden="true" />
                  Owner dashboard
                </Link>
              </div>

              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Free profile
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  0% commission on free listings
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Verified civic badge
                </span>
              </p>
            </div>

            {/* Owner preview panel */}
            <div className="relative overflow-hidden bg-text-primary p-7 text-white sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-tertiary/20 blur-3xl"
              />

              <div className="relative flex h-full flex-col justify-center">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-teal-light">
                      Your owner workspace
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight">
                      Your listing, at a glance
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-status-confirmed-bg px-2.5 py-1 text-[10px] font-bold text-status-confirmed-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-confirmed-text" />
                    Live
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                      <Store className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">The Heritage Barber &amp; Co</p>
                      <p className="mt-0.5 text-[11px] text-white/60">
                        Barber &amp; Grooming · Richmond, London
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-white/5 px-3 py-2.5">
                      <p className="text-lg font-extrabold text-white">4</p>
                      <p className="text-[10px] text-white/60">Services listed</p>
                    </div>
                    <div className="rounded-xl bg-white/5 px-3 py-2.5">
                      <p className="text-lg font-extrabold text-white">128</p>
                      <p className="text-[10px] text-white/60">Views this week</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4 text-teal-light" aria-hidden="true" />
                      <div>
                        <p className="text-[11px] font-semibold text-white">Next appointment</p>
                        <p className="text-[10px] text-white/60">Sat, 10:30 AM · Skin fade</p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white">
                      Confirm
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-tertiary-fixed" aria-hidden="true" />
                  <p className="text-[11px] leading-relaxed text-white/70">
                    Listings are reviewed before going live, so neighbours know the business,
                    location and contact details are genuine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
