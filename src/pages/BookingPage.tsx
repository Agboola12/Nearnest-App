import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, ChevronRight, User, Phone, Mail, AlertCircle } from 'lucide-react';
import { POPULAR_LISTINGS } from '../data/mockListings';

const SERVICES = [
  { id: '1', name: 'Classic Cut', duration: '30 min', price: '£25' },
  { id: '2', name: 'Beard Trim', duration: '15 min', price: '£15' },
  { id: '3', name: 'Cut & Beard', duration: '45 min', price: '£35' },
  { id: '4', name: 'Hot Towel Shave', duration: '30 min', price: '£30' },
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
];

export const BookingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const listing = POPULAR_LISTINGS.find((item) => item.slug === slug);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!listing || !listing.isBookable) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Booking Not Available</h1>
            <p className="text-text-secondary">
              This business doesn't accept online bookings or the listing wasn't found.
            </p>
          </div>
          <Link
            to={listing ? `/listing/${listing.slug}` : '/search'}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>
      </div>
    );
  }

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <section className="bg-surface-card border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to={`/listing/${listing.slug}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to {listing.name}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Book Appointment</h1>
          <p className="text-text-secondary mt-1">{listing.name} • {listing.address.city}</p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-surface-card border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Confirmation' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step >= s.num ? 'bg-primary text-white' : 'bg-surface-warm text-text-muted'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-sm font-medium ${step >= s.num ? 'text-text-primary' : 'text-text-muted'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${step > s.num ? 'bg-primary' : 'bg-border-subtle'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4">Select Service</h2>
              <div className="space-y-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedService.id === service.id
                        ? 'border-primary bg-teal-wash'
                        : 'border-border-subtle hover:border-primary/50 hover:bg-surface-warm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-text-primary">{service.name}</h3>
                        <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          {service.duration}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-primary">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4">Select Date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      selectedDate.toDateString() === date.toDateString()
                        ? 'border-primary bg-teal-wash'
                        : 'border-border-subtle hover:border-primary/50'
                    }`}
                  >
                    <div className="text-xs text-text-muted uppercase">{date.toLocaleDateString('en-GB', { weekday: 'short' })}</div>
                    <div className="text-lg font-bold text-text-primary mt-1">{date.getDate()}</div>
                    <div className="text-xs text-text-muted">{date.toLocaleDateString('en-GB', { month: 'short' })}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4">Select Time</h2>
              <p className="text-sm text-text-secondary mb-4">
                {formatDate(selectedDate)} {isToday(selectedDate) && '(Today)'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-subtle hover:border-primary/50 text-text-primary hover:bg-surface-warm'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-card border border-border-subtle text-text-primary font-semibold hover:bg-surface-warm transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-text-primary mb-2">Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Any special requests..."
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-4">Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Business</span>
                  <span className="font-medium text-text-primary">{listing.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Service</span>
                  <span className="font-medium text-text-primary">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date</span>
                  <span className="font-medium text-text-primary">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Time</span>
                  <span className="font-medium text-text-primary">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Duration</span>
                  <span className="font-medium text-text-primary">{selectedService.duration}</span>
                </div>
                <div className="border-t border-border-subtle pt-3 flex justify-between">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="text-xl font-bold text-primary">{selectedService.price}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-card border border-border-subtle text-text-primary font-semibold hover:bg-surface-warm transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="max-w-md mx-auto">
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-8 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-status-confirmed-bg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-status-confirmed-text" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
              <p className="text-text-secondary mb-6">
                Your appointment has been successfully booked.
              </p>
              
              <div className="bg-surface-warm rounded-xl p-4 text-left mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Business</span>
                  <span className="font-medium text-text-primary">{listing.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Service</span>
                  <span className="font-medium text-text-primary">{selectedService.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Date & Time</span>
                  <span className="font-medium text-text-primary">{formatDate(selectedDate)} at {selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Reference</span>
                  <span className="font-mono text-primary">#NN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/account')}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>View My Bookings</span>
                </button>
                <Link
                  to="/"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-card border border-border-subtle text-text-primary font-semibold hover:bg-surface-warm transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
