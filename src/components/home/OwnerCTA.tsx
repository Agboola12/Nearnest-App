import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Store, Lock } from 'lucide-react';

export const OwnerCTA: React.FC = () => {
  return (
    <section className="w-full bg-surface-base py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-surface-card border border-border-subtle overflow-hidden shadow-xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold mb-4 border border-secondary-fixed/40">
              <Store className="w-4 h-4" />
              <span>For Place Owners &amp; Administrators</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
              Own a local business, church, or school? Put your place on NearNest.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary mb-8 leading-relaxed">
              Join thousands of neighborhood pillars who use NearNest to connect with local residents, accept automated bookings, and maintain verified civic credibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Free Profile</h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Permanent civic directory presence without subscription traps.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Local Visibility</h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Reach real neighbors searching within your exact postcode radius.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Appointment Tools</h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Sync calendars and accept appointment requests effortlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/owner/listings/new"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Add a Place or Business</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-warm hover:bg-surface-container border border-border-subtle text-text-primary font-semibold text-sm transition-all active:scale-95"
              >
                <span>Learn Provider Standards</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Badge Panel */}
          <div className="w-full lg:w-96 flex flex-col gap-4 bg-surface-warm/70 border border-border-subtle p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-wash border border-teal-light/20 flex items-center justify-center text-primary font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Merchant &amp; Parish Hub</p>
                  <p className="text-xs text-text-muted">Instant verification queue</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text text-xs font-bold">
                Fast-track
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Average review turnaround</span>
                <span className="font-semibold text-text-primary">Under 4 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Booking fee on free tiers</span>
                <span className="font-semibold text-status-confirmed-text">0% Commission</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Verified civic badge included</span>
                <span className="font-semibold text-primary">Yes</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border-subtle flex items-start gap-3 bg-surface-card p-3 rounded-xl border border-border-subtle/80">
              <Lock className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                Direct verification ensures zero hijacked phone numbers or unapproved duplicate entries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
