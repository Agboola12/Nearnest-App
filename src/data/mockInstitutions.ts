import { POPULAR_LISTINGS } from './mockListings';
import { Institution, InstitutionCategory } from '../types';

/**
 * Category tiles shown on the public /churches-and-schools directory.
 * `id` values match the optional `institutionType` field on Listing.
 */
export const INSTITUTION_CATEGORIES: InstitutionCategory[] = [
  {
    id: 'primary',
    title: 'Primary Schools',
    description: 'State, faith and independent primary schools and prep schools.',
    count: '42 nearby',
    iconName: 'school',
    searchTerm: 'primary school prep',
  },
  {
    id: 'secondary',
    title: 'Secondary Schools',
    description: 'Comprehensive, grammar and independent secondary schools.',
    count: '28 nearby',
    iconName: 'graduation_cap',
    searchTerm: 'secondary school academy',
  },
  {
    id: 'university',
    title: 'Universities & Colleges',
    description: 'Higher education, further education and adult learning.',
    count: '16 nearby',
    iconName: 'landmark',
    searchTerm: 'university college higher education',
  },
  {
    id: 'church',
    title: 'Churches',
    description: 'Parish churches, worship schedules and community outreach.',
    count: '58 nearby',
    iconName: 'church',
    searchTerm: 'church worship parish',
  },
  {
    id: 'nursery',
    title: 'Nurseries & Early Years',
    description: 'Nurseries, pre-schools and early years providers.',
    count: '35 nearby',
    iconName: 'baby',
    searchTerm: 'nursery pre-school early years childcare',
  },
  {
    id: 'community',
    title: 'Community Halls',
    description: 'Civic halls, meeting rooms and hireable community spaces.',
    count: '21 nearby',
    iconName: 'users',
    searchTerm: 'community hall venue hire',
  },
];

/**
 * Churches, schools and community institutions drawn from the shared
 * listings collection, so every card links to a real /listing/:slug profile.
 */
export const INSTITUTIONS: Institution[] = POPULAR_LISTINGS.filter(
  (listing): listing is Institution =>
    (listing.category === 'churches' || listing.category === 'schools') &&
    Boolean(listing.institutionType) &&
    Boolean(listing.description)
);

export const getInstitutionCategory = (id: string) =>
  INSTITUTION_CATEGORIES.find((category) => category.id === id);
