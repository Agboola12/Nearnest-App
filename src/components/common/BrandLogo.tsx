import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  subtext?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', subtext }) => {
  return (
    <Link to="/" className={`flex items-center gap-2.5 focus:outline-none group ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
        <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="font-sans text-xl font-extrabold tracking-tight text-text-primary group-hover:text-primary transition-colors">
          NearNest
        </span>
        {subtext && (
          <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted">
            {subtext}
          </span>
        )}
      </div>
    </Link>
  );
};
