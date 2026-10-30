import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Store, Church, GraduationCap, ArrowRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/mockListings';

export const CategoryGrid: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'content_cut':
        return <Scissors className="w-7 h-7" />;
      case 'storefront':
        return <Store className="w-7 h-7" />;
      case 'church':
        return <Church className="w-7 h-7" />;
      case 'school':
        return <GraduationCap className="w-7 h-7" />;
      default:
        return <Store className="w-7 h-7" />;
    }
  };

  const getCategoryPath = (id: string) => {
    switch (id) {
      case 'services':
        return '/services';
      case 'shops':
        return '/shops';
      case 'churches':
      case 'schools':
        return '/churches-and-schools';
      default:
        return '/search';
    }
  };

  return (
    <section className="w-full bg-surface-card py-16 px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-wash text-teal-deep text-xs uppercase tracking-wider font-bold mb-2">
              <Layers className="w-4 h-4" />
              <span>Structured Civic Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Explore By Purpose
            </h2>
          </div>
          <p className="text-sm text-text-secondary max-w-md">
            Curated classifications tailored to bookable appointments, everyday shopping, faith schedules, and registered schooling.
          </p>
        </div>

        {/* 4 Distinct Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={getCategoryPath(cat.id)}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-wash border border-teal-light/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  {cat.badgeStyle === 'confirmed' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed-text animate-pulse" />
                      {cat.badge}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-warm text-text-secondary text-xs font-semibold border border-border-subtle">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/60 flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">
                  {cat.count}
                </span>
                <div className="w-7 h-7 rounded-full bg-surface-warm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
