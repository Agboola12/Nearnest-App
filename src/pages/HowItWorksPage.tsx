import React from 'react';
import { HowItWorksHero } from '../components/how-it-works/HowItWorksHero';
import { UserSteps } from '../components/how-it-works/UserSteps';
import { BenefitsSection } from '../components/how-it-works/BenefitsSection';
import { OwnerSection } from '../components/how-it-works/OwnerSection';
import { FinalCTA } from '../components/how-it-works/FinalCTA';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="w-full bg-surface-base">
      <HowItWorksHero />
      <UserSteps />
      <BenefitsSection />
      <OwnerSection />
      <FinalCTA />
    </div>
  );
};

export default HowItWorksPage;
