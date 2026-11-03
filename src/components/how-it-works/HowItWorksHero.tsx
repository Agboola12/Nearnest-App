import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Compass,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react';
import { HowItWorksIllustration } from './HowItWorksIllustration';

export const HowItWorksHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-surface-base px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-wash via-surface-warm to-transparent opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-tertiary-fixed/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-text-muted">
          <Link to="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-semibold text-text-primary">How It Works</span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3.5 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">
                How NearNest works
              </span>
              <span className="h-1 w-1 rounded-full bg-border-subtle" />
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Civic-verified directory
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-text-primary sm:text-4xl lg:text-[3.1rem]">
              Everything local,
              <span className="block text-primary">in four simple steps.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              NearNest brings verified neighbourhood businesses, services, churches and schools
              together in one friendly directory — so you can compare what&apos;s nearby and book the
              right time in a few clicks.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-deep hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 active:scale-95 sm:text-base"
              >
                <Compass className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                Explore Businesses
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#for-businesses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-card px-6 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 active:scale-95 sm:text-base"
              >
                <Store className="h-4 w-4 text-primary sm:h-5 sm:w-5" aria-hidden="true" />
                For business owners
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4 text-primary" aria-hidden="true" />
                No account needed to browse
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                Verified local listings
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                Free for neighbours to use
              </span>
            </div>
          </div>

          <div className="lg:pl-4">
            <HowItWorksIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
