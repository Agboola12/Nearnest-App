import { OwnerAppointment, OwnerListing, OwnerProfile } from '../types';

const toLocalIsoDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const dateFromToday = (offset: number) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return toLocalIsoDate(date);
};

export const OWNER_PROFILE: OwnerProfile = {
  firstName: 'Marcus',
  fullName: 'Marcus Reed',
  email: 'marcus@heritagebarber.co.uk',
  avatar:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80',
  businessName: 'The Heritage Barber & Co',
  address: '14 George Street, Richmond, TW9 1JY',
  addressShort: '14 George Street, Richmond',
  profileId: '#NN-7741',
};

export const OWNER_LISTINGS: OwnerListing[] = [
  {
    id: 'ol-1',
    slug: 'the-heritage-barber-and-co',
    name: 'The Heritage Barber & Co',
    categoryLabel: 'Barber / Grooming',
    coverImage:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    coverAlt:
      'Warmly lit vintage barbershop with leather chairs, oak counters and brass detailing.',
    address: '14 George Street, Richmond',
    status: 'published',
    isVerified: true,
    rating: 4.9,
    reviewCount: 128,
    bookingsThisMonth: 42,
    servicesCount: 6,
    nextAvailable: 'Today, 10:30 AM',
  },
  {
    id: 'ol-2',
    slug: 'heritage-grooming-studio',
    name: 'Heritage Grooming Studio',
    categoryLabel: 'Barber / Grooming',
    coverImage:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    coverAlt:
      'Contemporary grooming studio interior with a mirrored station, warm timber and soft lighting.',
    address: '8 Kew Road, Richmond',
    status: 'draft',
    isVerified: false,
    bookingsThisMonth: 0,
    servicesCount: 3,
    nextAvailable: 'Not published yet',
  },
  {
    id: 'ol-3',
    slug: 'heritage-barber-academy',
    name: 'Heritage Barber Academy',
    categoryLabel: 'Training & Workshops',
    coverImage:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
    coverAlt:
      'Barbering tools and clippers arranged on a timber workspace in a training studio.',
    address: '22 Hill Rise, Richmond',
    status: 'paused',
    isVerified: true,
    rating: 4.7,
    reviewCount: 46,
    bookingsThisMonth: 12,
    servicesCount: 4,
    nextAvailable: 'Resumes next week',
  },
];

export const OWNER_APPOINTMENTS: OwnerAppointment[] = [
  {
    id: 'apt-1001',
    customerName: 'Alistair Hughes',
    customerInitials: 'AH',
    customerImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    customerNote: 'Regular client · 6 visits',
    customerPhone: '+44 7700 900 142',
    service: 'Signature Haircut & Hot Towel',
    duration: '45 min',
    price: '£45',
    date: dateFromToday(0),
    time: '10:30 AM',
    status: 'confirmed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1002',
    customerName: 'David Ross',
    customerInitials: 'DR',
    customerNote: 'Regular client · 8 visits',
    customerPhone: '+44 7700 900 317',
    service: 'Classic Beard Trim & Shape',
    duration: '30 min',
    price: '£30',
    date: dateFromToday(0),
    time: '11:30 AM',
    status: 'confirmed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1003',
    customerName: 'Elena Chen',
    customerInitials: 'EC',
    customerImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    customerNote: 'First-time client',
    customerPhone: '+44 7700 900 486',
    service: 'Executive Cut & Scalp Revitaliser',
    duration: '60 min',
    price: '£65',
    date: dateFromToday(0),
    time: '2:15 PM',
    status: 'pending',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1004',
    customerName: 'Julian Washington',
    customerInitials: 'JW',
    customerNote: 'VIP membership',
    customerPhone: '+44 7700 900 228',
    service: 'Standard Cut & Styling',
    duration: '40 min',
    price: '£35',
    date: dateFromToday(0),
    time: '3:45 PM',
    status: 'confirmed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1005',
    customerName: 'Priya Nair',
    customerInitials: 'PN',
    customerNote: 'Walk-in appointment',
    customerPhone: '+44 7700 900 571',
    service: 'Wash & Blow Dry',
    duration: '30 min',
    price: '£28',
    date: dateFromToday(0),
    time: '9:00 AM',
    status: 'completed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1006',
    customerName: 'Samuel Okafor',
    customerInitials: 'SO',
    customerNote: 'Regular client · 3 visits',
    customerPhone: '+44 7700 900 640',
    service: 'Hot Towel Shave',
    duration: '30 min',
    price: '£32',
    date: dateFromToday(1),
    time: '11:00 AM',
    status: 'confirmed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1007',
    customerName: 'Grace Adeyemi',
    customerInitials: 'GA',
    customerImage:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80',
    customerNote: 'First-time client',
    customerPhone: '+44 7700 900 705',
    service: 'Colour Consultation',
    duration: '45 min',
    price: '£50',
    date: dateFromToday(2),
    time: '1:30 PM',
    status: 'pending',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1008',
    customerName: 'Leo Martins',
    customerInitials: 'LM',
    customerNote: 'Regular client · 4 visits',
    customerPhone: '+44 7700 900 812',
    service: 'Classic Cut',
    duration: '30 min',
    price: '£25',
    date: dateFromToday(-5),
    time: '4:00 PM',
    status: 'completed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1009',
    customerName: 'Hannah Blake',
    customerInitials: 'HB',
    customerNote: 'Regular client · 2 visits',
    customerPhone: '+44 7700 900 933',
    service: 'Beard Sculpt',
    duration: '30 min',
    price: '£30',
    date: dateFromToday(-7),
    time: '10:00 AM',
    status: 'completed',
    listingName: 'The Heritage Barber & Co',
  },
  {
    id: 'apt-1010',
    customerName: 'Omar Farouk',
    customerInitials: 'OF',
    customerNote: 'New enquiry',
    customerPhone: '+44 7700 900 174',
    service: 'Cut & Beard',
    duration: '45 min',
    price: '£40',
    date: dateFromToday(-1),
    time: '3:00 PM',
    status: 'cancelled',
    listingName: 'The Heritage Barber & Co',
  },
];
