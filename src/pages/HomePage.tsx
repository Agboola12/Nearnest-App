import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { PopularPlaces } from '../components/home/PopularPlaces';
import { HowItWorks } from '../components/home/HowItWorks';
import { OwnerCTA } from '../components/home/OwnerCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CategoryGrid />
      <PopularPlaces />
      <HowItWorks />
      <OwnerCTA />
    </div>
  );
};
