import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationSet, setLocationSet] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (location.trim()) params.set('loc', location.trim());
    navigate(`/search?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  const handleRequestLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('Richmond, London (TW9)');
          setLocationSet(true);
          setIsLocating(false);
        },
        () => {
          // Fallback gracefully on permission denial or environment without location
          setLocation('Richmond, London');
          setLocationSet(true);
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setLocation('Richmond, London');
      setLocationSet(true);
      setIsLocating(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-surface-base px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-border-subtle">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-teal-wash via-surface-warm to-transparent rounded-full blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-40 right-10 w-72 h-72 bg-tertiary-fixed/30 rounded-full blur-2xl" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Civic status badge */}
        <div className="inline-flex items-center gap-2 bg-surface-card border border-border-subtle px-3.5 py-1.5 rounded-full shadow-sm mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-light opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
            Civic-Verified Local Registry
          </span>
          <span className="w-1 h-1 rounded-full bg-border-subtle mx-1" />
          <span className="text-xs font-medium text-text-muted">Updated real-time</span>
        </div>

        {/* Hero title & description */}
        <h1 className="font-sans text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-text-primary max-w-4xl tracking-tight leading-[1.15] mb-4">
          Find the Places and Services Around You.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mb-10 leading-relaxed">
          Discover verified local shops, skilled trades, hair stylists, community churches, and neighbourhood schools with dependable schedules and instant booking.
        </p>

        {/* Master Search Pill Container */}
        <div className="w-full max-w-4xl bg-surface-card rounded-2xl p-2.5 shadow-xl border border-border-subtle transition-all duration-300">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
            {/* Input 1: Keyword */}
            <div className="flex-1 flex items-center px-4 py-3 rounded-xl bg-surface-warm/60 hover:bg-surface-warm transition-colors border border-border-subtle/60 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <Search className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full min-w-0">
                <label htmlFor="search-query" className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  What are you looking for?
                </label>
                <input
                  id="search-query"
                  type="text"
                  placeholder="Haircut, plumbing, organic bakery..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none w-full truncate"
                />
              </div>
            </div>

            <div className="hidden lg:block w-px h-10 bg-border-subtle my-auto" />

            {/* Input 2: Location */}
            <div className="flex-1 flex items-center px-4 py-3 rounded-xl bg-surface-warm/60 hover:bg-surface-warm transition-colors border border-border-subtle/60 relative focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <MapPin className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full min-w-0 pr-2">
                <label htmlFor="search-location" className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  Enter a location
                </label>
                <input
                  id="search-location"
                  type="text"
                  placeholder="e.g. Richmond, London or TW9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none w-full truncate"
                />
              </div>
              <button
                id="geo-btn"
                type="button"
                onClick={handleRequestLocation}
                title="Only used in-browser to sort nearby results"
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm shrink-0 active:scale-95 transition-all ${
                  locationSet
                    ? 'bg-status-confirmed-bg text-status-confirmed-text border-status-confirmed-text/30'
                    : 'bg-surface-card hover:bg-surface-container border-border-subtle text-text-secondary hover:text-primary'
                }`}
              >
                <Navigation className={`w-3.5 h-3.5 text-teal-deep ${isLocating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline whitespace-nowrap">
                  {isLocating ? 'Locating...' : locationSet ? 'Located' : 'Near me'}
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Search</span>
            </button>
          </form>

          {/* Popular Tag Filters */}
          <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 pt-3 px-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" /> Popular now:
            </span>
            {['Barbershop', 'Emergency Plumber', 'Community Food Bank', 'Montessori Nurseries'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="text-xs text-text-secondary hover:text-primary hover:border-primary/40 bg-surface-warm px-3 py-1 rounded-full border border-border-subtle transition-all active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
