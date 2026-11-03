import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  Compass,
  LayoutDashboard,
  MapPin,
  Scale,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}

const BENEFITS: Benefit[] = [
  {
    title: 'Discover local businesses easily',
    description:
      'Find trusted shops, tradespeople and community places by name, category or location.',
    icon: Compass,
    iconClassName: 'bg-teal-wash text-primary',
  },
  {
    title: 'Compare services and prices',
    description:
      'See service menus, starting prices, durations and reviews side by side before you decide.',
    icon: Scale,
    iconClassName: 'bg-secondary-fixed text-on-secondary-fixed',
  },
  {
    title: 'Find businesses near your location',
    description:
      'Filter by your area or postcode to support the providers closest to home.',
    icon: MapPin,
    iconClassName: 'bg-tertiary-fixed/50 text-tertiary',
  },
  {
    title: 'Book appointments conveniently',
    description:
      'Choose a real date and time from live availability instead of calling around.',
    icon: CalendarClock,
    iconClassName: 'bg-status-confirmed-bg text-status-confirmed-text',
  },
  {
    title: 'Manage appointments in one place',
    description:
      'View upcoming bookings, reschedule and keep your calendar tidy from your account.',
    icon: LayoutDashboard,
    iconClassName: 'bg-surface-warm text-teal-deep',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="border-b border-border-subtle bg-surface-base px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-teal-wash px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-deep">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Everyday benefits
            </div>
            <h2
              id="benefits-heading"
              className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
            >
              Less searching. More living locally.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
              NearNest keeps the useful details in one place, so choosing a local business feels
              straightforward — whether you need a haircut, a plumber or a community hall.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-primary transition-colors hover:text-teal-deep sm:self-auto"
          >
            Browse local services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${benefit.iconClassName}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-text-primary">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {benefit.description}
                </p>
              </article>
            );
          })}

          {/* CTA tile completes the grid */}
          <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-text-primary p-6 text-white shadow-elevated">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl"
            />
            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-teal-light">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight">
                Ready to see what&apos;s nearby?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Explore the full neighbourhood directory and find your next local favourite.
              </p>
            </div>
            <Link
              to="/"
              className="relative mt-5 inline-flex items-center gap-1.5 self-start rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-light hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-text-primary active:scale-95"
            >
              Explore businesses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};
