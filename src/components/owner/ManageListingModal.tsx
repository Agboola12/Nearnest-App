import React, { useEffect, useState } from 'react';
import { CalendarClock, ChevronDown, MapPin, Star, X } from 'lucide-react';
import { OwnerListing, OwnerListingStatus } from '../../types';
import { ListingStatusBadge } from './StatusBadge';

interface ManageListingModalProps {
  listing: OwnerListing;
  onClose: () => void;
  onSave: (listing: OwnerListing) => void;
}

export const ManageListingModal: React.FC<ManageListingModalProps> = ({
  listing,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState<OwnerListingStatus>(listing.status);
  const [acceptingBookings, setAcceptingBookings] = useState(listing.status === 'published');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-listing-title"
    >
      <button
        type="button"
        aria-label="Close manage listing dialog"
        className="absolute inset-0 bg-text-primary/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface-card shadow-floating border border-border-subtle">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Listing settings
            </p>
            <h2 id="manage-listing-title" className="text-lg font-bold text-text-primary">
              Manage listing
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-xl text-text-secondary hover:bg-surface-warm hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="relative h-32 rounded-xl overflow-hidden bg-surface-container">
            <img
              src={listing.coverImage}
              alt={listing.coverAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-text-primary/5 to-transparent" />
            <ListingStatusBadge
              status={status}
              isVerified={listing.isVerified}
              className="absolute top-3 left-3"
            />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-base font-bold drop-shadow-sm">{listing.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/90">
                <MapPin className="w-3 h-3" />
                {listing.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface-warm/80 p-3 text-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Rating
              </p>
              <p className="mt-0.5 text-sm font-bold text-text-primary inline-flex items-center gap-1">
                {listing.rating ? (
                  <>
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {listing.rating.toFixed(1)}
                  </>
                ) : (
                  'New'
                )}
              </p>
            </div>
            <div className="border-x border-border-subtle">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Reviews
              </p>
              <p className="mt-0.5 text-sm font-bold text-text-primary">
                {listing.reviewCount ?? 0}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Services
              </p>
              <p className="mt-0.5 text-sm font-bold text-text-primary">{listing.servicesCount}</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="listing-visibility"
              className="block text-xs font-semibold text-text-secondary mb-1.5"
            >
              Listing visibility
            </label>
            <div className="relative">
              <select
                id="listing-visibility"
                value={status}
                onChange={(event) => {
                  const nextStatus = event.target.value as OwnerListingStatus;
                  setStatus(nextStatus);
                  setAcceptingBookings(nextStatus === 'published');
                }}
                className="w-full appearance-none rounded-lg border border-border-subtle bg-surface-card px-3 py-2.5 pr-9 text-sm text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="published">Published — visible to customers</option>
                <option value="paused">Paused — temporarily hidden</option>
                <option value="draft">Draft — only visible to you</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle p-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">Accept online bookings</p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Allow customers to reserve an appointment slot.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={acceptingBookings}
              onClick={() => setAcceptingBookings((value) => !value)}
              className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                acceptingBookings ? 'bg-primary' : 'bg-surface-dim'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  acceptingBookings ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-teal-wash border border-primary/10 p-3">
            <CalendarClock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Next availability: <strong className="text-text-primary">{listing.nextAvailable}</strong>.
              Changes in this preview are frontend-only and reset on refresh.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-2 px-5 py-4 bg-surface-card/95 backdrop-blur-md border-t border-border-subtle">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-border-subtle bg-surface-card text-text-primary text-sm font-semibold hover:bg-surface-warm transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              onSave({
                ...listing,
                status,
                nextAvailable: acceptingBookings
                  ? 'Now accepting bookings'
                  : listing.nextAvailable,
              })
            }
            className="px-4 py-2.5 rounded-lg bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all active:scale-95"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
