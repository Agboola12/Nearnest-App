import React from 'react';
import { Clock3, Pencil, Store } from 'lucide-react';
import { OwnerService } from '../../types';

interface ServiceCardProps {
  service: OwnerService;
  onEdit: (service: OwnerService) => void;
  onToggleActive: (service: OwnerService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onToggleActive,
}) => {
  return (
    <article
      className={`flex flex-col rounded-xl border bg-surface-card p-4 shadow-subtle transition-all hover:shadow-elevated ${
        service.isActive ? 'border-border-subtle' : 'border-border-subtle opacity-75'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-text-primary">{service.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
            <Store className="w-3.5 h-3.5 shrink-0 text-teal-deep" />
            <span className="truncate">{service.listingName}</span>
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${
            service.isActive
              ? 'bg-status-confirmed-bg text-status-confirmed-text'
              : 'bg-surface-container text-text-secondary'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              service.isActive ? 'bg-status-confirmed-text' : 'bg-text-muted'
            }`}
          />
          {service.isActive ? 'Bookable' : 'Paused'}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-2">
        {service.description}
      </p>

      <div className="mt-4 flex items-center gap-4 rounded-lg bg-surface-warm/80 px-3 py-2.5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Price
          </p>
          <p className="mt-0.5 text-sm font-bold text-text-primary">{service.price}</p>
        </div>
        <div className="h-7 w-px bg-border-subtle" />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Duration
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-semibold text-text-primary">
            <Clock3 className="w-3.5 h-3.5 text-primary" />
            {service.duration}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onEdit(service)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit service
        </button>
        <button
          type="button"
          onClick={() => onToggleActive(service)}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            service.isActive
              ? 'bg-surface-warm text-text-secondary hover:bg-surface-container'
              : 'bg-teal-wash text-teal-deep hover:bg-primary hover:text-white'
          }`}
        >
          {service.isActive ? 'Pause service' : 'Reactivate'}
        </button>
      </div>
    </article>
  );
};
