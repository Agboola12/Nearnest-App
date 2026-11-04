import React from 'react';
import { Ban, CheckCircle2, Clock3, FileEdit, PauseCircle, XCircle } from 'lucide-react';
import { AppointmentStatus, OwnerListingStatus } from '../../types';

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export const AppointmentStatusBadge: React.FC<AppointmentStatusBadgeProps> = ({ status }) => {
  if (status === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text text-xs font-semibold whitespace-nowrap">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Confirmed
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-pending-bg text-status-pending-text text-xs font-semibold whitespace-nowrap">
        <Clock3 className="w-3.5 h-3.5" />
        Pending approval
      </span>
    );
  }

  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-text-secondary text-xs font-semibold whitespace-nowrap">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Completed
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-rejected-bg text-status-rejected-text text-xs font-semibold whitespace-nowrap">
        <Ban className="w-3.5 h-3.5" />
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-text-secondary text-xs font-semibold whitespace-nowrap">
      <XCircle className="w-3.5 h-3.5" />
      Cancelled
    </span>
  );
};

interface ListingStatusBadgeProps {
  status: OwnerListingStatus;
  isVerified?: boolean;
  className?: string;
}

export const ListingStatusBadge: React.FC<ListingStatusBadgeProps> = ({
  status,
  isVerified = false,
  className = '',
}) => {
  if (status === 'published') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text text-xs font-semibold shadow-sm whitespace-nowrap ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        {isVerified ? 'Published & Verified' : 'Published'}
      </span>
    );
  }

  if (status === 'paused') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-badge-amber-bg text-badge-amber-text text-xs font-semibold shadow-sm whitespace-nowrap ${className}`}
      >
        <PauseCircle className="w-3.5 h-3.5" />
        Paused
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-text-secondary text-xs font-semibold shadow-sm whitespace-nowrap ${className}`}
    >
      <FileEdit className="w-3.5 h-3.5" />
      Draft
    </span>
  );
};
