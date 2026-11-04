import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CalendarDays,
  CalendarX2,
  CheckCheck,
  CheckCircle2,
  Clock3,
  Eye,
  Hourglass,
  Mail,
  Phone,
  PlusCircle,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Store,
  X,
  XCircle,
} from 'lucide-react';
import {
  OWNER_APPOINTMENTS,
  OWNER_LISTINGS,
} from '../data/mockOwnerDashboard';
import { AppointmentStatus, OwnerAppointment } from '../types';
import { AppointmentStatusBadge } from '../components/owner/StatusBadge';
import { PaymentStatusBadge } from '../components/owner/appointments/PaymentStatusBadge';
import {
  AppointmentConfirmDialog,
  AppointmentDetailsDialog,
  RescheduleAppointmentDialog,
} from '../components/owner/appointments/AppointmentDialogs';
import {
  formatAppointmentDate,
  formatLongDate,
  sortAppointments,
  TODAY_ISO,
} from '../utils/appointmentDate';

type StatusFilter = 'all' | AppointmentStatus;

type ConfirmAction = {
  appointmentId: string;
  action: 'reject' | 'cancel';
};

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'rejected', label: 'Rejected' },
];

const statToneClasses = {
  teal: 'bg-teal-wash text-primary',
  amber: 'bg-badge-amber-bg text-badge-amber-text',
  green: 'bg-status-confirmed-bg text-status-confirmed-text',
  slate: 'bg-surface-container text-text-secondary',
} as const;

interface SummaryCardProps {
  label: string;
  value: number;
  note: string;
  tag: string;
  icon: React.ReactNode;
  tone: keyof typeof statToneClasses;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, note, tag, icon, tone }) => (
  <div className="bg-surface-card rounded-2xl border border-border-subtle p-5 shadow-subtle flex flex-col justify-between hover:shadow-elevated transition-shadow">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-text-muted">
          {label}
        </p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary">{value}</p>
      </div>
      <span className={`p-2.5 rounded-xl shrink-0 ${statToneClasses[tone]}`}>{icon}</span>
    </div>
    <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
      <p className="text-[11px] text-text-muted leading-snug">{note}</p>
      <span className="shrink-0 rounded-full bg-surface-warm border border-border-subtle px-2 py-0.5 text-[10px] font-bold text-text-muted">
        {tag}
      </span>
    </div>
  </div>
);

const CustomerAvatar: React.FC<{ appointment: OwnerAppointment; className?: string }> = ({
  appointment,
  className = 'w-9 h-9 text-[11px]',
}) => {
  if (appointment.customerImage) {
    return (
      <img
        src={appointment.customerImage}
        alt={appointment.customerName}
        className={`${className} rounded-full object-cover border border-border-subtle shrink-0`}
        loading="lazy"
      />
    );
  }

  return (
    <span
      className={`${className} rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center justify-center shrink-0 border border-border-subtle`}
    >
      {appointment.customerInitials}
    </span>
  );
};

