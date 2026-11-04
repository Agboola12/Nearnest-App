import React from 'react';
import { CalendarClock, ChevronRight, Clock3, MapPin, Store } from 'lucide-react';
import { ListingWizardImage } from '../../../types';

interface ListingPreviewCardProps {
  name: string;
  category: string;
  address: string;
  cover: ListingWizardImage | null;
  logo: ListingWizardImage | null;
  serviceCount: number;
  startingPrice: string | null;
  hoursSummary: string;
}

export const ListingPreviewCard: React.FC<ListingPreviewCardProps> = ({
  name,
  category,
  address,
  cover,
  logo,
  serviceCount,
  startingPrice,
  hoursSummary,
}) => {
  return (
    <section className="bg-surface-card rounded-2xl p-5 sm:p-6 shadow-subtle border border-border-subtle">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
          Live directory card preview
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-primary bg-teal-wash px-2 py-0.5 rounded border border-primary/20">
          Visitor view
        </span>
      </div>

      <div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-elevated border border-border-subtle">
        <div className="relative h-44 w-full bg-gradient-to-br from-surface-warm via-teal-wash to-surface-container overflow-hidden">
          {cover ? (
            <img
              src={cover.src}
              alt={name || 'Business cover preview'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted">
              <Store className="w-10 h-10 text-primary/50" />
              <span className="text-[11px] font-semibold">Your cover photo appears here</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/35 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-card/95 backdrop-blur-md text-text-primary text-[11px] font-semibold shadow-sm border border-border-subtle/40">
              {category || 'Business category'}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 rounded-full bg-badge-amber-bg text-badge-amber-text text-[10px] font-bold shadow-sm flex items-center gap-1 border border-badge-amber-text/20">
              <span className="w-1.5 h-1.5 rounded-full bg-badge-amber-text" />
              Preview
            </span>
          </div>

          {logo && (
            <div className="absolute bottom-3 left-3">
              <img
                src={logo.src}
                alt="Business logo preview"
                className="w-11 h-11 rounded-xl object-cover border-2 border-surface-card shadow-md"
              />
            </div>
          )}

          <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-text-primary/80 backdrop-blur-sm text-white text-[10px] font-medium shadow-sm">
            {serviceCount > 0 ? 'Booking enabled' : 'New listing'}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2.5">
          <div>
            <h3 className="text-base font-bold text-text-primary leading-snug truncate">
              {name || 'Your business name'}
            </h3>
            <p className="mt-0.5 flex items-start gap-1 text-[11px] text-text-muted leading-snug">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-px" />
              <span className="line-clamp-2">
                {address || 'Your full address will appear here.'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="px-2 py-0.5 rounded bg-teal-wash text-primary text-[10px] font-semibold border border-primary/20 inline-flex items-center gap-1">
              <Clock3 className="w-3 h-3" />
              {hoursSummary}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-text-secondary text-[10px] font-semibold">
              {serviceCount > 0 ? `${serviceCount} service${serviceCount === 1 ? '' : 's'}` : 'Services pending'}
            </span>
          </div>

          <div className="pt-2.5 flex items-center justify-between border-t border-border-subtle/60">
            <span className="text-[10px] font-semibold text-status-confirmed-text flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed-text" />
              {startingPrice ? `From ${startingPrice}` : 'Civic verified'}
            </span>
            <span className="text-primary text-[10px] font-semibold flex items-center">
              Explore
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-text-muted text-center mt-3.5 flex items-center justify-center gap-1.5">
        <CalendarClock className="w-3.5 h-3.5 text-primary" />
        Preview updates as you complete each step.
      </p>
    </section>
  );
};
