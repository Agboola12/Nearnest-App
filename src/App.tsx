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
import { PlaceholderPage } from './pages/PlaceholderPage';
import { OwnerLayout } from './layouts/OwnerLayout';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboardPage />} />
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
          <Route
            path="churches-and-schools"
            element={
              <PlaceholderPage
                title="Churches & Schools Directory"
                description="Parish schedules, civic halls, nurseries, and accredited community schools."
                phase="Phase 2: Discovery Directory"
              />
            }
          />
          <Route
            path="how-it-works"
            element={
              <PlaceholderPage
                title="How NearNest Works"
                description="Civic registry standards, verified badges, and provider guidelines."
                phase="Phase 2: Civic Standards"
              />
            }
          />
          <Route path="listing/:slug" element={<ListingProfilePage />} />
          <Route path="booking/:slug" element={<BookingPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route
            path="owner/listings/new"
            element={
              <PlaceholderPage
                title="Listing Creation Wizard"
                description="8-step onboarding wizard for place owners and administrators."
                phase="Phase 6: Provider Suite"
              />
            }
          />
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
