import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, MapPin, Star } from 'lucide-react';
import { Institution } from '../../types';

interface InstitutionCardProps {
  institution: Institution;
}

export const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution }) => {
  return (
    <Link
      to={`/listing/${institution.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        <img
          src={institution.coverImage}
          alt={institution.coverAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-text-primary shadow-sm backdrop-blur-sm">
            {institution.categoryLabel}
          </span>
        </div>

        {institution.isVerified && institution.verificationBadgeText && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              <CheckCircle className="h-3.5 w-3.5" />
              {institution.verificationBadgeText}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          {institution.rating ? (
            <span className="inline-flex items-center gap-1 font-semibold text-tertiary">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              {institution.rating.toFixed(1)}
              <span className="font-normal text-text-muted">({institution.reviewCount})</span>
            </span>
          ) : (
            <span className="font-semibold text-text-secondary">Community institution</span>
          )}
          <span className="font-mono text-[11px] font-medium text-text-muted">
            {institution.distance}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary transition-colors group-hover:text-primary">
          {institution.name}
        </h3>

        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-text-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-deep" />
          <span>
            {institution.address.street}, {institution.address.city}{' '}
            {institution.address.postalCode}
          </span>
        </p>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-text-secondary">
          {institution.description}
        </p>

        {institution.bookingStatusText && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-status-confirmed-text">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{institution.bookingStatusText}</span>
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle/70 pt-4">
          <span className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            {institution.categoryLabel}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border-subtle bg-surface-warm px-3.5 py-2 text-xs font-semibold text-text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
            View profile
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
