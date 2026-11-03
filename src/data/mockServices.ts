import { POPULAR_LISTINGS } from './mockListings';
import { Listing, ServiceCategory } from '../types';

/**
 * Service categories shown on the public /services directory.
 * `id` values match the optional `serviceCategory` field on Listing.
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'hair-grooming',
    title: 'Hair & Grooming',
    description: 'Barbers, stylists, hot towel shaves and beard care.',
    count: '120+ local providers',
    iconName: 'scissors',
    searchTerm: 'barber',
  },
  {
    id: 'home-trades',
    title: 'Home Trades',
    description: 'Plumbers, electricians, heating engineers and repairers.',
    count: '240+ local providers',
    iconName: 'wrench',
    searchTerm: 'plumber',
  },
  {
    id: 'health-wellness',
    title: 'Health & Wellness',
    description: 'Physiotherapy, sports recovery and clinical therapy.',
    count: '85+ local providers',
    iconName: 'heart_pulse',
    searchTerm: 'physiotherapy',
  },
  {
    id: 'beauty-spa',
    title: 'Beauty & Spa',
    description: 'Salons, nails, skincare and relaxing treatments.',
    count: '150+ local providers',
    iconName: 'sparkles',
    searchTerm: 'beauty salon',
  },
  {
    id: 'pet-care',
    title: 'Pet Care',
    description: 'Grooming, walking, sitting and everyday pet help.',
    count: '64+ local providers',
    iconName: 'paw_print',
    searchTerm: 'pet grooming',
  },
  {
    id: 'cleaning-home',
    title: 'Cleaning & Home Help',
    description: 'Regular cleans, deep cleans and household support.',
    count: '92+ local providers',
    iconName: 'home',
    searchTerm: 'home cleaning',
  },
  {
    id: 'tutoring-education',
    title: 'Tutoring & Education',
    description: 'Subject tutors, exam prep and after-school learning.',
    count: '48+ local providers',
    iconName: 'graduation_cap',
    searchTerm: 'tutoring',
  },
  {
    id: 'events-photography',
    title: 'Events & Photography',
    description: 'Photographers, celebrants and event-day specialists.',
    count: '37+ local providers',
    iconName: 'camera',
    searchTerm: 'photographer',
  },
];

/** All bookable / service-category listings from the shared directory data. */
export const SERVICE_PROVIDERS: Listing[] = POPULAR_LISTINGS.filter(
  (listing) => listing.category === 'services' && Boolean(listing.serviceCategory)
);

export const getServiceCategory = (id: string) =>
  SERVICE_CATEGORIES.find((category) => category.id === id);
