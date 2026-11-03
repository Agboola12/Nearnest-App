import React from 'react';
import {
  ArrowRight,
  Baby,
  Church,
  GraduationCap,
  Landmark,
  School,
  Users,
} from 'lucide-react';
import { InstitutionCategory } from '../../types';

interface InstitutionCategoryGridProps {
  categories: InstitutionCategory[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

const renderIcon = (iconName: InstitutionCategory['iconName']) => {
  const iconClass = 'w-5 h-5';

  switch (iconName) {
    case 'school':
      return <School className={iconClass} />;
    case 'graduation_cap':
      return <GraduationCap className={iconClass} />;
    case 'landmark':
      return <Landmark className={iconClass} />;
    case 'church':
      return <Church className={iconClass} />;
    case 'baby':
      return <Baby className={iconClass} />;
    case 'users':
      return <Users className={iconClass} />;
    default:
      return <School className={iconClass} />;
  }
};

export const InstitutionCategoryGrid: React.FC<InstitutionCategoryGridProps> = ({
  categories,
  activeCategory,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            aria-pressed={isActive}
            className={`group relative flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
              isActive
                ? 'border-primary bg-teal-wash/70 shadow-elevated ring-1 ring-primary/20'
                : 'border-border-subtle bg-surface-card shadow-subtle hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-teal-light/20 bg-teal-wash text-primary group-hover:scale-105'
                }`}
              >
                {renderIcon(category.iconName)}
              </span>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-surface-warm text-primary group-hover:bg-primary group-hover:text-white'
                }`}
              >
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            <h3 className="mt-4 text-base font-bold text-text-primary transition-colors group-hover:text-primary">
              {category.title}
            </h3>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-text-secondary">
              {category.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 border-t border-border-subtle/70 pt-3 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-primary' : 'bg-teal-light'}`} />
              {category.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
