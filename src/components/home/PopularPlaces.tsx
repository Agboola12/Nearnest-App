import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, Calendar, ArrowRight, Clock, Users, School } from 'lucide-react';
import { FEATURED_LISTINGS } from '../../data/mockListings';
import { Listing } from '../../types';

export const PopularPlaces: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'top_rated' | 'instant'>('all');

  const filteredListings = FEATURED_LISTINGS.filter((item) => {
    if (activeFilter === 'top_rated') return (item.rating || 0) >= 4.8;
    if (activeFilter === 'instant') return item.isBookable;
    return true;
  });

  const getActionLink = (listing: Listing) => {
    if (listing.isBookable) {
      return `/booking/${listing.slug}`;
    }
    return `/listing/${listing.slug}`;
  };

  return (
    <section className="w-full bg-surface-base py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Filter Chips */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-deep" />
              <span className="text-xs uppercase tracking-wider text-text-secondary font-bold">
                Real-time Directory Feed
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Popular Places Nearby
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-surface-warm/80 p-1 rounded-full border border-border-subtle self-start lg:self-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'trending', label: 'Trending today' },
              { id: 'top_rated', label: 'Top rated' },
              { id: 'instant', label: 'Instant booking' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-text-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-card'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <article
              key={listing.id}
              className="flex flex-col justify-between bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border-subtle hover:border-primary/40"
            >
              <div>
                {/* Image & Top Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-surface-container">
                  <img
                    src={listing.coverImage}
                    alt={listing.coverAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-text-primary text-[11px] font-semibold shadow-sm">
                      {listing.categoryLabel}
                    </span>
                  </div>

                  {listing.isVerified && listing.verificationBadgeText && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-bold shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {listing.verificationBadgeText}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    {/* Render rating only when available */}
                    {listing.rating ? (
                      <div className="flex items-center gap-1 text-tertiary font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{listing.rating.toFixed(1)}</span>
                        <span className="text-text-muted font-normal">
                          ({listing.reviewCount} reviews)
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-text-secondary inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        {listing.verificationBadgeText || 'Local Fixture'}
                      </span>
                    )}
                    <span className="text-text-muted font-mono text-[11px] font-medium">
                      {listing.distance}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                    {listing.name}
                  </h3>

                  {/* Operational status details */}
                  <div className="mt-3 space-y-1">
                    {listing.isBookable && listing.bookingStatusText ? (
                      <div className="flex items-center gap-1.5 text-status-confirmed-text text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{listing.bookingStatusText}</span>
                      </div>
                    ) : listing.openingHoursText ? (
                      <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                        <Clock className="w-3.5 h-3.5 text-teal-deep shrink-0" />
                        <span>{listing.openingHoursText}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                        {listing.category === 'churches' ? (
                          <Calendar className="w-3.5 h-3.5 text-tertiary shrink-0" />
                        ) : (
                          <School className="w-3.5 h-3.5 text-teal-deep shrink-0" />
                        )}
                        <span className="font-medium">{listing.bookingStatusText}</span>
                      </div>
                    )}

                    {listing.secondaryNote && (
                      <p className="text-xs text-text-muted italic pt-0.5">
                        {listing.secondaryNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  to={getActionLink(listing)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                    listing.isBookable
                      ? 'bg-primary hover:bg-teal-deep text-white shadow-sm hover:shadow'
                      : 'bg-surface-warm hover:bg-surface-container border border-border-subtle text-text-primary'
                  }`}
                >
                  {listing.isBookable ? (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{listing.actionText}</span>
                    </>
                  ) : (
                    <>
                      <span>{listing.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
