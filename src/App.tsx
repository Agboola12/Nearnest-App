import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ListingProfilePage } from './pages/ListingProfilePage';
import { BookingPage } from './pages/BookingPage';
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { OwnerDashboardPage } from './pages/OwnerDashboardPage';
import { ServicesDirectoryPage } from './pages/ServicesDirectoryPage';
import { ChurchesSchoolsPage } from './pages/ChurchesSchoolsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { ListingWizardPage } from './pages/ListingWizardPage';
import { OwnerLayout } from './layouts/OwnerLayout';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboardPage />} />
          <Route path="listings/new" element={<ListingWizardPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="services" element={<ServicesDirectoryPage />} />
          <Route
            path="shops"
            element={
              <PlaceholderPage
                title="Shops & Retail Directory"
                description="Independent retailers, florists, bakeries, and neighbourhood stores."
                phase="Phase 2: Discovery Directory"
              />
            }
          />
          <Route path="churches-and-schools" element={<ChurchesSchoolsPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="listing/:slug" element={<ListingProfilePage />} />
          <Route path="booking/:slug" element={<BookingPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Page Not Found"
                description="The requested directory page or route does not exist."
                phase="404"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
