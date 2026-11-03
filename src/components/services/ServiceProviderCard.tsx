import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, MapPin, Star } from 'lucide-react';
import { Listing } from '../../types';

interface ServiceProviderCardProps {
  listing: Listing;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ listing }) => {
  return (
    <Link
      to={`/listing/${listing.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        <img
          src={listing.coverImage}
          alt={listing.coverAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-text-primary shadow-sm backdrop-blur-sm">
            {listing.categoryLabel}
          </span>
        </div>

        {listing.isVerified && listing.verificationBadgeText && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              <CheckCircle className="h-3.5 w-3.5" />
              {listing.verificationBadgeText}
            </span>
          </div>
        )}

        {listing.startingPrice && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-baseline gap-1 rounded-full bg-text-primary/90 px-3 py-1.5 text-white shadow-sm backdrop-blur-sm">
              <span className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                From
              </span>
              <span className="text-sm font-bold">{listing.startingPrice}</span>
            </span>
          </div>
        )}

        {listing.isBookable && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-status-confirmed-bg px-2.5 py-1 text-[11px] font-bold text-status-confirmed-text shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-confirmed-text" />
              Bookable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          {listing.rating ? (
            <span className="inline-flex items-center gap-1 font-semibold text-tertiary">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              {listing.rating.toFixed(1)}
              <span className="font-normal text-text-muted">({listing.reviewCount})</span>
            </span>
          ) : (
            <span className="font-semibold text-text-secondary">New to the directory</span>
          )}
          <span className="font-mono text-[11px] font-medium text-text-muted">
            {listing.distance}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary transition-colors group-hover:text-primary">
          {listing.name}
        </h3>

        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-text-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-deep" />
          <span>
            {listing.address.street}, {listing.address.city} {listing.address.postalCode}
          </span>
        </p>

        <div className="mt-3 space-y-1">
          {listing.bookingStatusText && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-status-confirmed-text">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{listing.bookingStatusText}</span>
            </p>
          )}
          {listing.openingHoursText && (
            <p className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Clock className="h-3.5 w-3.5 shrink-0 text-teal-deep" />
              <span>{listing.openingHoursText}</span>
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle/70 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              Starting at
            </p>
            <p className="text-sm font-bold text-text-primary">
              {listing.startingPrice ? listing.startingPrice : 'Contact for quote'}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border-subtle bg-surface-warm px-3.5 py-2 text-xs font-semibold text-text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
            View profile
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
