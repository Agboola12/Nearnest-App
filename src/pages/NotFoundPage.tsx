import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h1>
          <p className="text-text-secondary">
            The listing or page you're looking for doesn't exist or has been removed.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Homepage</span>
          </Link>
          <Link
            to="/search"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-card hover:bg-surface-warm border border-border-subtle text-text-primary font-semibold transition-all"
          >
            <Search className="w-5 h-5" />
            <span>Browse All Listings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
