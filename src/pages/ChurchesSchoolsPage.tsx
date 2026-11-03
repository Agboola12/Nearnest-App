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
import { InstitutionCategoryGrid } from '../components/institutions/InstitutionCategoryGrid';
import { InstitutionCard } from '../components/institutions/InstitutionCard';
import {
  getInstitutionCategory,
  INSTITUTION_CATEGORIES,
  INSTITUTIONS,
} from '../data/mockInstitutions';

type SortOption = 'recommended' | 'rating' | 'name';

const POPULAR_SEARCHES = [
  'Primary school',
  'Secondary school',
  'University',
  'Church',
  'Nursery',
  'Community hall',
];

const IGNORED_REGION_WORDS = new Set(['london', 'uk', 'england', 'greater']);

export const ChurchesSchoolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('loc') || '';
  const rawCategory = searchParams.get('category') || 'all';
  const activeCategory = getInstitutionCategory(rawCategory) ? rawCategory : 'all';

  const [queryInput, setQueryInput] = useState(query);
  const [locationInput, setLocationInput] = useState(location);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const resultsRef = useRef<HTMLElement>(null);

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

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({
      q: queryInput.trim() || null,
      loc: locationInput.trim() || null,
    });
    scrollToResults();
  };

  const handleCategorySelect = (categoryId: string) => {
    updateParams({ category: categoryId === activeCategory ? null : categoryId });
    scrollToResults();
  };

  const handleNearMe = () => {
    setLocationInput('Richmond, London');
    updateParams({ loc: 'Richmond, London' });
  };

  const handlePopularSearch = (term: string) => {
    setQueryInput(term);
    updateParams({ q: term });
    scrollToResults();
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setQueryInput('');
    setLocationInput('');
    setSortOption('recommended');
  };

  const results = useMemo(() => {
    let filtered = [...INSTITUTIONS];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        (institution) => institution.institutionType === activeCategory
      );
    }

    if (query) {
      const words = query.toLowerCase().split(/\s+/).filter(Boolean);
      filtered = filtered.filter((institution) => {
        const category = getInstitutionCategory(institution.institutionType);
        const haystack = [
          institution.name,
          institution.categoryLabel,
          category?.title || '',
          category?.searchTerm || '',
          institution.address.street,
          institution.address.city,
          institution.address.postalCode,
          institution.description,
          institution.bookingStatusText || '',
          institution.secondaryNote || '',
        ]
          .join(' ')
          .toLowerCase();

        return words.every((word) => haystack.includes(word));
      });
    }

    if (location) {
      const locationWords = location
        .toLowerCase()
        .split(/[,\s]+/)
        .filter((word) => word && !IGNORED_REGION_WORDS.has(word));

      if (locationWords.length > 0) {
        filtered = filtered.filter((institution) => {
          const haystack =
            `${institution.address.street} ${institution.address.city} ${institution.address.postalCode}`.toLowerCase();
          return locationWords.every((word) => haystack.includes(word));
        });
      }
    }

    if (sortOption === 'rating') {
      filtered.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
    }

    if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [activeCategory, query, location, sortOption]);

  const categoryTitle =
    activeCategory === 'all'
      ? 'Churches, schools & community places'
      : getInstitutionCategory(activeCategory)?.title;

  const hasActiveFilters = Boolean(query || location || activeCategory !== 'all');

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
            <span className="font-semibold text-text-primary">Churches &amp; Schools</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3.5 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">
                Churches &amp; Schools Directory
              </span>
              <span className="h-1 w-1 rounded-full bg-border-subtle" />
              <span className="text-[11px] font-medium text-text-muted">Richmond, London</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-[2.85rem]">
              Faith, learning and community, close to home.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Explore local churches, primary and secondary schools, colleges, nurseries and
              community halls. Search by institution or location and view worship times,
              admissions and venue details — no account required.
            </p>
          </div>

          <div className="mt-8 max-w-4xl rounded-2xl border border-border-subtle bg-surface-card p-2.5 shadow-elevated">
            <form
              onSubmit={handleSearch}
              className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center"
            >
              <div className="flex flex-1 items-center rounded-xl border border-border-subtle/60 bg-surface-warm/60 px-4 py-3 transition-colors hover:bg-surface-warm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="mr-3 h-5 w-5 shrink-0 text-text-muted" />
                <div className="flex w-full min-w-0 flex-col text-left">
                  <label
                    htmlFor="institution-query"
                    className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    Institution name
                  </label>
                  <input
                    id="institution-query"
                    type="text"
                    value={queryInput}
                    onChange={(event) => setQueryInput(event.target.value)}
                    placeholder="Primary school, college, church or hall..."
                    className="w-full truncate bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                  />
                </div>
              </div>

              <div className="hidden h-10 w-px bg-border-subtle lg:block" />

              <div className="flex flex-1 items-center rounded-xl border border-border-subtle/60 bg-surface-warm/60 px-4 py-3 transition-colors hover:bg-surface-warm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <MapPin className="mr-3 h-5 w-5 shrink-0 text-text-muted" />
                <div className="flex w-full min-w-0 flex-col text-left">
                  <label
                    htmlFor="institution-location"
                    className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                  >
                    Where?
                  </label>
                  <input
                    id="institution-location"
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
                <span>Search directory</span>
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
              Civic-verified institutions
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              Admissions, services &amp; venue info
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
                Browse by institution
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Find the right school, church or hall.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-text-secondary">
                Pick a category to filter the institutions below, or search for a specific name or
                neighbourhood.
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

          <InstitutionCategoryGrid
            categories={INSTITUTION_CATEGORIES}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-deep" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Recommended local institutions
                </span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                {activeCategory === 'all'
                  ? 'Churches, schools & community places nearby'
                  : `${categoryTitle} nearby`}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                {results.length} {results.length === 1 ? 'institution' : 'institutions'}
                {location ? ` matching “${location}”` : ' in and around Richmond, London'}
                {query ? ` for “${query}”` : ''}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-card px-3 py-2.5 text-xs font-semibold text-text-secondary">
                <span className="sr-only">Sort institutions</span>
                <span className="hidden text-text-muted sm:inline">Sort</span>
                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value as SortOption)}
                  className="cursor-pointer bg-transparent text-xs font-semibold text-text-primary focus:outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Top rated</option>
                  <option value="name">Name A–Z</option>
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
              <h3 className="text-xl font-bold text-text-primary">No matching institutions</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
                We couldn&apos;t find a school, church or hall
                {location ? ` around “${location}”` : ''}
                {query ? ` for “${query}”` : ''}. Try a broader search, a different location, or
                browse every nearby place.
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
                  to="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-warm px-6 py-2.5 text-sm font-semibold text-text-primary transition-all hover:bg-surface-container"
                >
                  Browse all nearby places
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((institution) => (
                <InstitutionCard key={institution.id} institution={institution} />
              ))}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-warm/60 px-5 py-4 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-text-secondary">
                Looking for a service or shop instead? Search the full civic directory.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-teal-deep"
              >
                See all nearby places
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Institution CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-text-primary px-6 py-9 text-white shadow-elevated sm:px-10 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-light">
                For schools, churches &amp; venues
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Is your institution missing from the directory?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Add a free listing to share admissions, service times, open days and hall hire
                details with your neighbourhood.
              </p>
            </div>
            <Link
              to="/owner/listings/new"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-light hover:text-text-primary active:scale-95"
            >
              Add your institution
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChurchesSchoolsPage;
