import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CalendarDays,
  CalendarX2,
  CheckCircle2,
  Circle,
  Clock3,
  ExternalLink,
  Hourglass,
  MapPin,
  PlusCircle,
  Store,
} from 'lucide-react';
import { OWNER_APPOINTMENTS, OWNER_LISTINGS, OWNER_PROFILE } from '../data/mockOwnerDashboard';
import { AppointmentStatus, OwnerAppointment, OwnerListing } from '../types';
import { AppointmentStatusBadge } from '../components/owner/StatusBadge';
import { ListingCard } from '../components/owner/ListingCard';
import { ManageListingModal } from '../components/owner/ManageListingModal';

type AppointmentTab = 'upcoming' | 'pending' | 'completed' | 'cancelled';
type AvailabilityStatus = 'open' | 'full' | 'break';

const getLocalIsoDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const TODAY_ISO = getLocalIsoDate(new Date());

const parseTimeToMinutes = (time: string) => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') {
    hours += 12;
  }

  return hours * 60 + Number(match[2]);
};

const sortAppointments = (appointments: OwnerAppointment[]) => {
  return [...appointments].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
  });
};

const formatAppointmentDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T12:00:00`);
  const shortDate = date.toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  if (isoDate === TODAY_ISO) {
    return `Today, ${date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}`;
  }

  return shortDate;
};

const statToneClasses = {
  teal: 'bg-teal-wash text-primary',
  amber: 'bg-badge-amber-bg text-badge-amber-text',
  green: 'bg-status-confirmed-bg text-status-confirmed-text',
  slate: 'bg-surface-container text-text-secondary',
} as const;

interface StatCardProps {
  label: string;
  value: number;
  note: React.ReactNode;
  icon: React.ReactNode;
  tone: keyof typeof statToneClasses;
  footer: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, note, icon, tone, footer }) => {
  return (
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
        <div className="text-[11px] text-text-muted leading-snug">{note}</div>
        {footer}
      </div>
    </div>
  );
};

interface CustomerAvatarProps {
  appointment: OwnerAppointment;
}

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ appointment }) => {
  if (appointment.customerImage) {
    return (
      <img
        src={appointment.customerImage}
        alt={appointment.customerName}
        className="w-9 h-9 rounded-full object-cover border border-border-subtle shrink-0"
        loading="lazy"
      />
    );
  }

  return (
    <span className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold flex items-center justify-center shrink-0 border border-border-subtle">
      {appointment.customerInitials}
    </span>
  );
};

export const OwnerDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<OwnerAppointment[]>(OWNER_APPOINTMENTS);
  const [listings, setListings] = useState<OwnerListing[]>(OWNER_LISTINGS);
  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming');
  const [availability, setAvailability] = useState<AvailabilityStatus>('open');
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [managedListing, setManagedListing] = useState<OwnerListing | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!feedback) return;

    const timeout = window.setTimeout(() => setFeedback(''), 3800);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const counts = {
    upcoming: appointments.filter(
      (appointment) =>
        appointment.status === 'confirmed' || appointment.status === 'pending'
    ).length,
    pending: appointments.filter((appointment) => appointment.status === 'pending').length,
    completed: appointments.filter((appointment) => appointment.status === 'completed').length,
    cancelled: appointments.filter((appointment) => appointment.status === 'cancelled').length,
  };

  const publishedListings = listings.filter((listing) => listing.status === 'published').length;
  const sortedAppointments = sortAppointments(appointments);

  let visibleAppointments = sortedAppointments;
  if (activeTab === 'upcoming') {
    visibleAppointments = sortedAppointments.filter(
      (appointment) =>
        appointment.status === 'confirmed' || appointment.status === 'pending'
    );
  } else if (activeTab === 'pending') {
    visibleAppointments = sortedAppointments.filter(
      (appointment) => appointment.status === 'pending'
    );
  } else if (activeTab === 'completed') {
    visibleAppointments = sortedAppointments.filter(
      (appointment) => appointment.status === 'completed'
    );
  } else {
    visibleAppointments = sortedAppointments.filter(
      (appointment) => appointment.status === 'cancelled'
    );
  }

  const todaysAppointments = sortedAppointments.filter(
    (appointment) => appointment.date === TODAY_ISO && appointment.status !== 'cancelled'
  );
  const todaysCompleted = todaysAppointments.filter(
    (appointment) => appointment.status === 'completed'
  ).length;
  const todaysRemaining = todaysAppointments.filter(
    (appointment) => appointment.status === 'confirmed' || appointment.status === 'pending'
  ).length;
  const todaysProgress =
    todaysAppointments.length > 0 ? Math.round((todaysCompleted / todaysAppointments.length) * 100) : 0;

  const nextAppointment = sortedAppointments.find(
    (appointment) =>
      (appointment.status === 'confirmed' || appointment.status === 'pending') &&
      appointment.date >= TODAY_ISO
  );

  const readinessItems = [
    {
      title: 'Business profile details',
      description: 'Photos, address & map pin verified',
      done: true,
    },
    {
      title: 'Operating hours set',
      description: 'Standard weekly shifts configured',
      done: true,
    },
    {
      title: 'Service catalogue configured',
      description: 'Pricing and duration assigned',
      done: true,
    },
    {
      title: 'Sync staff calendars',
      description: 'Avoid double bookings with calendar sync',
      done: calendarConnected,
    },
  ];
  const readinessCompleted = readinessItems.filter((item) => item.done).length;
  const readinessProgress = Math.round((readinessCompleted / readinessItems.length) * 100);

  const availabilityCopy: Record<AvailabilityStatus, string> = {
    open: 'Accepting walk-ins and online bookings.',
    full: 'Fully booked — new requests will be queued.',
    break: 'On a short break — bookings resume soon.',
  };

  const tabs: { id: AppointmentTab; label: string; count: number }[] = [
    { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const updateAppointmentStatus = (
    appointmentId: string,
    status: AppointmentStatus,
    message: string
  ) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status } : appointment
      )
    );
    setFeedback(message);
  };

  const handleApprove = (appointment: OwnerAppointment) => {
    updateAppointmentStatus(
      appointment.id,
      'confirmed',
      `${appointment.customerName}'s appointment has been confirmed.`
    );
  };

  const handleDecline = (appointment: OwnerAppointment) => {
    updateAppointmentStatus(
      appointment.id,
      'cancelled',
      `${appointment.customerName}'s request has been declined.`
    );
  };

  const handleCheckIn = (appointment: OwnerAppointment) => {
    updateAppointmentStatus(
      appointment.id,
      'completed',
      `${appointment.customerName}'s appointment has been marked complete.`
    );
  };

  const handleReviewPending = () => {
    setActiveTab('pending');
    scrollToSection('appointments');
  };

  const handleSaveListing = (updatedListing: OwnerListing) => {
    setListings((current) =>
      current.map((listing) => (listing.id === updatedListing.id ? updatedListing : listing))
    );
    setManagedListing(null);
    setFeedback(`${updatedListing.name} settings saved.`);
  };

  const renderAppointmentActions = (appointment: OwnerAppointment) => {
    if (appointment.status === 'pending') {
      return (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleApprove(appointment)}
            className="px-2.5 py-1.5 rounded-md bg-primary hover:bg-teal-deep text-white text-[11px] font-semibold shadow-sm transition-colors"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => handleDecline(appointment)}
            className="px-2.5 py-1.5 rounded-md bg-status-rejected-bg hover:bg-red-100 text-status-rejected-text text-[11px] font-semibold transition-colors"
          >
            Decline
          </button>
        </div>
      );
    }

    if (appointment.status === 'confirmed') {
      return (
        <button
          type="button"
          onClick={() => handleCheckIn(appointment)}
          className="px-2.5 py-1.5 rounded-md bg-surface-container hover:bg-surface-container-high text-text-primary text-[11px] font-semibold transition-colors"
        >
          Check in
        </button>
      );
    }

    return (
      <span className="text-[11px] text-text-muted">
        {appointment.status === 'completed' ? 'Settled' : '—'}
      </span>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
      {/* Welcome strip */}
      <section
        id="overview"
        className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-card p-5 sm:p-7 lg:p-8 shadow-subtle scroll-mt-24"
      >
        <div
          className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-teal-wash/80 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Live &amp; accepting bookings
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
              Welcome back, {OWNER_PROFILE.firstName}!
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-secondary">
              <Store className="w-4 h-4 text-teal-deep shrink-0" />
              <span className="font-semibold text-text-primary">{OWNER_PROFILE.businessName}</span>
              <span className="hidden sm:inline text-text-muted">•</span>
              <span className="inline-flex items-center gap-1 text-text-muted">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {OWNER_PROFILE.addressShort}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/listing/the-heritage-barber-and-co"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-text-primary text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View live listing
            </Link>
            <Link
              to="/owner/listings/new"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-xs font-semibold shadow-md shadow-primary/10 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Add new listing
            </Link>
          </div>
        </div>
      </section>

      {/* KPI overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total listings"
          value={listings.length}
          tone="teal"
          icon={<Store className="w-5 h-5" />}
          note={`${publishedListings} published · ${listings.length - publishedListings} in setup`}
          footer={
            <a
              href="#listings"
              className="text-[11px] font-semibold text-primary hover:text-teal-deep whitespace-nowrap"
            >
              Manage
            </a>
          }
        />

        <StatCard
          label="Upcoming appointments"
          value={counts.upcoming}
          tone="slate"
          icon={<CalendarClock className="w-5 h-5" />}
          note={
            nextAppointment
              ? `Next: ${nextAppointment.time} with ${nextAppointment.customerName.split(' ')[0]}`
              : 'Your calendar is clear'
          }
          footer={
            <a
              href="#appointments"
              className="text-[11px] font-semibold text-primary hover:text-teal-deep whitespace-nowrap"
            >
              Schedule
            </a>
          }
        />

        <StatCard
          label="Pending requests"
          value={counts.pending}
          tone="amber"
          icon={<Hourglass className="w-5 h-5" />}
          note="Awaiting your approval"
          footer={
            <button
              type="button"
              onClick={handleReviewPending}
              className="text-[11px] font-semibold text-primary hover:text-teal-deep whitespace-nowrap"
            >
              Review
            </button>
          }
        />

        <StatCard
          label="Completed appointments"
          value={counts.completed}
          tone="green"
          icon={<CheckCircle2 className="w-5 h-5" />}
          note="Appointments finished so far"
          footer={
            <span className="text-[11px] font-semibold text-status-confirmed-text whitespace-nowrap">
              Settled
            </span>
          }
        />
      </section>

      {/* Listings */}
      <section
        id="listings"
        className="rounded-2xl border border-border-subtle bg-surface-card p-5 lg:p-6 shadow-subtle scroll-mt-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Your portfolio
            </p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-text-primary">
              Business listings
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Manage the places customers discover, book and review.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-warm border border-border-subtle text-[11px] font-semibold text-text-secondary">
              {publishedListings} live
            </span>
            <Link
              to="/owner/listings/new"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Add new listing
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-primary/30 bg-teal-wash/50 p-8 sm:p-10 text-center">
            <span className="w-12 h-12 rounded-xl bg-teal-wash text-primary flex items-center justify-center mx-auto mb-4">
              <Store className="w-6 h-6" />
            </span>
            <h3 className="text-lg font-bold text-text-primary">No listings yet</h3>
            <p className="mt-1 text-sm text-text-secondary max-w-md mx-auto">
              Create your first listing so neighbours can discover your business and book appointments.
            </p>
            <Link
              to="/owner/listings/new"
              className="mt-5 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Add your first listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onManage={(item) => setManagedListing(item)}
              />
            ))}

            <Link
              to="/owner/listings/new"
              className="hidden xl:flex flex-col items-center justify-center gap-2 min-h-[280px] rounded-xl border border-dashed border-primary/30 bg-teal-wash/30 p-6 text-center hover:bg-teal-wash/60 hover:border-primary/50 transition-colors group"
            >
              <span className="w-11 h-11 rounded-xl bg-surface-card text-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </span>
              <span className="text-sm font-bold text-text-primary">Add another listing</span>
              <span className="text-xs text-text-muted max-w-[180px]">
                A new shop, clinic, hall or academy.
              </span>
            </Link>
          </div>
        )}
      </section>

      {/* Appointments + side rail */}
      <section
        id="appointments"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start scroll-mt-24"
      >
        <div className="lg:col-span-8 rounded-2xl border border-border-subtle bg-surface-card shadow-subtle overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-border-subtle">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Schedule
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-text-primary">
                  Appointment manager
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Review requests, check customers in and keep your day moving.
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-xl bg-surface-container p-1 overflow-x-auto shrink-0">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-surface-card text-primary shadow-subtle'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-card/60'
                      }`}
                    >
                      {tab.label}
                      <span
                        className={`min-w-[18px] px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-teal-wash text-teal-deep'
                            : 'bg-surface-card/80 text-text-muted'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {visibleAppointments.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <span className="w-12 h-12 rounded-xl bg-teal-wash text-primary flex items-center justify-center mx-auto mb-4">
                <CalendarX2 className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-text-primary">
                No {activeTab} appointments
              </h3>
              <p className="mt-1 text-sm text-text-secondary max-w-md mx-auto">
                {activeTab === 'upcoming'
                  ? 'New customer requests will appear here as soon as they book.'
                  : 'There are no appointments in this view right now.'}
              </p>
              {activeTab !== 'upcoming' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('upcoming')}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
                >
                  View upcoming appointments
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/owner/listings/new"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add a bookable listing
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-text-muted text-[10px] font-bold uppercase tracking-[0.12em]">
                      <th className="py-3 px-5">Time &amp; date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {visibleAppointments.map((appointment) => {
                      const isNext = appointment.id === nextAppointment?.id;
                      return (
                        <tr
                          key={appointment.id}
                          className={`transition-colors ${
                            isNext ? 'bg-teal-wash/35' : 'hover:bg-surface-warm/60'
                          }`}
                        >
                          <td className="py-4 px-5 align-top">
                            <p className="text-sm font-semibold text-text-primary whitespace-nowrap">
                              {appointment.time}
                            </p>
                            <p className="mt-0.5 text-[11px] text-text-muted">
                              {formatAppointmentDate(appointment.date)}
                            </p>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <CustomerAvatar appointment={appointment} />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-text-primary truncate">
                                  {appointment.customerName}
                                </p>
                                <p className="text-[11px] text-text-muted truncate">
                                  {appointment.customerNote}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <p className="text-sm font-medium text-text-primary">
                              {appointment.service}
                            </p>
                            <p className="mt-0.5 text-[11px] text-text-muted">
                              {appointment.duration} · {appointment.price}
                            </p>
                            <p className="mt-0.5 text-[10px] text-text-muted truncate max-w-[190px]">
                              {appointment.listingName}
                            </p>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <AppointmentStatusBadge status={appointment.status} />
                          </td>
                          <td className="py-4 px-5 align-top text-right">
                            {renderAppointmentActions(appointment)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border-subtle">
                {visibleAppointments.map((appointment) => {
                  const isNext = appointment.id === nextAppointment?.id;
                  return (
                    <div
                      key={appointment.id}
                      className={`p-4 space-y-3 ${isNext ? 'bg-teal-wash/35' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CustomerAvatar appointment={appointment} />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">
                              {appointment.customerName}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {appointment.customerNote}
                            </p>
                          </div>
                        </div>
                        <AppointmentStatusBadge status={appointment.status} />
                      </div>

                      <div className="rounded-lg bg-surface-warm/70 p-3">
                        <p className="text-sm font-medium text-text-primary">
                          {appointment.service}
                        </p>
                        <p className="mt-0.5 text-[11px] text-text-muted">
                          {appointment.duration} · {appointment.price}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-text-secondary">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-primary" />
                            {formatAppointmentDate(appointment.date)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="w-3.5 h-3.5 text-primary" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end">{renderAppointmentActions(appointment)}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="p-4 bg-surface-container-low border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-text-muted">
            <span>
              Showing {visibleAppointments.length} of {appointments.length} appointments
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:text-teal-deep self-start sm:self-auto"
            >
              View upcoming schedule
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Side rail */}
        <aside className="lg:col-span-4 space-y-6">
          <section className="rounded-2xl border border-border-subtle bg-surface-card p-5 shadow-subtle">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  Today
                </p>
                <h3 className="mt-1 text-lg font-bold text-text-primary">Today&apos;s schedule</h3>
              </div>
              <span className="p-2 rounded-lg bg-teal-wash text-primary">
                <CalendarClock className="w-4 h-4" />
              </span>
            </div>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-text-primary">
                {todaysAppointments.length}
              </span>
              <span className="pb-1 text-sm text-text-muted">appointments</span>
            </div>
            <p className="mt-1 text-[11px] text-text-muted">
              {new Date(`${TODAY_ISO}T12:00:00`).toLocaleDateString('en-GB', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                <span className="text-text-secondary">{todaysCompleted} completed</span>
                <span className="text-text-muted">{todaysRemaining} remaining</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${todaysProgress}%` }}
                />
              </div>
            </div>

            {nextAppointment ? (
              <div className="mt-4 rounded-xl bg-surface-warm/80 border border-border-subtle p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
                  Next up
                </p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <CustomerAvatar appointment={nextAppointment} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {nextAppointment.customerName}
                    </p>
                    <p className="text-[11px] text-text-muted truncate">
                      {nextAppointment.time} · {nextAppointment.service}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl bg-surface-warm/80 border border-border-subtle p-3 text-xs text-text-muted">
                No appointments remaining today.
              </div>
            )}

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-text-secondary">Availability</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-text-secondary capitalize">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      availability === 'open'
                        ? 'bg-status-confirmed-text'
                        : availability === 'full'
                          ? 'bg-status-pending-text'
                          : 'bg-status-rejected-text'
                    }`}
                  />
                  {availability}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface-container p-1">
                {(['open', 'full', 'break'] as AvailabilityStatus[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setAvailability(option);
                      setFeedback(
                        option === 'open'
                          ? 'You are now accepting new bookings.'
                          : option === 'full'
                            ? 'Your listing is marked as fully booked.'
                            : 'Your listing is on a short break.'
                      );
                    }}
                    className={`py-1.5 rounded-md text-[11px] font-semibold capitalize transition-all ${
                      availability === option
                        ? 'bg-surface-card text-primary shadow-subtle'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-text-muted">{availabilityCopy[availability]}</p>
            </div>
          </section>

          <section
            id="readiness"
            className="rounded-2xl border border-border-subtle bg-surface-card p-5 shadow-subtle scroll-mt-24"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  Listing readiness
                </p>
                <h3 className="mt-1 text-lg font-bold text-text-primary">Setup checklist</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal-wash text-teal-deep text-[11px] font-bold whitespace-nowrap">
                {readinessCompleted} of {readinessItems.length}
              </span>
            </div>

            <div className="mt-4 w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${readinessProgress}%` }}
              />
            </div>

            <ul className="mt-4 space-y-2">
              {readinessItems.map((item) => (
                <li
                  key={item.title}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg ${
                    item.done ? 'bg-surface-container-low' : 'bg-badge-amber-bg/40'
                  }`}
                >
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-status-confirmed-text shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary">{item.title}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{item.description}</p>
                    {!item.done && (
                      <button
                        type="button"
                        onClick={() => {
                          setCalendarConnected(true);
                          setFeedback('Calendar sync connected for this demo.');
                        }}
                        className="mt-2 px-2.5 py-1 rounded-md bg-primary hover:bg-teal-deep text-white text-[10px] font-bold transition-colors"
                      >
                        Connect calendar
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </section>

      {/* Growth callout */}
      <section className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-r from-teal-wash via-surface-card to-surface-warm p-5 sm:p-7 shadow-subtle">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4 max-w-3xl">
            <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
              <Building2 className="w-6 h-6" />
            </span>
            <div>
              <span className="inline-flex px-2 py-0.5 rounded bg-surface-card text-teal-deep text-[10px] font-bold uppercase tracking-[0.12em] shadow-subtle">
                Multi-location &amp; new organisations
              </span>
              <h2 className="mt-2 text-lg sm:text-xl font-bold text-text-primary">
                Growing your neighbourhood presence?
              </h2>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                Register another shop, health clinic, community hall or academy to centralise
                bookings, confirmations and verified local discovery under one NearNest account.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:shrink-0">
            <Link
              to="/owner/listings/new"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Add new listing
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-card hover:bg-surface-container text-text-primary text-xs font-semibold border border-border-subtle transition-colors"
            >
              Browse directory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {managedListing && (
        <ManageListingModal
          listing={managedListing}
          onClose={() => setManagedListing(null)}
          onSave={handleSaveListing}
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
