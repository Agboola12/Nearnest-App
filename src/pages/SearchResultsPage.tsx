import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ChevronDown, Grid, List, Star, CheckCircle, Calendar, ArrowRight, Clock, School, X } from 'lucide-react';
import { POPULAR_LISTINGS } from '../data/mockListings';
import { Listing } from '../types';

const FILTERS = {
  category: [
    { id: 'all', label: 'All Categories' },
    { id: 'services', label: 'Services & Trades' },
    { id: 'shops', label: 'Shops & Retail' },
    { id: 'churches', label: 'Churches & Faith Halls' },
    { id: 'schools', label: 'Schools & Nurseries' },
  ],
  priceRange: [
    { id: 'any', label: 'Any Price' },
    { id: 'free', label: 'Free' },
    { id: 'paid', label: 'Paid' },
  ],
  availability: [
    { id: 'any', label: 'Any Availability' },
    { id: 'bookable', label: 'Bookable Online' },
    { id: 'openNow', label: 'Open Now' },
  ],
};

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('loc') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePrice, setActivePrice] = useState('any');
  const [activeAvailability, setActiveAvailability] = useState('any');

  const results = useMemo(() => {
    let filtered = [...POPULAR_LISTINGS];
    
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }
    
    if (activeAvailability === 'bookable') {
      filtered = filtered.filter((item) => item.isBookable);
    }
    if (activeAvailability === 'openNow') {
      filtered = filtered.filter((item) => item.isOpenNow);
    }
    
    return filtered;
  }, [query, activeCategory, activeAvailability]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    const loc = formData.get('loc') as string;
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (loc.trim()) params.set('loc', loc.trim());
    setSearchParams(params);
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setActivePrice('any');
    setActiveAvailability('any');
  };

  const getActionLink = (listing: Listing) => {
    if (listing.isBookable) {
      return `/booking/${listing.slug}`;
    }
    return `/listing/${listing.slug}`;
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Search Header */}
      <section className="bg-surface-card border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 bg-surface-warm/60 rounded-2xl p-2 border border-border-subtle">
            <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl">
              <Search className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              <input
                name="q"
                type="text"
                defaultValue={query}
                placeholder="Search places or services..."
                className="bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none w-full"
              />
            </div>
            <div className="hidden lg:block w-px h-8 bg-border-subtle" />
            <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl">
              <MapPin className="w-5 h-5 text-text-muted mr-3 shrink-0" />
              <input
                name="loc"
                type="text"
                defaultValue={location}
                placeholder="Location or postcode..."
                className="bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none w-full"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-text-secondary font-medium">Active filters:</span>
            {query && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                {query}
                <button onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('q');
                  setSearchParams(params);
                }}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                {location}
                <button onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete('loc');
                  setSearchParams(params);
                }}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(activeCategory !== 'all' || activePrice !== 'any' || activeAvailability !== 'any') && (
              <button onClick={clearFilters} className="text-xs text-primary hover:text-teal-deep font-semibold">
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}>
            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </h2>
                <button onClick={clearFilters} className="text-xs text-primary hover:text-teal-deep font-semibold">
                  Clear
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Category</h3>
                <div className="space-y-2">
                  {FILTERS.category.map((filter) => (
                    <label key={filter.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === filter.id}
                        onChange={() => setActiveCategory(filter.id)}
                        className="w-4 h-4 text-primary border-border-subtle focus:ring-primary"
                      />
                      <span className={`text-sm ${activeCategory === filter.id ? 'text-primary font-semibold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {filter.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border-subtle pt-6 mb-6">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Price Range</h3>
                <div className="space-y-2">
                  {FILTERS.priceRange.map((filter) => (
                    <label key={filter.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={activePrice === filter.id}
                        onChange={() => setActivePrice(filter.id)}
                        className="w-4 h-4 text-primary border-border-subtle focus:ring-primary"
                      />
                      <span className={`text-sm ${activePrice === filter.id ? 'text-primary font-semibold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {filter.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border-subtle pt-6">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Availability</h3>
                <div className="space-y-2">
                  {FILTERS.availability.map((filter) => (
                    <label key={filter.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="availability"
                        checked={activeAvailability === filter.id}
                        onChange={() => setActiveAvailability(filter.id)}
                        className="w-4 h-4 text-primary border-border-subtle focus:ring-primary"
                      />
                      <span className={`text-sm ${activeAvailability === filter.id ? 'text-primary font-semibold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {filter.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </h1>
                {(query || location) && (
                  <p className="text-sm text-text-secondary mt-1">
                    {query && `for "${query}"`}{query && location && ' in '}{location && location}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-sm font-semibold text-text-secondary hover:bg-surface-warm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <div className="flex items-center gap-1 bg-surface-card p-1 rounded-xl border border-border-subtle">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-surface-warm text-primary' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-surface-warm text-primary' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-border-subtle text-sm font-semibold text-text-secondary hover:bg-surface-warm">
                  Sort by: Relevance
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-warm flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-text-muted" />
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-2">No results found</h2>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button onClick={clearFilters} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold text-sm transition-all">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {results.map((listing) => (
                  <article
                    key={listing.id}
                    className={`flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'} bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-border-subtle hover:border-primary/40`}
                  >
                    <div className={viewMode === 'list' ? 'sm:w-72 sm:h-auto h-48' : 'h-48 w-full'}>
                      <img
                        src={listing.coverImage}
                        alt={listing.coverAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-5">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-1 rounded-full bg-surface-warm text-text-primary text-xs font-semibold">
                            {listing.categoryLabel}
                          </span>
                          {listing.isVerified && listing.verificationBadgeText && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              {listing.verificationBadgeText}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                          {listing.name}
                        </h3>
                        <p className="text-sm text-text-muted mb-3">{listing.address.street}, {listing.address.city}</p>
                        
                        <div className="flex items-center gap-4 text-xs mb-3">
                          {listing.rating ? (
                            <div className="flex items-center gap-1 text-amber-600 font-semibold">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>{listing.rating.toFixed(1)}</span>
                              <span className="text-text-muted font-normal">({listing.reviewCount})</span>
                            </div>
                          ) : (
                            <span className="text-xs font-semibold text-text-secondary">New to directory</span>
                          )}
                          <span className="text-text-muted">{listing.distance}</span>
                        </div>
                        
                        <div className="space-y-1">
                          {listing.isBookable && listing.bookingStatusText ? (
                            <div className="flex items-center gap-1.5 text-status-confirmed-text text-xs font-semibold">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              <span>{listing.bookingStatusText}</span>
                            </div>
                          ) : listing.openingHoursText ? (
                            <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                              <Clock className="w-3.5 h-3.5 text-teal-deep shrink-0" />
                              <span>{listing.openingHoursText}</span>
                            </div>
                          ) : listing.bookingStatusText ? (
                            <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                              {listing.category === 'churches' ? (
                                <Calendar className="w-3.5 h-3.5 text-tertiary shrink-0" />
                              ) : (
                                <School className="w-3.5 h-3.5 text-teal-deep shrink-0" />
                              )}
                              <span>{listing.bookingStatusText}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border-subtle/60">
                        <Link
                          to={getActionLink(listing)}
                          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
                            listing.isBookable
                              ? 'bg-primary hover:bg-teal-deep text-white'
                              : 'bg-surface-warm hover:bg-surface-container border border-border-subtle text-text-primary'
                          }`}
                        >
                          {listing.isBookable ? (
                            <>
                              <Calendar className="w-4 h-4" />
                              <span>{listing.actionText}</span>
                            </>
                          ) : (
                            <>
                              <span>{listing.actionText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
