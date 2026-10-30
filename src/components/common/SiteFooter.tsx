import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Globe } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-warm border-t border-border-subtle mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo subtext="CIVIC DISCOVERY & SCHEDULE" />
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              The verified local discovery directory and appointment booking platform. Designed for neighborhood reliability, verified locations, and zero artificial reviews.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-text-muted bg-surface-card px-3 py-2 rounded-xl border border-border-subtle inline-flex shadow-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Civic-Verified Registry Standard</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Directory
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/services" className="hover:text-primary transition-colors">Services & Trades</Link></li>
              <li><Link to="/shops" className="hover:text-primary transition-colors">Shops & Retail</Link></li>
              <li><Link to="/churches-and-schools" className="hover:text-primary transition-colors">Churches & Faith Halls</Link></li>
              <li><Link to="/churches-and-schools" className="hover:text-primary transition-colors">Schools & Nurseries</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">Explore All Places</Link></li>
            </ul>
          </div>

          {/* Provider Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              For Providers
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/owner/listings/new" className="hover:text-primary transition-colors">Add Place or Business</Link></li>
              <li><Link to="/owner" className="hover:text-primary transition-colors">Owner Dashboard</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">Provider Standards</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">Calendar & Booking Setup</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">Verification Process</Link></li>
            </ul>
          </div>

          {/* Civic Trust & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Civic Trust
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">Trust Guarantee</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">No Fabricated Ratings</Link></li>
              <li><span className="text-text-muted cursor-default">Privacy & Terms</span></li>
              <li><span className="text-text-muted cursor-default">Community Guidelines</span></li>
              <li><span className="text-text-muted cursor-default">Report Incorrect Info</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 NearNest Ltd. All rights reserved. A verified local discovery and civic appointment directory.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Globe className="w-3.5 h-3.5 text-text-muted" />
              <span>English (UK)</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Richmond, London</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
