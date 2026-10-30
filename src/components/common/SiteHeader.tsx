import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Bell, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const navLinks = [
    { label: 'Explore', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Shops', path: '/shops' },
    { label: 'Churches & Schools', path: '/churches-and-schools' },
    { label: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <BrandLogo />

          <nav className="hidden xl:flex items-center gap-1 bg-surface-warm/80 p-1 rounded-full border border-border-subtle">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-text-primary text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-card'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Center/Right: Quick Search, CTAs & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Search Trigger Input */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <div className="flex items-center gap-2 bg-surface-warm/80 hover:bg-surface-container border border-border-subtle px-3.5 py-2 rounded-full text-text-muted transition-all shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <Search className="w-4 h-4 text-teal-deep shrink-0" />
              <input
                type="text"
                placeholder="Search places or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none w-44 lg:w-56"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-[10px] font-mono text-text-muted shadow-sm">
                ⌘K
              </kbd>
            </div>
          </form>

          {/* Add Place or Business CTA */}
          <Link
            to="/owner/listings/new"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-xs font-semibold transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Place or Business</span>
          </Link>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl text-text-secondary hover:bg-surface-warm hover:text-text-primary transition-colors border border-border-subtle bg-surface-card"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>

          {/* Profile Avatar / Account Link */}
          <Link
            to="/account"
            aria-label="Customer Account"
            className="flex items-center pl-1 sm:pl-2 border-l border-border-subtle focus:outline-none ring-2 ring-transparent hover:ring-primary rounded-full transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-surface-warm border border-border-subtle flex items-center justify-center font-bold text-xs text-text-primary shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Account profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-text-primary hover:bg-surface-warm border border-border-subtle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-card border-b border-border-subtle px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-surface-warm p-2.5 rounded-xl border border-border-subtle mb-3">
            <Search className="w-4 h-4 text-teal-deep shrink-0" />
            <input
              type="text"
              placeholder="Search places or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none w-full"
            />
          </form>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-warm'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-border-subtle">
            <Link
              to="/owner/listings/new"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add a Place or Business</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
