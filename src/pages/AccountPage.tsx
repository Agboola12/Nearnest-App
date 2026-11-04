import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, ChevronRight, Settings, Heart, Bell, LogOut, CheckCircle, XCircle, AlertCircle, Store } from 'lucide-react';
import { POPULAR_LISTINGS } from '../data/mockListings';
import { OWNER_PROFILE } from '../data/mockOwnerDashboard';

const MOCK_BOOKINGS = [
  {
    id: 'BK-123456',
    listingSlug: 'the-heritage-barber-and-co',
    service: 'Cut & Beard',
    date: '2026-10-30',
    time: '2:30 PM',
    status: 'confirmed',
    price: '£35'
  },
  {
    id: 'BK-789012',
    listingSlug: 'bloom-and-wildwood-florals',
    service: 'Consultation',
    date: '2026-10-28',
    time: '11:00 AM',
    status: 'completed',
    price: '£0'
  },
];

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'favorites'>('upcoming');

  const upcomingBookings = MOCK_BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = MOCK_BOOKINGS.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-pending-bg text-status-pending-text text-xs font-semibold">
            <AlertCircle className="w-3 h-3" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-text-secondary text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-rejected-bg text-status-rejected-text text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <section className="bg-surface-card border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={OWNER_PROFILE.avatar}
                alt={OWNER_PROFILE.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">My Account</h1>
                <p className="text-text-secondary">{OWNER_PROFILE.fullName} · {OWNER_PROFILE.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/owner"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-teal-deep transition-colors"
              >
                <Store className="w-4 h-4" />
                <span className="text-sm font-medium">Business Dashboard</span>
              </Link>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-text-secondary hover:bg-surface-warm transition-colors">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Account Settings</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-4 shadow-sm">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    activeTab === 'upcoming' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-warm'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Upcoming Bookings</span>
                  {upcomingBookings.length > 0 && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                      activeTab === 'upcoming' ? 'bg-white/20' : 'bg-surface-warm'
                    }`}>
                      {upcomingBookings.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    activeTab === 'past' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-warm'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Booking History</span>
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    activeTab === 'favorites' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-warm'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Saved Places</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-text-secondary hover:bg-surface-warm transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notifications</span>
                </button>
                <div className="pt-2 mt-2 border-t border-border-subtle">
                  <Link
                    to="/owner"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-text-secondary hover:bg-surface-warm transition-colors"
                  >
                    <Store className="w-5 h-5" />
                    <span className="font-medium">Business Dashboard</span>
                  </Link>
                </div>
                <Link
                  to="/auth"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-text-secondary hover:bg-surface-warm transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === 'upcoming' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">Upcoming Appointments</h2>
                  <Link to="/search" className="text-sm text-primary hover:text-teal-deep font-semibold">
                    Book New Appointment
                  </Link>
                </div>
                {upcomingBookings.length === 0 ? (
                  <div className="bg-surface-card rounded-2xl border border-border-subtle p-12 text-center">
                    <Calendar className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">No upcoming appointments</h3>
                    <p className="text-text-secondary mb-6">Book your first appointment to get started</p>
                    <Link to="/search" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Browse Businesses</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => {
                      const listing = POPULAR_LISTINGS.find(l => l.slug === booking.listingSlug);
                      return (
                        <div key={booking.id} className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              {listing && (
                                <img
                                  src={listing.coverImage}
                                  alt={listing.name}
                                  className="w-16 h-16 rounded-xl object-cover"
                                />
                              )}
                              <div>
                                <h3 className="text-lg font-bold text-text-primary mb-1">{listing?.name}</h3>
                                <p className="text-sm text-text-secondary mb-2">{booking.service}</p>
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-text-muted">Booking ID</p>
                              <p className="font-mono text-sm font-semibold text-text-primary">{booking.id}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4 bg-surface-warm rounded-xl">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-xs text-text-muted">Date</p>
                                <p className="text-sm font-semibold text-text-primary">{new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-xs text-text-muted">Time</p>
                                <p className="text-sm font-semibold text-text-primary">{booking.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-xs text-text-muted">Location</p>
                                <p className="text-sm font-semibold text-text-primary">{listing?.address.city}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Link
                              to={`/listing/${booking.listingSlug}`}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-text-primary text-sm font-semibold hover:bg-surface-warm transition-colors"
                            >
                              <span>View Business</span>
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-text-secondary text-sm font-semibold hover:bg-surface-warm transition-colors">
                              Cancel Booking
                            </button>
                            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-text-secondary text-sm font-semibold hover:bg-surface-warm transition-colors">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-6">Booking History</h2>
                {pastBookings.length === 0 ? (
                  <div className="bg-surface-card rounded-2xl border border-border-subtle p-12 text-center">
                    <Clock className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">No past bookings</h3>
                    <p className="text-text-secondary">Your booking history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => {
                      const listing = POPULAR_LISTINGS.find(l => l.slug === booking.listingSlug);
                      return (
                        <div key={booking.id} className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm opacity-90">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              {listing && (
                                <img
                                  src={listing.coverImage}
                                  alt={listing.name}
                                  className="w-16 h-16 rounded-xl object-cover grayscale"
                                />
                              )}
                              <div>
                                <h3 className="text-lg font-bold text-text-primary mb-1">{listing?.name}</h3>
                                <p className="text-sm text-text-secondary mb-2">{booking.service}</p>
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-text-muted">Booking ID</p>
                              <p className="font-mono text-sm font-semibold text-text-primary">{booking.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(booking.date).toLocaleDateString('en-GB')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {booking.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold transition-all">
                                <Star className="w-4 h-4" />
                                <span>Leave Review</span>
                              </button>
                              <Link
                                to={`/booking/${booking.listingSlug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-text-primary text-sm font-semibold hover:bg-surface-warm transition-colors"
                              >
                                Book Again
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-6">Saved Places</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {POPULAR_LISTINGS.slice(0, 2).map((listing) => (
                    <div key={listing.id} className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-32">
                        <img
                          src={listing.coverImage}
                          alt={listing.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-text-primary mb-1">{listing.name}</h3>
                        <p className="text-xs text-text-muted mb-2">{listing.categoryLabel}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            {listing.rating && (
                              <>
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span className="font-semibold">{listing.rating}</span>
                              </>
                            )}
                          </div>
                          <Link
                            to={`/listing/${listing.slug}`}
                            className="text-xs text-primary hover:text-teal-deep font-semibold"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
