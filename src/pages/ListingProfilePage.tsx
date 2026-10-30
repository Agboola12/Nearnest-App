import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, CheckCircle, Clock, Calendar, ArrowLeft, Phone, Mail, Share2, Heart, Navigation, ChevronRight, Users } from 'lucide-react';
import { POPULAR_LISTINGS } from '../data/mockListings';
import { NotFoundPage } from './NotFoundPage';

export const ListingProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const listing = POPULAR_LISTINGS.find((item) => item.slug === slug);

  if (!listing) {
    return <NotFoundPage />;
  }

  const getActionButton = () => {
    if (listing.isBookable) {
      return (
        <Link
          to={`/booking/${listing.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Calendar className="w-5 h-5" />
          <span>{listing.actionText}</span>
        </Link>
      );
    }
    return (
      <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-warm hover:bg-surface-container border border-border-subtle text-text-primary font-semibold text-sm transition-all active:scale-95">
        <Phone className="w-5 h-5" />
        <span>{listing.actionText}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Breadcrumb */}
      <section className="bg-surface-card border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/search" className="hover:text-primary transition-colors">Search</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-text-primary font-medium">{listing.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={listing.coverImage}
                  alt={listing.coverAlt}
                  className="w-full h-full object-cover"
                />
                {listing.isVerified && listing.verificationBadgeText && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-sm font-semibold shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                      {listing.verificationBadgeText}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg">
                    <Share2 className="w-5 h-5 text-text-primary" />
                  </button>
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg">
                    <Heart className="w-5 h-5 text-text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm sticky top-24">
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-warm text-text-primary text-xs font-semibold mb-3">
                    {listing.categoryLabel}
                  </span>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">{listing.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <span>{listing.address.street}, {listing.address.city}, {listing.address.postalCode}</span>
                  </div>
                  
                  {listing.rating ? (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(listing.rating!) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{listing.rating.toFixed(1)}</span>
                      <span className="text-sm text-text-muted">({listing.reviewCount} reviews)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-4 text-sm text-text-secondary">
                      <Users className="w-4 h-4" />
                      <span>New to directory</span>
                    </div>
                  )}
                </div>

                {getActionButton()}

                <div className="mt-4 pt-4 border-t border-border-subtle">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-warm transition-colors">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-primary mb-4">About</h2>
                <p className="text-text-secondary leading-relaxed">
                  {listing.category === 'services' && 'Professional grooming services with skilled barbers providing quality cuts and traditional techniques in a welcoming neighborhood setting.'}
                  {listing.category === 'shops' && 'Independent local shop offering curated products and personal service in the heart of the community.'}
                  {listing.category === 'churches' && 'Community parish providing worship services, community halls for hire, and local outreach programs.'}
                  {listing.category === 'schools' && 'Educational institution committed to providing quality learning experiences with community-focused values.'}
                </p>
              </div>

              {/* Opening Hours / Schedule */}
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {listing.isBookable ? 'Opening Hours & Booking' : 'Hours & Schedule'}
                </h2>
                <div className="space-y-3">
                  {listing.openingHoursText && (
                    <div className="flex items-center justify-between py-2 border-b border-border-subtle/60">
                      <span className="text-text-secondary">Status</span>
                      <span className="font-semibold text-status-confirmed-text">{listing.openingHoursText}</span>
                    </div>
                  )}
                  {listing.bookingStatusText && (
                    <div className="flex items-center justify-between py-2 border-b border-border-subtle/60">
                      <span className="text-text-secondary">{listing.isBookable ? 'Next Available' : 'Schedule'}</span>
                      <span className="font-semibold text-text-primary">{listing.bookingStatusText}</span>
                    </div>
                  )}
                  {listing.secondaryNote && (
                    <p className="text-sm text-text-muted italic pt-2">{listing.secondaryNote}</p>
                  )}
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Monday</span>
                      <span className="text-text-primary">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Tuesday</span>
                      <span className="text-text-primary">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Wednesday</span>
                      <span className="text-text-primary">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Thursday</span>
                      <span className="text-text-primary">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Friday</span>
                      <span className="text-text-primary">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Saturday</span>
                      <span className="text-text-primary">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Sunday</span>
                      <span className="text-text-muted">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h2>
                <p className="text-text-secondary mb-4">
                  {listing.address.street}<br />
                  {listing.address.city}, {listing.address.postalCode}
                </p>
                <div className="h-48 bg-surface-warm rounded-xl flex items-center justify-center border border-border-subtle">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-text-muted">Map view coming soon</p>
                    <p className="text-xs text-text-muted">{listing.distance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact */}
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
                <h3 className="text-lg font-bold text-text-primary mb-4">Contact</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-warm transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-teal-wash flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Call</p>
                      <p className="text-xs text-text-muted">+44 20 1234 5678</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-warm transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-teal-wash flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Email</p>
                      <p className="text-xs text-text-muted">Contact via form</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Similar Places */}
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
                <h3 className="text-lg font-bold text-text-primary mb-4">Similar Places</h3>
                <div className="space-y-3">
                  {POPULAR_LISTINGS.filter(item => item.id !== listing.id && item.category === listing.category).slice(0, 3).map((similar) => (
                    <Link
                      key={similar.id}
                      to={`/listing/${similar.slug}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-warm transition-colors group"
                    >
                      <img
                        src={similar.coverImage}
                        alt={similar.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary group-hover:text-primary truncate">
                          {similar.name}
                        </p>
                        <p className="text-xs text-text-muted truncate">{similar.categoryLabel}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
                <Link to="/search" className="block text-center text-sm text-primary hover:text-teal-deep font-semibold mt-4">
                  View all results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
