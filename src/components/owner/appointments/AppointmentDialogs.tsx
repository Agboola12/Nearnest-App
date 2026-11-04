import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  PoundSterling,
  Store,
  UserRound,
  X,
  XCircle,
} from 'lucide-react';
import { OwnerAppointment } from '../../../types';
import {
  formatLongDate,
  toDisplayTime,
  toTimeInputValue,
  TODAY_ISO,
} from '../../../utils/appointmentDate';
import { AppointmentStatusBadge } from '../StatusBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface ModalFrameProps {
  children: React.ReactNode;
  onClose: () => void;
  labelledBy: string;
  maxWidth?: string;
}

const ModalFrame: React.FC<ModalFrameProps> = ({
  children,
  onClose,
  labelledBy,
  maxWidth = 'max-w-2xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-text-primary/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface-card shadow-floating border border-border-subtle`}
      >
        {children}
      </div>
    </div>
  );
};

const CustomerAvatar: React.FC<{ appointment: OwnerAppointment; size?: 'md' | 'lg' }> = ({
  appointment,
  size = 'md',
}) => {
  const classes = size === 'lg' ? 'w-14 h-14 text-sm' : 'w-10 h-10 text-xs';

  if (appointment.customerImage) {
    return (
      <img
        src={appointment.customerImage}
        alt={appointment.customerName}
        className={`${classes} rounded-full object-cover border border-border-subtle shrink-0`}
      />
    );
  }

  return (
    <span
      className={`${classes} rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center justify-center shrink-0 border border-border-subtle`}
    >
      {appointment.customerInitials}
    </span>
  );
};

interface AppointmentDetailsDialogProps {
  appointment: OwnerAppointment;
  onClose: () => void;
  onAccept: (appointment: OwnerAppointment) => void;
  onReject: (appointment: OwnerAppointment) => void;
  onReschedule: (appointment: OwnerAppointment) => void;
  onComplete: (appointment: OwnerAppointment) => void;
  onCancel: (appointment: OwnerAppointment) => void;
}

