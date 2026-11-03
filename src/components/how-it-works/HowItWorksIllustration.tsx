import React from 'react';
import {
  CalendarCheck,
  Check,
  MapPin,
  Navigation,
  Scissors,
  Search,
  ShieldCheck,
  Star,
} from 'lucide-react';

/**
 * Decorative hero graphic for the How It Works page.
 * A stylised slice of the NearNest product: search, map, a local result,
 * and the booking confirmation card that closes the loop.
 */
export const HowItWorksIllustration: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-teal-wash via-surface-warm to-tertiary-fixed/40 blur-2xl"
      />

      {/* Main app card */}
      <div className="relative -rotate-1 rounded-[1.75rem] border border-border-subtle bg-surface-card p-3.5 shadow-floating transition-transform duration-500 hover:rotate-0 sm:p-4">
        {/* Search bar */}
        <div className="flex items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface-warm/80 px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <Search className="h-4 w-4 shrink-0 text-teal-deep" aria-hidden="true" />
            <span className="truncate text-xs font-semibold text-text-primary">
              Haircut near me
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border-subtle bg-surface-card px-2 py-1 text-[10px] font-semibold text-text-secondary shadow-sm">
            <Navigation className="h-3 w-3 text-primary" aria-hidden="true" />
            Near me
          </span>
        </div>

        {/* Map canvas */}
        <div className="relative mt-3 h-48 overflow-hidden rounded-xl border border-border-subtle bg-teal-wash/70 sm:h-56">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Stylised roads */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 240"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M-20 70 C80 55 120 120 210 110 S330 60 420 90"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M-20 70 C80 55 120 120 210 110 S330 60 420 90"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="7 8"
            />
            <path
              d="M90 -20 C105 60 70 140 130 260"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M300 -20 C285 70 330 150 290 260"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M-20 180 C90 165 200 200 420 160"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Route from user to business */}
            <path
              d="M118 172 C150 150 178 132 212 108"
              fill="none"
              stroke="#0D9488"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 7"
            />
          </svg>

          {/* User location */}
          <div className="absolute bottom-[22%] left-[24%] flex -translate-x-1/2 items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-md">
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="rounded-full border border-border-subtle bg-surface-card px-2 py-0.5 text-[10px] font-bold text-text-primary shadow-sm">
              You
            </span>
          </div>

          {/* Business pin */}
          <div className="absolute left-[56%] top-[26%] flex -translate-x-1/2 flex-col items-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-text-primary text-white shadow-md">
              <Scissors className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="mt-1 rounded-full border border-border-subtle bg-surface-card px-2 py-0.5 text-[10px] font-bold text-text-primary shadow-sm">
              Barber
            </span>
          </div>

          {/* Second business pin */}
          <div className="absolute right-[12%] top-[52%] flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-tertiary text-white shadow-md">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          </div>

          {/* Area label */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-card/95 px-2.5 py-1 text-[10px] font-semibold text-text-secondary shadow-sm backdrop-blur">
            <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
            Richmond, London
          </div>
        </div>

        {/* Local result card */}
        <div className="relative z-10 -mt-5 mx-1 flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-card p-3 shadow-elevated sm:mx-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-light/20 bg-teal-wash text-primary">
            <Scissors className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-text-primary sm:text-sm">
              The Heritage Barber &amp; Co
            </p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[10px] text-text-muted sm:text-[11px]">
              <span className="inline-flex items-center gap-0.5 text-text-secondary">
                <Star className="h-3 w-3 fill-tertiary text-tertiary" aria-hidden="true" />
                4.9
              </span>
              <span aria-hidden="true">·</span>
              <span>0.4 miles</span>
              <span aria-hidden="true">·</span>
              <span className="text-status-confirmed-text">Open today</span>
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-primary px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm sm:text-[11px]">
            Book
          </span>
        </div>
      </div>

      {/* Booking confirmed floating card */}
      <div className="absolute -bottom-6 right-0 z-20 w-48 rounded-2xl border border-border-subtle bg-surface-card p-3 shadow-floating sm:-right-6 sm:w-52">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-status-confirmed-bg text-status-confirmed-text">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-text-primary">Booking confirmed</p>
            <p className="text-[10px] text-text-muted">Sat, 10:30 AM</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-surface-warm px-2 py-1.5 text-[10px] font-medium text-text-secondary">
          <CalendarCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Added to your appointments
        </div>
      </div>

      {/* Verified badge floating top-left */}
      <div className="absolute -left-2 top-20 z-20 hidden items-center gap-1.5 rounded-full border border-border-subtle bg-surface-card px-2.5 py-1.5 text-[10px] font-bold text-text-primary shadow-elevated sm:-left-5 sm:flex">
        <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Civic verified
      </div>
    </div>
  );
};
