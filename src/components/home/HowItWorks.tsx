import React from 'react';
import { Compass, SearchCheck, CalendarCheck, ShieldCheck, StarOff, BellRing } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="w-full bg-surface-warm py-20 px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-wash text-teal-deep text-xs uppercase tracking-wider font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Reliable Neighborhood Mechanism</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            How NearNest Works
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-3">
            Designed to eliminate stale opening hours, unreachable desk phones, and chaotic calendar coordination.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-teal-wash border border-teal-light/20 flex items-center justify-center text-primary">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-4xl font-extrabold text-surface-container-highest select-none tracking-tighter">
                  01
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                1. Search Your Area
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Filter with postal-code precision across certified trade businesses, local shops, parish communities, and schools with verified physical presence.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-subtle/70 bg-surface-warm/50 rounded-xl p-3 flex items-center gap-2 border border-border-subtle">
              <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0" />
              <span className="text-xs font-semibold text-text-secondary">
                100% verified location badges
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed border border-secondary/20 flex items-center justify-center text-on-secondary-fixed">
                  <SearchCheck className="w-7 h-7" />
                </div>
                <span className="text-4xl font-extrabold text-surface-container-highest select-none tracking-tighter">
                  02
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                2. Discover & Compare
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Read transparent customer reviews, inspect real-time opening hours, view term dates, and review parish community programs without paywalls.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-subtle/70 bg-surface-warm/50 rounded-xl p-3 flex items-center gap-2 border border-border-subtle">
              <StarOff className="w-4 h-4 text-teal-deep shrink-0" />
              <span className="text-xs font-semibold text-text-secondary">
                No manipulated or fake star ratings
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed/30 border border-tertiary-fixed/40 flex items-center justify-center text-tertiary">
                  <CalendarCheck className="w-7 h-7" />
                </div>
                <span className="text-4xl font-extrabold text-surface-container-highest select-none tracking-tighter">
                  03
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                3. Connect & Book
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Select real-time calendar slots for barber cuts, clinics, and trades, or request community venue tours with direct provider confirmation.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-subtle/70 bg-surface-warm/50 rounded-xl p-3 flex items-center gap-2 border border-border-subtle">
              <BellRing className="w-4 h-4 text-teal-deep shrink-0" />
              <span className="text-xs font-semibold text-text-secondary">
                Instant SMS & calendar confirmation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
