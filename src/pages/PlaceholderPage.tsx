import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Layers } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  phase?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  phase = 'Next Implementation Phase',
}) => {
  const location = useLocation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="bg-surface-card rounded-2xl border border-border-subtle p-8 sm:p-12 shadow-sm text-center">
        <div className="w-12 h-12 rounded-xl bg-teal-wash border border-teal-light/20 flex items-center justify-center text-primary mx-auto mb-4">
          <Layers className="w-6 h-6" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-warm text-text-secondary text-xs font-semibold border border-border-subtle mb-4">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>{phase}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto mb-8 leading-relaxed">
          {description}
        </p>

        <div className="bg-surface-warm/60 rounded-xl p-4 border border-border-subtle/80 max-w-md mx-auto text-left mb-8 text-xs font-mono text-text-muted space-y-1">
          <div><span className="text-text-secondary font-semibold">Active Route:</span> {location.pathname}{location.search}</div>
          <div><span className="text-text-secondary font-semibold">Design Target:</span> NearNest Stitch Project (`12286985518135194843`)</div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
