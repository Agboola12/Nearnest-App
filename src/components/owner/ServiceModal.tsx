import React, { useEffect, useState } from 'react';
import { Clock3, PoundSterling, X } from 'lucide-react';
import { OwnerListing, OwnerService } from '../../types';

interface ServiceModalProps {
  /** Pass an existing service to edit it, or null to create a new one. */
  service: OwnerService | null;
  listings: OwnerListing[];
  defaultListingId?: string;
  onClose: () => void;
  onSave: (service: OwnerService) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  listings,
  defaultListingId,
  onClose,
  onSave,
}) => {
  const initialListingId =
    service?.listingId ?? defaultListingId ?? listings[0]?.id ?? '';
  const initialListing =
    listings.find((listing) => listing.id === initialListingId) ?? listings[0];

  const [form, setForm] = useState({
    listingId: initialListingId,
    name: service?.name ?? '',
    description: service?.description ?? '',
    duration: service?.duration ?? '',
    price: service?.price ?? '',
    isActive: service?.isActive ?? true,
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

  const selectedListing =
    listings.find((listing) => listing.id === form.listingId) ?? initialListing;

  const canSave =
    form.name.trim().length > 0 &&
    form.duration.trim().length > 0 &&
    form.price.trim().length > 0 &&
    Boolean(selectedListing);

  const handleSave = () => {
    if (!canSave || !selectedListing) return;

    onSave({
      id: service?.id ?? `svc-${Date.now()}`,
      listingId: selectedListing.id,
      listingName: selectedListing.name,
      name: form.name.trim(),
      description: form.description.trim() || 'No description added yet.',
      duration: form.duration.trim(),
      price: form.price.trim().startsWith('£')
        ? form.price.trim()
        : `£${form.price.trim()}`,
      isActive: form.isActive,
    });
  };

  const inputClasses =
    'w-full rounded-lg border border-border-subtle bg-surface-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <button
        type="button"
        aria-label="Close service dialog"
        className="absolute inset-0 bg-text-primary/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface-card shadow-floating border border-border-subtle">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Service catalogue
            </p>
            <h2 id="service-modal-title" className="text-lg font-bold text-text-primary">
              {service ? 'Edit service' : 'Add a new service'}
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

        <div className="p-5 space-y-4">
          <div>
            <label
              htmlFor="service-business"
              className="block text-xs font-semibold text-text-secondary mb-1.5"
            >
              Business
            </label>
            <select
              id="service-business"
              value={form.listingId}
              onChange={(event) =>
                setForm((current) => ({ ...current, listingId: event.target.value }))
              }
              className={inputClasses}
            >
              {listings.map((listing) => (
                <option key={listing.id} value={listing.id}>
                  {listing.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="service-name"
              className="block text-xs font-semibold text-text-secondary mb-1.5"
            >
              Service name
            </label>
            <input
              id="service-name"
              type="text"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="e.g. Signature Haircut & Hot Towel"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="service-description"
              className="block text-xs font-semibold text-text-secondary mb-1.5"
            >
              Short description
            </label>
            <textarea
              id="service-description"
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="What customers can expect from this appointment."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="service-duration"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Duration
              </label>
              <div className="relative">
                <Clock3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="service-duration"
                  type="text"
                  value={form.duration}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, duration: event.target.value }))
                  }
                  placeholder="45 min"
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="service-price"
                className="block text-xs font-semibold text-text-secondary mb-1.5"
              >
                Price
              </label>
              <div className="relative">
                <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                  id="service-price"
                  type="text"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, price: event.target.value }))
                  }
                  placeholder="45"
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle p-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">Bookable online</p>
              <p className="mt-0.5 text-[11px] text-text-muted">
                Show this service to customers on your public listing.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.isActive}
              aria-label="Toggle service availability"
              onClick={() => setForm((current) => ({ ...current, isActive: !current.isActive }))}
              className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                form.isActive ? 'bg-primary' : 'bg-surface-dim'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  form.isActive ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
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
            {service ? 'Save service' : 'Add service'}
          </button>
        </div>
      </div>
    </div>
  );
};
