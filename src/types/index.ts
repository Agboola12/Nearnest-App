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

export type AppointmentStatus =
  | 'confirmed'
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'rejected';
export type PaymentStatus = 'paid' | 'pending' | 'refunded' | 'not_charged';
export type OwnerListingStatus = 'published' | 'draft' | 'paused';

export interface OwnerProfile {
  firstName: string;
  fullName: string;
  email: string;
  avatar: string;
  businessName: string;
  businessLogo?: string;
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
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
}

export interface OwnerService {
  id: string;
  listingId: string;
  listingName: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  isActive: boolean;
}

export type OwnerNotificationType = 'booking' | 'appointment' | 'review' | 'system';

export interface OwnerNotification {
  id: string;
  type: OwnerNotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface OwnerAppointment {
  id: string;
  customerName: string;
  customerInitials: string;
  customerImage?: string;
  customerNote: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  duration: string;
  price: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  listingId: string;
  listingName: string;
}

/** A service row inside the business listing creation wizard. */
export interface ListingWizardService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

/** One day of opening hours in the business listing creation wizard. */
export interface ListingOpeningDay {
  day: string;
  isClosed: boolean;
  open: string;
  close: string;
}

/** A selected image (data URL or sample URL) in the listing wizard. */
export interface ListingWizardImage {
  id: string;
  src: string;
  name: string;
  size?: number;
}

export interface ListingWizardImages {
  logo: ListingWizardImage | null;
  cover: ListingWizardImage | null;
  gallery: ListingWizardImage[];
}
