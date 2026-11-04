import { ListingOpeningDay, ListingWizardImages } from '../types';

export const BUSINESS_CATEGORIES = [
  'Barber & Grooming',
  'Beauty & Wellness',
  'Home Services',
  'Retail Shop',
  'Café & Food',
  'Health Clinic',
  'Training & Workshops',
  'Community Space',
] as const;

export const COUNTRIES = [
  'United Kingdom',
  'Ireland',
  'France',
  'Netherlands',
  'Germany',
  'Spain',
  'Italy',
  'United States',
  'Canada',
  'Australia',
  'Other',
] as const;

export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_GALLERY_IMAGES = 6;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const createDefaultHours = (): ListingOpeningDay[] =>
  WEEK_DAYS.map((day, index) => ({
    day,
    isClosed: index > 4,
    open: '09:00',
    close: '17:00',
  }));

export const createEmptyImages = (): ListingWizardImages => ({
  logo: null,
  cover: null,
  gallery: [],
});

export const SAMPLE_IMAGES: ListingWizardImages = {
  logo: {
    id: 'sample-logo',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=320&q=80',
    name: 'heritage-barber-logo.jpg',
  },
  cover: {
    id: 'sample-cover',
    src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    name: 'heritage-studio-cover.jpg',
  },
  gallery: [
    {
      id: 'sample-gallery-1',
      src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
      name: 'barber-workspace.jpg',
    },
    {
      id: 'sample-gallery-2',
      src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
      name: 'barber-chair-detail.jpg',
    },
  ],
};
