import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Eye, MapPin, Settings2, Star } from 'lucide-react';
import { OwnerListing } from '../../types';
import { ListingStatusBadge } from './StatusBadge';

interface ListingCardProps {
  listing: OwnerListing;
  onManage: (listing: OwnerListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onManage }) => {
  const isLive = listing.status === 'published';

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-subtle hover:shadow-elevated hover:border-primary/30 transition-all">
      <div className="relative h-36 overflow-hidden bg-surface-container">
        <img
          src={listing.coverImage}
          alt={listing.coverAlt}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/35 via-transparent to-transparent" />
        <ListingStatusBadge
          status={listing.status}
          isVerified={listing.isVerified}
          className="absolute top-3 left-3"
        />
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-text-primary text-[11px] font-semibold shadow-sm">
          {listing.categoryLabel}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
          {listing.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-text-muted min-w-0">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-teal-deep" />
          <span className="truncate">{listing.address}</span>
        </p>

        <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-surface-warm/80 p-2.5 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              Rating
            </p>
            <p className="mt-0.5 text-xs font-bold text-text-primary inline-flex items-center gap-1">
              {listing.rating ? (
                <>
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {listing.rating.toFixed(1)}
                </>
              ) : (
                'New'
              )}
            </p>
          </div>
          <div className="border-x border-border-subtle">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              Bookings
            </p>
            <p className="mt-0.5 text-xs font-bold text-text-primary">
              {listing.bookingsThisMonth}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              Services
            </p>
            <p className="mt-0.5 text-xs font-bold text-text-primary">{listing.servicesCount}</p>
          </div>
        </div>

        <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-text-muted">
          <CalendarClock className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">{listing.nextAvailable}</span>
        </p>

        <div className="mt-4 flex items-center gap-2">
          {isLive ? (
            <Link
              to={`/listing/${listing.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              View live
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => onManage(listing)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          )}

          <button
            type="button"
            onClick={() => onManage(listing)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-warm text-text-primary text-xs font-semibold hover:bg-surface-container border border-transparent hover:border-border-subtle transition-colors"
          >
            <Settings2 className="w-3.5 h-3.5 text-primary" />
            Manage
          </button>
        </div>
      </div>
    </article>
  );
};