export const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  appointment,
  onClose,
  onAccept,
  onReject,
  onReschedule,
  onComplete,
  onCancel,
}) => {
  const hasActions =
    appointment.status === 'pending' || appointment.status === 'confirmed';

  return (
    <ModalFrame onClose={onClose} labelledBy="appointment-details-title">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-3 px-5 sm:px-6 py-4 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            Appointment record · #{appointment.id.replace('apt-', '')}
          </p>
          <h2
            id="appointment-details-title"
            className="mt-0.5 text-lg sm:text-xl font-bold text-text-primary"
          >
            Appointment details
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close appointment details"
          className="p-2 rounded-xl text-text-secondary hover:bg-surface-warm hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        <section className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <CustomerAvatar appointment={appointment} size="lg" />
            <div className="min-w-0">
              <p className="text-lg font-bold text-text-primary">{appointment.customerName}</p>
              <p className="mt-0.5 text-xs text-text-muted">{appointment.customerNote}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <AppointmentStatusBadge status={appointment.status} />
                <PaymentStatusBadge status={appointment.paymentStatus} />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-surface-warm border border-border-subtle p-3 sm:min-w-[148px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              Appointment total
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary">
              {appointment.price}
            </p>
            <p className="text-[11px] text-text-muted">{appointment.duration}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              Customer contact
            </p>
            <div className="mt-2.5 space-y-2">
              <a
                href={`tel:${appointment.customerPhone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary shrink-0" />
                {appointment.customerPhone}
              </a>
              <a
                href={`mailto:${appointment.customerEmail}`}
                className="flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-primary shrink-0" />
                {appointment.customerEmail}
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              Scheduled for
            </p>
            <p className="mt-2.5 flex items-start gap-2 text-sm font-semibold text-text-primary">
              <CalendarDays className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {formatLongDate(appointment.date)}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-xs text-text-secondary">
              <Clock3 className="w-4 h-4 text-primary shrink-0" />
              {appointment.time} · {appointment.duration}
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              Business
            </p>
            <p className="mt-2.5 flex items-start gap-2 text-sm font-semibold text-text-primary">
              <Store className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {appointment.listingName}
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              Service booked
            </p>
            <p className="mt-2.5 flex items-start gap-2 text-sm font-semibold text-text-primary">
              <UserRound className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {appointment.service}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-xs text-text-secondary">
              <PoundSterling className="w-4 h-4 text-primary shrink-0" />
              {appointment.price} · payment {appointment.paymentStatus.replace('_', ' ')}
            </p>
          </div>
        </div>

        {appointment.status === 'pending' && (
          <p className="rounded-xl bg-badge-amber-bg/50 border border-badge-amber-text/15 p-3 text-xs text-badge-amber-text">
            This request is waiting for your decision. Accept it to add the customer to your
            schedule, or reject it with a confirmation first.
          </p>
        )}

        {appointment.status === 'confirmed' && (
          <p className="rounded-xl bg-teal-wash border border-primary/15 p-3 text-xs text-teal-deep">
            This appointment is confirmed. Mark it complete after the visit, or reschedule and
            cancel from here if plans change.
          </p>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-border-subtle bg-surface-card/95 backdrop-blur-md px-5 sm:px-6 py-4">
        {hasActions ? (
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
            {appointment.status === 'pending' && (
              <>
                <button
                  type="button"
                  onClick={() => onReject(appointment)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-status-rejected-text/20 bg-status-rejected-bg text-status-rejected-text text-xs font-semibold hover:bg-red-100 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject request
                </button>
                <button
                  type="button"
                  onClick={() => onReschedule(appointment)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
                >
                  <CalendarClock className="w-4 h-4" />
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => onAccept(appointment)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-teal-deep transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept appointment
                </button>
              </>
            )}

            {appointment.status === 'confirmed' && (
              <>
                <button
                  type="button"
                  onClick={() => onCancel(appointment)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-status-rejected-text/20 bg-status-rejected-bg text-status-rejected-text text-xs font-semibold hover:bg-red-100 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel appointment
                </button>
                <button
                  type="button"
                  onClick={() => onReschedule(appointment)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
                >
                  <CalendarClock className="w-4 h-4" />
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => onComplete(appointment)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-teal-deep transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark completed
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto sm:ml-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-teal-deep transition-colors"
          >
            Close details
          </button>
        )}
      </div>
    </ModalFrame>
  );
};

interface RescheduleAppointmentDialogProps {
  appointment: OwnerAppointment;
  onClose: () => void;
  onSave: (appointment: OwnerAppointment, date: string, time: string) => void;
}

export const RescheduleAppointmentDialog: React.FC<RescheduleAppointmentDialogProps> = ({
  appointment,
  onClose,
  onSave,
}) => {
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(toTimeInputValue(appointment.time));
  const canSave = Boolean(date && time && date >= TODAY_ISO);
  const displayTime = time ? toDisplayTime(time) : 'Select a time';
  const displayDate = date ? formatLongDate(date) : 'Select a date';

  return (
    <ModalFrame onClose={onClose} labelledBy="reschedule-title" maxWidth="max-w-lg">
      <div className="flex items-start justify-between gap-3 px-5 sm:px-6 py-4 border-b border-border-subtle">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            Update schedule
          </p>
          <h2 id="reschedule-title" className="mt-0.5 text-lg font-bold text-text-primary">
            Reschedule appointment
          </h2>
          <p className="mt-1 text-xs text-text-muted">
            {appointment.customerName} · {appointment.service}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reschedule dialog"
          className="p-2 rounded-xl text-text-secondary hover:bg-surface-warm hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        <div className="rounded-xl border border-border-subtle bg-surface-warm/70 p-3.5 flex items-start gap-3">
          <span className="w-9 h-9 rounded-lg bg-surface-card text-primary flex items-center justify-center shrink-0 border border-border-subtle">
            <CalendarClock className="w-4 h-4" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              Currently booked
            </p>
            <p className="mt-0.5 text-sm font-semibold text-text-primary">
              {formatLongDate(appointment.date)}
            </p>
            <p className="text-xs text-text-secondary">
              {appointment.time} · {appointment.duration}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="reschedule-date"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              New date
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                id="reschedule-date"
                type="date"
                min={TODAY_ISO}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full h-11 rounded-lg border border-border-subtle bg-surface-card pl-9 pr-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reschedule-time"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              New time
            </label>
            <div className="relative">
              <Clock3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                id="reschedule-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full h-11 rounded-lg border border-border-subtle bg-surface-card pl-9 pr-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {date && date < TODAY_ISO ? (
          <p role="alert" className="text-xs font-medium text-status-rejected-text">
            Choose today or a future date for the new appointment.
          </p>
        ) : (
          <div className="rounded-xl bg-teal-wash border border-primary/15 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
              New appointment
            </p>
            <p className="mt-1 text-sm font-semibold text-text-primary">{displayDate}</p>
            <p className="text-xs text-text-secondary">
              {displayTime} · The customer will be notified of the change.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 px-5 sm:px-6 py-4 border-t border-border-subtle bg-surface-warm/40">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
        >
          Keep current time
        </button>
        <button
          type="button"
          disabled={!canSave}
          onClick={() => onSave(appointment, date, toDisplayTime(time))}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-teal-deep disabled:bg-surface-dim disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
        >
          <CalendarDays className="w-4 h-4" />
          Save new schedule
        </button>
      </div>
    </ModalFrame>
  );
};

interface AppointmentConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const AppointmentConfirmDialog: React.FC<AppointmentConfirmDialogProps> = ({
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}) => {
  return (
    <ModalFrame onClose={onClose} labelledBy="appointment-confirm-title" maxWidth="max-w-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="w-11 h-11 rounded-xl bg-status-rejected-bg text-status-rejected-text flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-status-rejected-text">
              Please confirm
            </p>
            <h2
              id="appointment-confirm-title"
              className="mt-0.5 text-lg font-bold text-text-primary"
            >
              {title}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-text-secondary leading-relaxed">{description}</p>
        <p className="mt-3 rounded-lg bg-surface-warm border border-border-subtle p-3 text-[11px] text-text-muted">
          This is a demo action. The customer notification and payment change are simulated.
        </p>

        <div className="mt-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-xs font-semibold hover:bg-surface-warm transition-colors"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-status-rejected-text text-white text-xs font-semibold shadow-sm hover:bg-red-800 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalFrame>
  );
};