export const OwnerAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<OwnerAppointment[]>(OWNER_APPOINTMENTS);
  const [businessFilter, setBusinessFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!feedback) return;

    const timeout = window.setTimeout(() => setFeedback(''), 3800);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const businessAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) =>
          businessFilter === 'all' || appointment.listingId === businessFilter
      ),
    [appointments, businessFilter]
  );

  const searchDateFilteredAppointments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return businessAppointments.filter((appointment) => {
      const matchesDate = !dateFilter || appointment.date === dateFilter;
      const matchesSearch =
        !query ||
        [
          appointment.customerName,
          appointment.service,
          appointment.listingName,
          appointment.customerEmail,
          appointment.customerPhone,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesDate && matchesSearch;
    });
  }, [businessAppointments, dateFilter, searchQuery]);

  const statusCounts = {
    all: searchDateFilteredAppointments.length,
    pending: searchDateFilteredAppointments.filter((appointment) => appointment.status === 'pending')
      .length,
    confirmed: searchDateFilteredAppointments.filter(
      (appointment) => appointment.status === 'confirmed'
    ).length,
    completed: searchDateFilteredAppointments.filter(
      (appointment) => appointment.status === 'completed'
    ).length,
    cancelled: searchDateFilteredAppointments.filter(
      (appointment) => appointment.status === 'cancelled'
    ).length,
    rejected: searchDateFilteredAppointments.filter(
      (appointment) => appointment.status === 'rejected'
    ).length,
  };

  const visibleAppointments = sortAppointments(
    statusFilter === 'all'
      ? searchDateFilteredAppointments
      : searchDateFilteredAppointments.filter(
          (appointment) => appointment.status === statusFilter
        )
  );

  const todayAppointments = businessAppointments.filter(
    (appointment) =>
      appointment.date === TODAY_ISO &&
      appointment.status !== 'cancelled' &&
      appointment.status !== 'rejected'
  );
  const todayCompleted = todayAppointments.filter(
    (appointment) => appointment.status === 'completed'
  ).length;
  const todayRemaining = todayAppointments.filter(
    (appointment) =>
      appointment.status === 'confirmed' || appointment.status === 'pending'
  ).length;

  const summary = {
    today: todayAppointments.length,
    pending: businessAppointments.filter((appointment) => appointment.status === 'pending').length,
    confirmed: businessAppointments.filter(
      (appointment) => appointment.status === 'confirmed'
    ).length,
    completed: businessAppointments.filter(
      (appointment) => appointment.status === 'completed'
    ).length,
  };

  const selectedBusiness = OWNER_LISTINGS.find((listing) => listing.id === businessFilter);
  const selectedBusinessName = selectedBusiness?.name ?? 'all businesses';
  const hasFilters =
    statusFilter !== 'all' ||
    searchQuery.trim().length > 0 ||
    dateFilter.length > 0 ||
    businessFilter !== 'all';
  const hasBusinessAppointments = businessAppointments.length > 0;
  const hasMatchingAppointments = visibleAppointments.length > 0;

  const detailsAppointment =
    appointments.find((appointment) => appointment.id === detailsId) ?? null;
  const rescheduleAppointment =
    appointments.find((appointment) => appointment.id === rescheduleId) ?? null;
  const appointmentForConfirmation = confirmAction
    ? appointments.find((appointment) => appointment.id === confirmAction.appointmentId) ?? null
    : null;

  const resetFilters = () => {
    setBusinessFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    setDateFilter('');
  };

  const updateAppointment = (
    appointmentId: string,
    changes: Partial<Pick<OwnerAppointment, 'status' | 'paymentStatus' | 'date' | 'time'>>,
    message: string
  ) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, ...changes } : appointment
      )
    );
    setFeedback(message);
  };

  const handleAccept = (appointment: OwnerAppointment) => {
    setDetailsId(null);
    updateAppointment(
      appointment.id,
      { status: 'confirmed' },
      `${appointment.customerName}'s appointment has been accepted and confirmed.`
    );
  };

  const requestReject = (appointment: OwnerAppointment) => {
    setDetailsId(null);
    setConfirmAction({ appointmentId: appointment.id, action: 'reject' });
  };

  const requestCancel = (appointment: OwnerAppointment) => {
    setDetailsId(null);
    setConfirmAction({ appointmentId: appointment.id, action: 'cancel' });
  };

  const handleComplete = (appointment: OwnerAppointment) => {
    setDetailsId(null);
    updateAppointment(
      appointment.id,
      { status: 'completed', paymentStatus: 'paid' },
      `${appointment.customerName}'s appointment is complete. Payment marked as paid.`
    );
  };

  const openReschedule = (appointment: OwnerAppointment) => {
    setDetailsId(null);
    setRescheduleId(appointment.id);
  };

  const handleReschedule = (appointment: OwnerAppointment, date: string, time: string) => {
    updateAppointment(
      appointment.id,
      { date, time },
      `${appointment.customerName}'s appointment moved to ${formatLongDate(date)} at ${time}.`
    );
    setRescheduleId(null);
  };

  const handleConfirmAction = () => {
    if (!confirmAction || !appointmentForConfirmation) return;

    if (confirmAction.action === 'reject') {
      updateAppointment(
        appointmentForConfirmation.id,
        { status: 'rejected', paymentStatus: 'not_charged' },
        `${appointmentForConfirmation.customerName}'s booking request was rejected.`
      );
    } else {
      updateAppointment(
        appointmentForConfirmation.id,
        {
          status: 'cancelled',
          paymentStatus:
            appointmentForConfirmation.paymentStatus === 'paid' ? 'refunded' : 'not_charged',
        },
        `${appointmentForConfirmation.customerName}'s appointment was cancelled.`
      );
    }

    setConfirmAction(null);
  };

  const renderQuickActions = (appointment: OwnerAppointment, fullLabels = false) => {
    const primaryButton =
      'inline-flex items-center justify-center gap-1 rounded-lg bg-primary hover:bg-teal-deep text-white px-2.5 py-1.5 text-[11px] font-semibold transition-colors';
    const dangerButton =
      'inline-flex items-center justify-center gap-1 rounded-lg bg-status-rejected-bg hover:bg-red-100 text-status-rejected-text px-2.5 py-1.5 text-[11px] font-semibold transition-colors';
    const neutralButton =
      'inline-flex items-center justify-center gap-1 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-warm text-text-secondary hover:text-text-primary px-2.5 py-1.5 text-[11px] font-semibold transition-colors';
    const iconOnlyLabel = (label: string) =>
      fullLabels ? <span>{label}</span> : <span className="sr-only">{label}</span>;

    return (
      <div className={`flex flex-wrap items-center gap-1.5 ${fullLabels ? '' : 'justify-end'}`}>
        {appointment.status === 'pending' && (
          <>
            <button type="button" onClick={() => handleAccept(appointment)} className={primaryButton}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Accept
            </button>
            <button type="button" onClick={() => requestReject(appointment)} className={dangerButton}>
              <XCircle className="w-3.5 h-3.5" />
              Reject
            </button>
          </>
        )}

        {appointment.status === 'confirmed' && (
          <button type="button" onClick={() => handleComplete(appointment)} className={primaryButton}>
            <CheckCheck className="w-3.5 h-3.5" />
            Complete
          </button>
        )}

        {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
          <button
            type="button"
            onClick={() => openReschedule(appointment)}
            title="Reschedule appointment"
            className={neutralButton}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            {iconOnlyLabel('Reschedule')}
          </button>
        )}

        {appointment.status === 'confirmed' && (
          <button
            type="button"
            onClick={() => requestCancel(appointment)}
            title="Cancel appointment"
            className={dangerButton}
          >
            <XCircle className="w-3.5 h-3.5" />
            {iconOnlyLabel('Cancel')}
          </button>
        )}

        <button
          type="button"
          onClick={() => setDetailsId(appointment.id)}
          title="View appointment details"
          className={neutralButton}
        >
          <Eye className="w-3.5 h-3.5" />
          {iconOnlyLabel('Details')}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-subtle">
        <div
          className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-teal-wash/80 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-5">
            <div className="min-w-0">
              <Link
                to="/owner"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to dashboard
              </Link>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                <CalendarDays className="w-3.5 h-3.5" />
                Business workspace · Appointments
              </p>
              <h1 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
                Appointment Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-text-secondary leading-relaxed">
                Control schedule flow, customer arrivals and pending requests across every
                business from one calm, organised view.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:justify-end xl:shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-warm px-3 py-1.5 text-[11px] font-semibold text-text-secondary">
                <Store className="w-3.5 h-3.5 text-primary" />
                {OWNER_LISTINGS.length} businesses
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-teal-wash px-3 py-1.5 text-[11px] font-semibold text-teal-deep">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Today ·{' '}
                {new Date(`${TODAY_ISO}T12:00:00`).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-warm/60 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-text-muted">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                Find an appointment
              </p>
              <button
                type="button"
                onClick={resetFilters}
                disabled={!hasFilters}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-teal-deep disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_210px_240px] gap-3">
              <div>
                <label htmlFor="appointment-search" className="sr-only">
                  Search appointments
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  <input
                    id="appointment-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by customer name or service…"
                    className="w-full h-11 rounded-xl border border-border-subtle bg-surface-card pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-warm transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="appointment-date-filter" className="sr-only">
                  Filter appointments by date
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  <input
                    id="appointment-date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value)}
                    className="w-full h-11 rounded-xl border border-border-subtle bg-surface-card pl-10 pr-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  {dateFilter && (
                    <button
                      type="button"
                      onClick={() => setDateFilter('')}
                      aria-label="Clear date filter"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-warm transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="appointment-business-filter" className="sr-only">
                  Filter appointments by business
                </label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  <select
                    id="appointment-business-filter"
                    value={businessFilter}
                    onChange={(event) => setBusinessFilter(event.target.value)}
                    className="w-full h-11 rounded-xl border border-border-subtle bg-surface-card pl-10 pr-9 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                  >
                    <option value="all">All businesses ({appointments.length})</option>
                    {OWNER_LISTINGS.map((listing) => {
                      const count = appointments.filter(
                        (appointment) => appointment.listingId === listing.id
                      ).length;
                      return (
                        <option key={listing.id} value={listing.id}>
                          {listing.name} ({count})
                        </option>
                      );
                    })}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[10px]">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {(dateFilter || searchQuery || businessFilter !== 'all') && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
                <span>Active filters:</span>
                {businessFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-card border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                    <Store className="w-3 h-3 text-primary" />
                    {selectedBusinessName}
                  </span>
                )}
                {dateFilter && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-card border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                    <CalendarDays className="w-3 h-3 text-primary" />
                    {formatLongDate(dateFilter)}
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-card border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                    <Search className="w-3 h-3 text-primary" />
                    “{searchQuery}”
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          label="Today's appointments"
          value={summary.today}
          note={`${todayCompleted} completed · ${todayRemaining} remaining`}
          tag="Today"
          tone="teal"
          icon={<CalendarDays className="w-5 h-5" />}
        />
        <SummaryCard
          label="Pending requests"
          value={summary.pending}
          note={summary.pending > 0 ? 'Waiting for your decision' : 'Nothing waiting for review'}
          tag="Review"
          tone="amber"
          icon={<Hourglass className="w-5 h-5" />}
        />
        <SummaryCard
          label="Confirmed appointments"
          value={summary.confirmed}
          note="Scheduled and ready for customers"
          tag="Booked"
          tone="green"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <SummaryCard
          label="Completed appointments"
          value={summary.completed}
          note="Finished visits across your businesses"
          tag="History"
          tone="slate"
          icon={<CheckCheck className="w-5 h-5" />}
        />
      </section>

      <section className="rounded-2xl border border-border-subtle bg-surface-card shadow-subtle overflow-hidden">
        <div className="p-5 lg:p-6 border-b border-border-subtle">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
                <CalendarClock className="w-3.5 h-3.5" />
                Appointment manager
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-text-primary">
                All appointments
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {businessFilter === 'all'
                  ? 'Every customer request and booking across your businesses.'
                  : `Showing customer activity for ${selectedBusinessName}.`}
              </p>
            </div>
            <div className="inline-flex items-center self-start xl:self-auto rounded-full border border-border-subtle bg-surface-warm px-3 py-1.5 text-[11px] font-semibold text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5" />
              {businessAppointments.length} total appointment
              {businessAppointments.length === 1 ? '' : 's'}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 rounded-xl bg-surface-container p-1 overflow-x-auto">
            {statusFilters.map((filter) => {
              const isActive = statusFilter === filter.id;
              const count = statusCounts[filter.id];

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-surface-card text-primary shadow-subtle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-card/60'
                  }`}
                >
                  {filter.label}
                  <span
                    className={`min-w-[18px] px-1.5 py-0.5 rounded-full text-[10px] font-bold text-center ${
                      isActive
                        ? 'bg-teal-wash text-teal-deep'
                        : 'bg-surface-card/80 text-text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!hasBusinessAppointments ? (
          <div className="p-8 sm:p-12 text-center">
            <span className="w-14 h-14 rounded-2xl bg-teal-wash text-primary flex items-center justify-center mx-auto mb-4">
              <CalendarX2 className="w-7 h-7" />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              No appointments yet
            </p>
            <h3 className="mt-1 text-xl font-bold text-text-primary">
              {businessFilter === 'all'
                ? 'Your appointment schedule is ready when customers book'
                : `No appointments for ${selectedBusinessName} yet`}
            </h3>
            <p className="mt-2 text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
              {businessFilter === 'all'
                ? 'When a customer requests a booking, it will appear here ready for you to accept, reschedule or manage.'
                : 'Choose another business from the selector above, or check back when a customer makes a booking.'}
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
              {businessFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setBusinessFilter('all')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <Store className="w-4 h-4" />
                  View all businesses
                </button>
              )}
              <Link
                to="/owner"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-sm font-semibold hover:bg-surface-warm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to dashboard
              </Link>
            </div>
          </div>
        ) : !hasMatchingAppointments ? (
          <div className="p-8 sm:p-12 text-center">
            <span className="w-14 h-14 rounded-2xl bg-surface-warm text-text-muted flex items-center justify-center mx-auto mb-4 border border-border-subtle">
              <Search className="w-7 h-7" />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              No matching results
            </p>
            <h3 className="mt-1 text-xl font-bold text-text-primary">
              No appointments match your current filters
            </h3>
            <p className="mt-2 text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
              Try a different customer name or service, choose another date, or widen the
              appointment status filter.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Clear filters
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-sm font-semibold hover:bg-surface-warm transition-colors"
              >
                View all statuses
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-text-muted text-[10px] font-bold uppercase tracking-[0.12em]">
                    <th className="py-3 px-5">Customer</th>
                    <th className="py-3 px-4">Service &amp; business</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {visibleAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className={`transition-colors ${
                        appointment.date === TODAY_ISO
                          ? 'bg-teal-wash/25 hover:bg-teal-wash/45'
                          : 'hover:bg-surface-warm/60'
                      }`}
                    >
                      <td className="py-4 px-5 align-top">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <CustomerAvatar appointment={appointment} />
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => setDetailsId(appointment.id)}
                              className="block max-w-[180px] truncate text-left text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                            >
                              {appointment.customerName}
                            </button>
                            <a
                              href={`tel:${appointment.customerPhone.replace(/\s/g, '')}`}
                              className="mt-1 inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              {appointment.customerPhone}
                            </a>
                            <p className="mt-0.5 max-w-[190px] truncate text-[10px] text-text-muted">
                              {appointment.customerNote}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <p className="text-sm font-medium text-text-primary">{appointment.service}</p>
                        <p className="mt-0.5 text-[11px] text-text-muted">
                          {appointment.duration} · {appointment.price}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-text-muted">
                          <Store className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[210px]">{appointment.listingName}</span>
                        </p>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <p className="text-sm font-semibold text-text-primary whitespace-nowrap">
                          {appointment.time}
                        </p>
                        <p
                          className={`mt-0.5 text-[11px] whitespace-nowrap ${
                            appointment.date === TODAY_ISO
                              ? 'font-semibold text-primary'
                              : 'text-text-muted'
                          }`}
                        >
                          {formatAppointmentDate(appointment.date)}
                        </p>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <PaymentStatusBadge status={appointment.paymentStatus} />
                        <p className="mt-1 text-[11px] font-semibold text-text-secondary">
                          {appointment.price}
                        </p>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <AppointmentStatusBadge status={appointment.status} />
                      </td>

                      <td className="py-4 px-5 align-top">{renderQuickActions(appointment)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden p-4 bg-surface-warm/35">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visibleAppointments.map((appointment) => (
                  <article
                    key={appointment.id}
                    className={`rounded-xl border bg-surface-card p-4 shadow-subtle ${
                      appointment.date === TODAY_ISO ? 'border-primary/30' : 'border-border-subtle'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <CustomerAvatar appointment={appointment} className="w-10 h-10 text-xs" />
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setDetailsId(appointment.id)}
                            className="block truncate text-left text-sm font-bold text-text-primary hover:text-primary transition-colors"
                          >
                            {appointment.customerName}
                          </button>
                          <p className="mt-0.5 truncate text-[11px] text-text-muted">
                            {appointment.customerNote}
                          </p>
                          <a
                            href={`tel:${appointment.customerPhone.replace(/\s/g, '')}`}
                            className="mt-1 inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            {appointment.customerPhone}
                          </a>
                        </div>
                      </div>
                      <AppointmentStatusBadge status={appointment.status} />
                    </div>

                    <div className="mt-3 rounded-lg bg-surface-warm/70 border border-border-subtle p-3">
                      <p className="text-sm font-semibold text-text-primary">
                        {appointment.service}
                      </p>
                      <p className="mt-0.5 text-[11px] text-text-muted">
                        {appointment.duration} · {appointment.price}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-text-muted">
                        <Store className="w-3.5 h-3.5 text-primary shrink-0" />
                        {appointment.listingName}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-surface-container-low p-2.5">
                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-text-muted">
                          Schedule
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-text-primary">
                          <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                          {formatAppointmentDate(appointment.date)}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-text-secondary">
                          <Clock3 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {appointment.time}
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-2.5">
                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-text-muted">
                          Payment
                        </p>
                        <div className="mt-1">
                          <PaymentStatusBadge status={appointment.paymentStatus} />
                        </div>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-text-secondary">
                          <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{appointment.customerEmail}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border-subtle">
                      {renderQuickActions(appointment, true)}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-text-muted">
              <span>
                Showing <strong className="font-semibold text-text-secondary">{visibleAppointments.length}</strong>{' '}
                of <strong className="font-semibold text-text-secondary">{businessAppointments.length}</strong>{' '}
                appointments
                {businessFilter !== 'all' ? ` for ${selectedBusinessName}` : ''}
              </span>
              <Link
                to="/owner"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:text-teal-deep"
              >
                Return to dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="rounded-2xl border border-dashed border-primary/25 bg-teal-wash/25 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-xl bg-surface-card text-primary flex items-center justify-center shrink-0 border border-border-subtle">
              <PlusCircle className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-text-primary">Need more bookable time?</p>
              <p className="mt-0.5 text-xs text-text-secondary">
                Add another service or business so customers can find and request more of what you
                offer.
              </p>
            </div>
          </div>
          <Link
            to="/owner/listings/new"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-xs font-semibold shadow-sm transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Add business
          </Link>
        </div>
      </section>

      {detailsAppointment && (
        <AppointmentDetailsDialog
          appointment={detailsAppointment}
          onClose={() => setDetailsId(null)}
          onAccept={handleAccept}
          onReject={requestReject}
          onReschedule={openReschedule}
          onComplete={handleComplete}
          onCancel={requestCancel}
        />
      )}

      {rescheduleAppointment && (
        <RescheduleAppointmentDialog
          appointment={rescheduleAppointment}
          onClose={() => setRescheduleId(null)}
          onSave={handleReschedule}
        />
      )}

      {confirmAction && appointmentForConfirmation && (
        <AppointmentConfirmDialog
          title={
            confirmAction.action === 'reject'
              ? 'Reject this booking request?'
              : 'Cancel this appointment?'
          }
          description={
            confirmAction.action === 'reject'
              ? `${appointmentForConfirmation.customerName}'s request for ${appointmentForConfirmation.service} on ${formatLongDate(appointmentForConfirmation.date)} at ${appointmentForConfirmation.time} will be declined. The customer will not be charged.`
              : `${appointmentForConfirmation.customerName}'s ${appointmentForConfirmation.service} appointment on ${formatLongDate(appointmentForConfirmation.date)} at ${appointmentForConfirmation.time} will be cancelled. Any completed payment will be marked as refunded.`
          }
          confirmLabel={
            confirmAction.action === 'reject' ? 'Reject appointment' : 'Cancel appointment'
          }
          onConfirm={handleConfirmAction}
          onClose={() => setConfirmAction(null)}
        />
      )}

      {feedback && (
        <div
          className="fixed bottom-6 right-4 sm:right-6 z-[80] max-w-sm flex items-center gap-3 rounded-xl bg-text-primary text-white px-4 py-3 shadow-floating"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-teal-light shrink-0" />
          <p className="text-sm font-medium">{feedback}</p>
        </div>
      )}
    </div>
  );
};
