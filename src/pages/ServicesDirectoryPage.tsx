import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { ServiceCategoryGrid } from '../components/services/ServiceCategoryGrid';
import { ServiceProviderCard } from '../components/services/ServiceProviderCard';
import { getServiceCategory, SERVICE_CATEGORIES, SERVICE_PROVIDERS } from '../data/mockServices';

type SortOption = 'recommended' | 'rating' | 'price';

const POPULAR_SEARCHES = [
  'Barber',
  'Emergency plumber',
  'Physiotherapy',
  'Dog grooming',
  'Home cleaning',
];

const priceValue = (price?: string) => {
  if (!price) return Number.POSITIVE_INFINITY;
  const parsed = Number(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
};

export const ServicesDirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('loc') || '';
  const rawCategory = searchParams.get('category') || 'all';
  const activeCategory = getServiceCategory(rawCategory) ? rawCategory : 'all';

  const [queryInput, setQueryInput] = useState(query);
  const [locationInput, setLocationInput] = useState(location);
  const [onlyBookable, setOnlyBookable] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const providersRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  useEffect(() => {
    setLocationInput(location);
  }, [location]);

  const updateParams = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const scrollToProviders = () => {
    window.requestAnimationFrame(() => {
      providersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({
      q: queryInput.trim() || null,
      loc: locationInput.trim() || null,
    });
    scrollToProviders();
  };

  const handleCategorySelect = (categoryId: string) => {
    updateParams({ category: categoryId === activeCategory ? null : categoryId });
    scrollToProviders();
  };

  const handleNearMe = () => {
    setLocationInput('Richmond, London');
    updateParams({ loc: 'Richmond, London' });
  };

  const handlePopularSearch = (term: string) => {
    setQueryInput(term);
    updateParams({ q: term });
    scrollToProviders();
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setQueryInput('');
    setLocationInput('');
    setOnlyBookable(false);
    setSortOption('recommended');
  };

  const results = useMemo(() => {
    let filtered = [...SERVICE_PROVIDERS];

    if (activeCategory !== 'all') {
      filtered = filtered.filter((provider) => provider.serviceCategory === activeCategory);
    }

    if (query) {
      const words = query.toLowerCase().split(/\s+/).filter(Boolean);
      filtered = filtered.filter((provider) => {
        const category = getServiceCategory(provider.serviceCategory || '');
        const haystack = [
          provider.name,
          provider.categoryLabel,
          category?.title || '',
          category?.searchTerm || '',
          provider.address.street,
          provider.address.city,
          provider.address.postalCode,
          provider.bookingStatusText || '',
          provider.secondaryNote || '',
          provider.openingHoursText || '',
          provider.coverAlt,
        ]
          .join(' ')
          .toLowerCase();

        return words.every((word) => haystack.includes(word));
      });
    }

    if (location) {
      const ignoredRegionWords = new Set(['london', 'uk', 'england', 'greater']);
      const locationWords = location
        .toLowerCase()
        .split(/[,\s]+/)
        .filter((word) => word && !ignoredRegionWords.has(word));

      if (locationWords.length > 0) {
        filtered = filtered.filter((provider) => {
          const haystack =
            `${provider.address.street} ${provider.address.city} ${provider.address.postalCode}`.toLowerCase();
          return locationWords.every((word) => haystack.includes(word));
        });
      }
    }

    if (onlyBookable) {
      filtered = filtered.filter((provider) => provider.isBookable);
    }

    if (sortOption === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (sortOption === 'price') {
      filtered.sort((a, b) => priceValue(a.startingPrice) - priceValue(b.startingPrice));
    }

    return filtered;
  }, [activeCategory, query, location, onlyBookable, sortOption]);

  const categoryTitle =
    activeCategory === 'all' ? 'All services' : getServiceCategory(activeCategory)?.title;

  const hasActiveFilters = Boolean(query || location || activeCategory !== 'all' || onlyBookable);

  return (
    <div className="w-full bg-surface-base">
      {/* Hero & search */}
      <section className="relative overflow-hidden border-b border-border-subtle bg-surface-base px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-wash via-surface-warm to-transparent opacity-80 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-tertiary-fixed/30 blur-2xl" />

        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-text-muted">
            <Link to="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-text-primary">Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3.5 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">
                Services &amp; Trades Directory
              </span>
              <span className="h-1 w-1 rounded-full bg-border-subtle" />
              <span className="text-[11px] font-medium text-text-muted">Richmond, London</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-[2.85rem]">
              Local services, ready when you need them.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Discover trusted barbers, tradespeople, wellness practitioners and home-help
              professionals near you. Search by service or location and explore verified local
              providers — no account required.
            </p>
          </div>

          <div className="mt-8 max-w-4xl rounded-2xl border border-border-subtle bg-surface-card p-2.5 shadow-elevated">
            <form onSubmit={handleSearch} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center rounded-xl border border-border-subtle/60 bg-surface-warm/60 px-4 py-3 transition-colors hover:bg-surface-warm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="mr-3 h-5 w-5 shrink-0 text-text-muted" />
                <div className="flex w-full min-w-0 flex-col text-left">
                  <label
                    htmlFor="services-query"
                    className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    What do you need?
                  </label>
                  <input
                    id="services-query"
                    type="text"
                    value={queryInput}
                    onChange={(event) => setQueryInput(event.target.value)}
                    placeholder="Plumber, haircut, physio, dog groomer..."
                    className="w-full truncate bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </div>
              </div>

              <div className="hidden h-10 w-px bg-border-subtle lg:block" />

              <div className="flex flex-1 items-center rounded-xl border border-border-subtle/60 bg-surface-warm/60 px-4 py-3 transition-colors hover:bg-surface-warm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <MapPin className="mr-3 h-5 w-5 shrink-0 text-text-muted" />
                <div className="flex w-full min-w-0 flex-col text-left">
                  <label
                    htmlFor="services-location"
                    className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    Where?
                  </label>
                  <input
                    id="services-location"
                    type="text"
                    value={locationInput}
                    onChange={(event) => setLocationInput(event.target.value)}
                    placeholder="e.g. Richmond, London or TW9"
                    className="w-full truncate bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNearMe}
                  title="Use my approximate local area"
                  className="ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-card px-2.5 py-1.5 text-[11px] font-semibold text-text-secondary shadow-sm transition-all hover:text-primary active:scale-95"
                >
                  <Navigation className="h-3.5 w-3.5 text-teal-deep" />
                  <span className="hidden sm:inline">Near me</span>
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-deep hover:shadow-lg active:scale-95 sm:text-base"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Search services</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 px-3 pt-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                <Sparkles className="h-3 w-3 text-primary" /> Popular now:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularSearch(term)}
                  className="rounded-full border border-border-subtle bg-surface-warm px-3 py-1 text-xs text-text-secondary transition-all hover:border-primary/40 hover:text-primary active:scale-95"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Civic-verified providers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              Instant booking where offered
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              No account needed to browse
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full border-b border-border-subtle bg-surface-card px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-teal-wash px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-deep">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Browse by service
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                What do you need a hand with?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-text-secondary">
                Pick a category to filter the providers below, or search for something specific.
              </p>
            </div>

            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => updateParams({ category: null })}
                className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-primary transition-colors hover:text-teal-deep sm:self-auto"
              >
                <X className="h-3.5 w-3.5" />
                Clear category
              </button>
            )}
          </div>

          <ServiceCategoryGrid
            categories={SERVICE_CATEGORIES}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Providers */}
      <section
        ref={providersRef}
        className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-deep" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Recommended local providers
                </span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                {activeCategory === 'all' ? 'Popular services near you' : `${categoryTitle} providers`}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                {results.length} {results.length === 1 ? 'provider' : 'providers'}
                {location ? ` matching “${location}”` : ' in and around Richmond, London'}
                {query ? ` for “${query}”` : ''}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyBookable((value) => !value)}
                aria-pressed={onlyBookable}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                  onlyBookable
                    ? 'border-primary bg-teal-wash text-teal-deep'
                    : 'border-border-subtle bg-surface-card text-text-secondary hover:bg-surface-warm'
                }`}
              >
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
                    onlyBookable ? 'border-primary bg-primary text-white' : 'border-border-subtle bg-white'
                  }`}
                >
                  {onlyBookable && (
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
                      <path
                        d="M1 5.2 3.6 8 9 2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                Bookable online
              </button>

              <label className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-card px-3 py-2.5 text-xs font-semibold text-text-secondary">
                <span className="sr-only">Sort providers</span>
                <span className="hidden text-text-muted sm:inline">Sort</span>
                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value as SortOption)}
                  className="cursor-pointer bg-transparent text-xs font-semibold text-text-primary focus:outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Top rated</option>
                  <option value="price">Price: low to high</option>
                </select>
              </label>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-text-secondary">Active filters:</span>

              {query && (
                <button
                  type="button"
                  onClick={() => updateParams({ q: null })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-teal-deep"
                >
                  {query}
                  <X className="h-3 w-3" />
                </button>
              )}

              {location && (
                <button
                  type="button"
                  onClick={() => updateParams({ loc: null })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-teal-deep"
                >
                  {location}
                  <X className="h-3 w-3" />
                </button>
              )}

              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => updateParams({ category: null })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-card px-3 py-1 text-xs font-semibold text-text-primary ring-1 ring-border-subtle transition-colors hover:bg-surface-warm"
                >
                  {categoryTitle}
                  <X className="h-3 w-3" />
                </button>
              )}

              {onlyBookable && (
                <button
                  type="button"
                  onClick={() => setOnlyBookable(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-card px-3 py-1 text-xs font-semibold text-text-primary ring-1 ring-border-subtle transition-colors hover:bg-surface-warm"
                >
                  Bookable online
                  <X className="h-3 w-3" />
                </button>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-primary transition-colors hover:text-teal-deep"
              >
                Clear all
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-card p-10 text-center shadow-sm sm:p-14">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-warm">
                <Search className="h-8 w-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">No matching service providers</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
                We couldn&apos;t find a provider{location ? ` around “${location}”` : ''}
                {query ? ` for “${query}”` : ''}. Try a broader search, a different location, or
                browse every local service.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-deep active:scale-95"
                >
                  Clear search &amp; filters
                </button>
                <Link
                  to="/search?q=services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-warm px-6 py-2.5 text-sm font-semibold text-text-primary transition-all hover:bg-surface-container"
                >
                  Browse all nearby places
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((provider) => (
                <ServiceProviderCard key={provider.id} listing={provider} />
              ))}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-warm/60 px-5 py-4 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-text-secondary">
                Looking for something else? Search the full civic directory.
              </p>
              <Link
                to="/search?q=services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-teal-deep"
              >
                See all nearby places
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Provider CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-text-primary px-6 py-9 text-white shadow-elevated sm:px-10 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-light">
                For local providers
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Run a service business in the neighbourhood?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Add your business to NearNest for free, publish your services and let neighbours
                book with confidence.
              </p>
            </div>
            <Link
              to="/owner/listings/new"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-light hover:text-text-primary active:scale-95"
            >
              Add your business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesDirectoryPage;
