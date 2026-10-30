export type ListingCategory = 'services' | 'shops' | 'churches' | 'schools';

export interface Listing {
  id: string;
  slug: string;
  name: string;
  category: ListingCategory;
  categoryLabel: string;
  isVerified: boolean;
  verificationBadgeText?: string;
  coverImage: string;
  coverAlt: string;
  rating?: number;
  reviewCount?: number;
  distance: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  isOpenNow?: boolean;
  openingHoursText?: string;
  isBookable: boolean;
  bookingStatusText?: string;
  actionText: string;
  secondaryNote?: string;
}

export interface CategoryCard {
  id: ListingCategory;
  title: string;
  description: string;
  badge: string;
  badgeStyle?: 'confirmed' | 'neutral' | 'tertiary';
  count: string;
  iconName: 'content_cut' | 'storefront' | 'church' | 'school';
}
