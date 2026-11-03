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
  /** Sub-category used by the public services directory. */
  serviceCategory?: string;
  /** Optional "from" price shown on service provider cards, e.g. "£25". */
  startingPrice?: string;
  /** Short public description, used on institution cards and profiles. */
  description?: string;
  /** Sub-category used by the churches & schools directory. */
  institutionType?: string;
}

export type InstitutionType =
  | 'primary'
  | 'secondary'
  | 'university'
  | 'church'
  | 'nursery'
  | 'community';

export type InstitutionIcon =
  | 'school'
  | 'graduation_cap'
  | 'landmark'
  | 'church'
  | 'baby'
  | 'users';

export interface InstitutionCategory {
  id: InstitutionType;
  title: string;
  description: string;
  count: string;
  iconName: InstitutionIcon;
  searchTerm: string;
}

export interface Institution extends Listing {
  institutionType: InstitutionType;
  description: string;
}

export type ServiceCategoryIcon =
  | 'scissors'
  | 'wrench'
  | 'heart_pulse'
  | 'sparkles'
  | 'paw_print'
  | 'home'
  | 'graduation_cap'
  | 'camera';

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  count: string;
  iconName: ServiceCategoryIcon;
  searchTerm: string;
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

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
export type OwnerListingStatus = 'published' | 'draft' | 'paused';

export interface OwnerProfile {
  firstName: string;
  fullName: string;
  email: string;
  avatar: string;
  businessName: string;
  address: string;
  addressShort: string;
  profileId: string;
}

export interface OwnerListing {
  id: string;
  slug: string;
  name: string;
  categoryLabel: string;
  coverImage: string;
  coverAlt: string;
  address: string;
  status: OwnerListingStatus;
  isVerified: boolean;
  rating?: number;
  reviewCount?: number;
  bookingsThisMonth: number;
  servicesCount: number;
  nextAvailable?: string;
}

export interface OwnerAppointment {
  id: string;
  customerName: string;
  customerInitials: string;
  customerImage?: string;
  customerNote: string;
  customerPhone: string;
  service: string;
  duration: string;
  price: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  listingName: string;
}
