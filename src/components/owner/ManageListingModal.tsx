import React, { useEffect, useState } from 'react';
import {
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Star,
  Store,
  X,
} from 'lucide-react';
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
  const [form, setForm] = useState({
    name: listing.name,
    categoryLabel: listing.categoryLabel,
    address: listing.address,
    phone: listing.phone ?? '',
    email: listing.email ?? '',
    website: listing.website ?? '',
    description: listing.description ?? '',
    openingHours: listing.openingHours ?? '',
    status: listing.status,
    acceptingBookings: listing.status === 'published',
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const canSave = form.name.trim().length > 0 && form.address.trim().length > 0;

  const inputClasses =
    'w-full rounded-lg border border-border-subtle bg-surface-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors';

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      ...listing,
      name: form.name.trim(),
      categoryLabel: form.categoryLabel.trim() || listing.categoryLabel,
      address: form.address.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      description: form.description.trim(),
      openingHours: form.openingHours.trim(),
      status: form.status as OwnerListingStatus,
      nextAvailable: form.acceptingBookings
        ? 'Now accepting bookings'
        : listing.nextAvailable,
    });
  };

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

      <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface-card shadow-floating border border-border-subtle">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Business profile
            </p>
            <h2 id="manage-listing-title" className="text-lg font-bold text-text-primary">
              Edit business information
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
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-text-primary/10 to-transparent" />
            <ListingStatusBadge
              status={form.status}
              isVerified={listing.isVerified}
              className="absolute top-3 left-3"
            />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-base font-bold drop-shadow-sm">{form.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/90">
                <MapPin className="w-3 h-3" />
                {form.address}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="listing-name"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Business name
              </label>
              <input
                id="listing-name"
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="listing-category"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Category
              </label>
              <input
                id="listing-category"
                type="text"
                value={form.categoryLabel}
                onChange={(event) =>
                  setForm((current) => ({ ...current, categoryLabel: event.target.value }))
                }
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="listing-address"
              className="block text-xs font-semibold text-text-secondary mb-1.5"
            >
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                id="listing-address"
                type="text"
                value={form.address}
                onChange={(event) =>
                  setForm((current) => ({ ...current, address: event.target.value }))
                }
                className={`${inputClasses} pl-9`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="listing-phone"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="listing-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  placeholder="+44 20 8940 2214"
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="listing-email"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="listing-email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="hello@yourbusiness.co.uk"
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="listing-website"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Website
              </label>
              <div className="relative">
                <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="listing-website"
                  type="text"
                  value={form.website}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, website: event.target.value }))
                  }
                  placeholder="yourbusiness.co.uk"
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="listing-hours"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Opening hours
              </label>
              <div className="relative">
                <Clock3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="listing-hours"
                  type="text"
                  value={form.openingHours}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, openingHours: event.target.value }))
                  }
                  placeholder="Tue – Sat · 9:00 AM – 7:00 PM"
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="listing-description"
              className="block text-xs font-semibold text-text-secondary mb-1.5"
            >
              About this business
            </label>
            <textarea
              id="listing-description"
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Tell customers what makes your business a local favourite."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="listing-visibility"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Listing visibility
              </label>
              <select
                id="listing-visibility"
                value={form.status}
                onChange={(event) => {
                  const nextStatus = event.target.value as OwnerListingStatus;
                  setForm((current) => ({
                    ...current,
                    status: nextStatus,
                    acceptingBookings: nextStatus === 'published',
                  }));
                }}
                className={inputClasses}
              >
                <option value="published">Published — visible to customers</option>
                <option value="paused">Paused — temporarily hidden</option>
                <option value="draft">Draft — only visible to you</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle p-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">Accept online bookings</p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Allow customers to reserve a slot.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.acceptingBookings}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    acceptingBookings: !current.acceptingBookings,
                  }))
                }
                className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                  form.acceptingBookings ? 'bg-primary' : 'bg-surface-dim'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    form.acceptingBookings ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-teal-wash border border-primary/10 p-3">
            <Store className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-text-secondary leading-relaxed">
              These changes are saved in this preview only and reset when the page reloads.
              Your personal bookings at <strong className="text-text-primary">/account</strong> stay
              in this same NearNest account, alongside your business management.
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
            onClick={handleSave}
            disabled={!canSave}
            className="px-4 py-2.5 rounded-lg bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save business details
          </button>
        </div>
      </div>
    </div>
  );
};
