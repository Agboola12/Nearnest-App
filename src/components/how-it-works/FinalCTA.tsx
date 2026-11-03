import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Compass,
  Landmark,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DirectoryLink {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
}

const DIRECTORY_LINKS: DirectoryLink[] = [
  {
    label: 'Local services',
    description: 'Trades, wellness and home help',
    to: '/services',
    icon: Wrench,
  },
  {
    label: 'Churches & schools',
    description: 'Community and education',
    to: '/churches-and-schools',
    icon: Landmark,
  },
  {
    label: 'Shops & retail',
    description: 'Independent neighbourhood stores',
    to: '/shops',
    icon: ShoppingBag,
  },
  {
    label: 'Search everything',
    description: 'Find any place by name or area',
    to: '/search',
    icon: Search,
  },
];

export const FinalCTA: React.FC = () => {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-surface-base px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-text-primary px-6 py-10 text-white shadow-floating sm:px-10 sm:py-12 lg:px-16 lg:py-16">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-tertiary/20 blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-light">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Start exploring
              </div>

              <h2
                id="final-cta-heading"
                className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[2.6rem] lg:leading-[1.15]"
              >
                Your neighbourhood is waiting.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Discover trusted local businesses, compare what they offer and book the time that
                suits you — all in one place. No account required to start looking.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-light hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-text-primary active:scale-95 sm:text-base"
                >
                  <Compass className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  Explore Businesses
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-text-primary active:scale-95 sm:text-base"
                >
                  Browse services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-teal-light" aria-hidden="true" />
                  Verified local places
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarCheck className="h-4 w-4 text-teal-light" aria-hidden="true" />
                  Real appointment availability
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-teal-light" aria-hidden="true" />
                  Free to browse
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/50">
                Jump straight in
              </p>
              <ul className="space-y-1.5">
                {DIRECTORY_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-teal-light">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-white">
                            {link.label}
                          </span>
                          <span className="block text-[11px] text-white/50">
                            {link.description}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
