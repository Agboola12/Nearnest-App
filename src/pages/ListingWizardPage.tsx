import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Globe2,
  Image as ImageIcon,
  Info,
  Landmark,
  Mail,
  MapPin,
  Pencil,
  Phone,
  PlusCircle,
  Save,
  ShieldCheck,
  Sparkles,
  Store,
  Tag,
  Trash2,
  Wrench,
} from 'lucide-react';
import { OWNER_PROFILE } from '../data/mockOwnerDashboard';
import {
  BUSINESS_CATEGORIES,
  COUNTRIES,
  createDefaultHours,
  createEmptyImages,
  SAMPLE_IMAGES,
} from '../data/listingWizardOptions';
import { ListingOpeningDay, ListingWizardImages, ListingWizardService } from '../types';
import { WizardProgress } from '../components/owner/wizard/WizardProgress';
import { ListingPreviewCard } from '../components/owner/wizard/ListingPreviewCard';
import {
  LaunchChecklist,
  LaunchChecklistItem,
} from '../components/owner/wizard/LaunchChecklist';
import {
  GalleryUpload,
  SingleImageUpload,
} from '../components/owner/wizard/ImageUploader';

interface BusinessDetails {
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
}

interface BusinessLocationDetails {
  country: string;
  state: string;
  city: string;
  street: string;
  additional: string;
}

interface WizardStepMeta {
  label: string;
  tag: string;
  heading: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOTAL_STEPS = 6;

const WIZARD_STEPS: WizardStepMeta[] = [
  {
    label: 'Business info',
    tag: 'Identity & contact',
    heading: 'Tell the neighbourhood who you are.',
    description:
      'Start with the essentials customers use to recognise and contact your business.',
    icon: Store,
  },
  {
    label: 'Location',
    tag: 'Physical premises & mapping',
    heading: 'Where can neighbours find you?',
    description:
      'Your address helps customers plan their visit and keeps your directory listing accurate.',
    icon: MapPin,
  },
  {
    label: 'Services',
    tag: 'Services & pricing',
    heading: 'What can customers book with you?',
    description:
      'Add the services you offer, how long they take and what customers should expect to pay.',
    icon: Wrench,
  },
  {
    label: 'Photos',
    tag: 'Brand & photography',
    heading: 'Show customers what makes you local.',
    description:
      'Upload a clear logo and warm photography of your space, team or craft.',
    icon: ImageIcon,
  },
  {
    label: 'Opening hours',
    tag: 'Weekly availability',
    heading: 'When are you open for visits?',
    description:
      'Set your regular weekly hours. Customers will only see the days you are open.',
    icon: Clock3,
  },
  {
    label: 'Review',
    tag: 'Final review',
    heading: 'One last look before you submit.',
    description:
      'Check every detail below. You can jump back to any section to make changes.',
    icon: ClipboardCheck,
  },
];

const EMPTY_BUSINESS: BusinessDetails = {
  name: '',
  category: '',
  description: '',
  phone: '',
  email: '',
};

const EMPTY_LOCATION: BusinessLocationDetails = {
  country: 'United Kingdom',
  state: '',
  city: '',
  street: '',
  additional: '',
};

const createEmptyService = (): ListingWizardService => ({
  id: `svc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: '',
  description: '',
  price: '',
  duration: '',
});

const generateReference = () => `#NN-${Math.floor(1000 + Math.random() * 9000)}`;

const formatTime = (value: string) => {
  if (!value) return '—';
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`;
};

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

const FieldShell: React.FC<FieldShellProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
  className = '',
}) => (
  <div className={className}>
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold text-text-primary mb-1.5"
    >
      {label} {required && <span className="text-status-rejected-text">*</span>}
    </label>
    {children}
    {hint && !error && <p className="mt-1.5 text-[11px] text-text-muted">{hint}</p>}
    {error && (
      <p role="alert" className="mt-1.5 text-[11px] font-medium text-status-rejected-text">
        {error}
      </p>
    )}
  </div>
);

const inputClasses = (hasError: boolean) =>
  `w-full h-11 rounded-lg border bg-surface-container-lowest px-3.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
    hasError ? 'border-status-rejected-text/70' : 'border-border-subtle'
  }`;

interface ReviewSectionProps {
  title: string;
  icon: React.ReactNode;
  onEdit: () => void;
  children: React.ReactNode;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  title,
  icon,
  onEdit,
  children,
}) => (
  <section className="rounded-xl border border-border-subtle bg-surface-container-lowest/70 p-4 sm:p-5">
    <div className="flex items-center justify-between gap-3 mb-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-border-subtle text-text-secondary text-[11px] font-semibold hover:bg-surface-warm hover:text-text-primary transition-colors"
      >
        <Pencil className="w-3 h-3" />
        Edit
      </button>
    </div>
    {children}
  </section>
);

const ReviewItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
      {label}
    </dt>
    <dd className="mt-1 text-sm text-text-primary break-words">{value}</dd>
  </div>
);

export const ListingWizardPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState<BusinessDetails>(EMPTY_BUSINESS);
  const [location, setLocation] = useState<BusinessLocationDetails>(EMPTY_LOCATION);
  const [services, setServices] = useState<ListingWizardService[]>(() => [createEmptyService()]);
  const [images, setImages] = useState<ListingWizardImages>(createEmptyImages);
  const [hours, setHours] = useState<ListingOpeningDay[]>(createDefaultHours);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSavedAt, setAutoSavedAt] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  const [listingReference, setListingReference] = useState(generateReference);

  const currentMeta = WIZARD_STEPS[step - 1];
  const CurrentIcon = currentMeta.icon;

  useEffect(() => {
    const timer = window.setTimeout(() => setAutoSavedAt(Date.now()), 900);
    return () => window.clearTimeout(timer);
  }, [business, location, services, hours, images]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearError = (key: string) => {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validateBusiness = () => {
    const next: Record<string, string> = {};
    if (!business.name.trim()) next.name = 'Enter your business name.';
    if (!business.category) next.category = 'Choose a business category.';
    if (!business.description.trim()) next.description = 'Add a short business description.';
    if (!business.phone.trim()) {
      next.phone = 'Enter a business phone number.';
    } else if (!/^[+]?[\d\s().-]{7,20}$/.test(business.phone.trim())) {
      next.phone = 'Enter a valid phone number.';
    }
    if (!business.email.trim()) {
      next.email = 'Enter a business email address.';
    } else if (!/\S+@\S+\.\S+/.test(business.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    return next;
  };

  const validateLocation = () => {
    const next: Record<string, string> = {};
    if (!location.street.trim()) next.street = 'Enter your street address.';
    if (!location.city.trim()) next.city = 'Enter your city or town.';
    if (!location.state.trim()) next.state = 'Enter your state or region.';
    if (!location.country.trim()) next.country = 'Choose your country.';
    return next;
  };

  const validateServices = () => {
    const next: Record<string, string> = {};

    if (services.length === 0) {
      next.services = 'Add at least one service before continuing.';
      return next;
    }

    services.forEach((service) => {
      if (!service.name.trim()) {
        next[`service-${service.id}-name`] = 'Service name is required.';
      }
      if (!service.description.trim()) {
        next[`service-${service.id}-description`] = 'Service description is required.';
      }
      if (!service.price.trim()) {
        next[`service-${service.id}-price`] = 'Price is required.';
      } else if (Number(service.price) <= 0 || Number.isNaN(Number(service.price))) {
        next[`service-${service.id}-price`] = 'Enter a price greater than zero.';
      }
      if (!service.duration.trim()) {
        next[`service-${service.id}-duration`] = 'Duration is required.';
      }
    });

    return next;
  };

  const validatePhotos = () => {
    const next: Record<string, string> = {};
    if (!images.cover) {
      next.cover = 'Add a cover image for your directory card.';
    }
    return next;
  };

  const validateHours = () => {
    const next: Record<string, string> = {};
    const openDays = hours.filter((day) => !day.isClosed);

    if (openDays.length === 0) {
      next.hours = 'Mark at least one day as open.';
    }

    hours.forEach((day) => {
      if (day.isClosed) return;
      if (!day.open || !day.close) {
        next[`hours-${day.day}`] = 'Set both an opening and closing time.';
        return;
      }
      if (day.open >= day.close) {
        next[`hours-${day.day}`] = 'Closing time must be later than opening time.';
      }
    });

    return next;
  };

  const validateStep = (stepToValidate: number) => {
    switch (stepToValidate) {
      case 1:
        return validateBusiness();
      case 2:
        return validateLocation();
      case 3:
        return validateServices();
      case 4:
        return validatePhotos();
      case 5:
        return validateHours();
      default:
        return {};
    }
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    setErrors({});
    scrollToTop();
  };

  const handleNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      scrollToTop();
      return;
    }

    setErrors({});
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
    scrollToTop();
  };

  const handlePrevious = () => {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
    scrollToTop();
  };

  const handleSaveDraft = () => {
    setAutoSavedAt(Date.now());
    setToast('Draft saved in this demo session.');
  };

  const handleSubmit = () => {
    const stepErrors = [1, 2, 3, 4, 5].reduce<Record<string, string>>(
      (allErrors, stepToValidate) => ({
        ...allErrors,
        ...validateStep(stepToValidate),
      }),
      {}
    );

    if (Object.keys(stepErrors).length > 0) {
      const firstInvalidStep = [1, 2, 3, 4, 5].find(
        (stepToValidate) => Object.keys(validateStep(stepToValidate)).length > 0
      );
      setErrors(stepErrors);
      setStep(firstInvalidStep ?? 1);
      scrollToTop();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      scrollToTop();
    }, 900);
  };

  const resetWizard = () => {
    setStep(1);
    setBusiness(EMPTY_BUSINESS);
    setLocation(EMPTY_LOCATION);
    setServices([createEmptyService()]);
    setImages(createEmptyImages());
    setHours(createDefaultHours());
    setErrors({});
    setSubmitted(false);
    setIsSubmitting(false);
    setAutoSavedAt(null);
    setListingReference(generateReference());
    scrollToTop();
  };

  const updateService = (
    serviceId: string,
    field: keyof Pick<ListingWizardService, 'name' | 'description' | 'price' | 'duration'>,
    value: string
  ) => {
    setServices((current) =>
      current.map((service) =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    );
    clearError(`service-${serviceId}-${field}`);
  };

  const addService = () => {
    setServices((current) => [...current, createEmptyService()]);
    clearError('services');
  };

  const removeService = (serviceId: string) => {
    setServices((current) => current.filter((service) => service.id !== serviceId));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(next)
        .filter((key) => key.startsWith(`service-${serviceId}-`))
        .forEach((key) => delete next[key]);
      return next;
    });
  };

  const updateDay = (index: number, patch: Partial<ListingOpeningDay>) => {
    setHours((current) =>
      current.map((day, dayIndex) => (dayIndex === index ? { ...day, ...patch } : day))
    );
    const dayName = hours[index]?.day;
    if (dayName) {
      clearError(`hours-${dayName}`);
    }
    clearError('hours');
  };

  const copyMondayToWeekdays = () => {
    const monday = hours[0];
    setHours((current) =>
      current.map((day, index) =>
        index >= 1 && index <= 4
          ? {
              ...day,
              isClosed: monday.isClosed,
              open: monday.open,
              close: monday.close,
            }
          : day
      )
    );
    clearError('hours');
    setToast('Monday hours copied to Tuesday – Friday.');
  };

  const applySampleImages = () => {
    setImages(SAMPLE_IMAGES);
    clearError('cover');
    setToast('Sample images added to this draft.');
  };

  const fullAddress = [
    location.street,
    location.additional,
    location.city,
    location.state,
    location.country,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');

  const completeServices = services.filter(
    (service) =>
      service.name.trim() &&
      service.description.trim() &&
      service.price.trim() &&
      service.duration.trim()
  );
  const pricedServices = services
    .map((service) => Number(service.price))
    .filter((price) => Number.isFinite(price) && price > 0);
  const startingPrice =
    pricedServices.length > 0 ? `£${Math.min(...pricedServices).toFixed(2).replace(/\.00$/, '')}` : null;
  const openDays = hours.filter((day) => !day.isClosed);
  const hoursSummary = openDays.length
    ? `${openDays.length} day${openDays.length === 1 ? '' : 's'} open`
    : 'Hours pending';

  const detailsDone =
    Boolean(business.name.trim()) &&
    Boolean(business.category) &&
    Boolean(business.description.trim()) &&
    Boolean(business.phone.trim()) &&
    /\S+@\S+\.\S+/.test(business.email.trim());
  const locationDone =
    Boolean(location.street.trim()) &&
    Boolean(location.city.trim()) &&
    Boolean(location.state.trim()) &&
    Boolean(location.country.trim());
  const servicesDone = completeServices.length > 0;
  const photosDone = Boolean(images.cover);
  const hoursDone =
    openDays.length > 0 &&
    openDays.every((day) => day.open && day.close && day.open < day.close);

  const checklistItems: LaunchChecklistItem[] = [
    {
      title: 'Business details',
      description: detailsDone ? 'Name, category and contact routes set' : 'Name, category and contact details',
      done: detailsDone,
    },
    {
      title: 'Verified street address',
      description: locationDone ? 'Address ready for civic verification' : 'Street, city and region',
      done: locationDone,
    },
    {
      title: 'Service menu',
      description: servicesDone
        ? `${completeServices.length} service${completeServices.length === 1 ? '' : 's'} ready`
        : 'At least one complete service',
      done: servicesDone,
    },
    {
      title: 'Brand & cover photos',
      description: photosDone ? 'Cover image uploaded' : 'Add a cover image for your card',
      done: photosDone,
    },
    {
      title: 'Defined opening hours',
      description: hoursDone ? 'Weekly hours ready' : 'At least one open day with valid times',
      done: hoursDone,
    },
  ];

  const hasErrors = Object.keys(errors).length > 0;

  const inputError = (key: string) => errors[key];

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-10 text-center shadow-subtle">
          <span className="w-16 h-16 rounded-2xl bg-status-confirmed-bg text-status-confirmed-text flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </span>
          <p className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed-text" />
            Listing submitted
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
            Your business is on its way to the neighbourhood.
          </h1>
          <p className="mt-3 text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
            Thanks, {OWNER_PROFILE.firstName}. <strong className="text-text-primary">{business.name}</strong>{' '}
            has been sent for civic verification. Once approved, neighbours will be able to discover,
            book and review your business from this same NearNest account.
          </p>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="rounded-xl border border-border-subtle bg-surface-warm/60 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
                Reference
              </p>
              <p className="mt-1 text-sm font-bold text-text-primary">{listingReference}</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface-warm/60 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
                Status
              </p>
              <p className="mt-1 text-sm font-bold text-secondary">Pending review</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-surface-warm/60 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
                Services
              </p>
              <p className="mt-1 text-sm font-bold text-text-primary">
                {completeServices.length} listed
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2">
            <Link
              to="/owner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
            >
              Back to dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={resetWizard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-primary text-sm font-semibold hover:bg-surface-warm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Create another listing
            </button>
          </div>

          <p className="mt-5 text-[11px] text-text-muted">
            Frontend demonstration only. No data has been sent to a backend or database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/owner"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-text-primary hover:bg-surface-container-highest transition-colors text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit to dashboard
            </Link>
            <div className="h-4 w-px bg-border-subtle" />
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
              Draft {listingReference}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-badge-amber-bg text-badge-amber-text text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-badge-amber-text" />
              Step {step} of {TOTAL_STEPS}: {currentMeta.label}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary bg-surface-container-low text-[11px] font-semibold">
              <Save className="w-3.5 h-3.5" />
              {autoSavedAt ? 'Auto-saved just now' : 'Draft in progress'}
            </span>
          </div>
        </div>

        <WizardProgress steps={WIZARD_STEPS.map((item) => item.label)} currentStep={step} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-8">
          <div className="bg-surface-card rounded-2xl p-5 sm:p-7 lg:p-8 shadow-subtle border border-border-subtle">
            <div className="mb-7 border-b border-border-subtle/70 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-wash text-primary text-[10px] font-bold uppercase tracking-wide border border-primary/20">
                <CurrentIcon className="w-3.5 h-3.5" />
                {currentMeta.tag}
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                {currentMeta.heading}
              </h1>
              <p className="mt-2 text-sm text-text-secondary max-w-2xl leading-relaxed">
                {currentMeta.description}
              </p>
            </div>

            {hasErrors && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-xl bg-status-rejected-bg border border-status-rejected-text/20 p-3.5"
              >
                <AlertCircle className="w-4 h-4 text-status-rejected-text shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-status-rejected-text">
                    A few details need your attention.
                  </p>
                  <p className="mt-0.5 text-[11px] text-status-rejected-text/80">
                    Fix the highlighted fields below before continuing.
                  </p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FieldShell
                  label="Business name"
                  htmlFor="business-name"
                  required
                  error={inputError('name')}
                  className="md:col-span-2"
                >
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="business-name"
                      type="text"
                      value={business.name}
                      onChange={(event) => {
                        setBusiness((current) => ({ ...current, name: event.target.value }));
                        clearError('name');
                      }}
                      placeholder="e.g. The Heritage Barber & Co"
                      className={`${inputClasses(Boolean(inputError('name')))} pl-10`}
                      aria-invalid={Boolean(inputError('name'))}
                    />
                  </div>
                </FieldShell>

                <FieldShell
                  label="Business category"
                  htmlFor="business-category"
                  required
                  error={inputError('category')}
                  className="md:col-span-2"
                >
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <select
                      id="business-category"
                      value={business.category}
                      onChange={(event) => {
                        setBusiness((current) => ({ ...current, category: event.target.value }));
                        clearError('category');
                      }}
                      className={`${inputClasses(Boolean(inputError('category')))} pl-10 pr-9 appearance-none cursor-pointer`}
                      aria-invalid={Boolean(inputError('category'))}
                    >
                      <option value="">Choose a category</option>
                      {BUSINESS_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  </div>
                </FieldShell>

                <FieldShell
                  label="Short business description"
                  htmlFor="business-description"
                  required
                  error={inputError('description')}
                  hint={`${business.description.length}/280 characters`}
                  className="md:col-span-2"
                >
                  <textarea
                    id="business-description"
                    rows={4}
                    maxLength={280}
                    value={business.description}
                    onChange={(event) => {
                      setBusiness((current) => ({
                        ...current,
                        description: event.target.value,
                      }));
                      clearError('description');
                    }}
                    placeholder="A warm, traditional barbershop offering precision cuts and unhurried grooming for the whole neighbourhood."
                    className={`w-full rounded-lg border bg-surface-container-lowest px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted resize-none transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                      inputError('description')
                        ? 'border-status-rejected-text/70'
                        : 'border-border-subtle'
                    }`}
                    aria-invalid={Boolean(inputError('description'))}
                  />
                </FieldShell>

                <FieldShell
                  label="Business phone number"
                  htmlFor="business-phone"
                  required
                  error={inputError('phone')}
                >
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="business-phone"
                      type="tel"
                      value={business.phone}
                      onChange={(event) => {
                        setBusiness((current) => ({ ...current, phone: event.target.value }));
                        clearError('phone');
                      }}
                      placeholder="+44 20 8940 2214"
                      className={`${inputClasses(Boolean(inputError('phone')))} pl-10`}
                      aria-invalid={Boolean(inputError('phone'))}
                    />
                  </div>
                </FieldShell>

                <FieldShell
                  label="Business email"
                  htmlFor="business-email"
                  required
                  error={inputError('email')}
                >
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="business-email"
                      type="email"
                      value={business.email}
                      onChange={(event) => {
                        setBusiness((current) => ({ ...current, email: event.target.value }));
                        clearError('email');
                      }}
                      placeholder="hello@yourbusiness.co.uk"
                      className={`${inputClasses(Boolean(inputError('email')))} pl-10`}
                      aria-invalid={Boolean(inputError('email'))}
                    />
                  </div>
                </FieldShell>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FieldShell
                    label="Street address"
                    htmlFor="location-street"
                    required
                    error={inputError('street')}
                    className="md:col-span-2"
                  >
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      <input
                        id="location-street"
                        type="text"
                        value={location.street}
                        onChange={(event) => {
                          setLocation((current) => ({ ...current, street: event.target.value }));
                          clearError('street');
                        }}
                        placeholder="e.g. 14 George Street"
                        className={`${inputClasses(Boolean(inputError('street')))} pl-10`}
                        aria-invalid={Boolean(inputError('street'))}
                      />
                    </div>
                  </FieldShell>

                  <FieldShell
                    label="City / town"
                    htmlFor="location-city"
                    required
                    error={inputError('city')}
                  >
                    <div className="relative">
                      <Landmark className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      <input
                        id="location-city"
                        type="text"
                        value={location.city}
                        onChange={(event) => {
                          setLocation((current) => ({ ...current, city: event.target.value }));
                          clearError('city');
                        }}
                        placeholder="e.g. Richmond"
                        className={`${inputClasses(Boolean(inputError('city')))} pl-10`}
                        aria-invalid={Boolean(inputError('city'))}
                      />
                    </div>
                  </FieldShell>

                  <FieldShell
                    label="State / region"
                    htmlFor="location-state"
                    required
                    error={inputError('state')}
                  >
                    <input
                      id="location-state"
                      type="text"
                      value={location.state}
                      onChange={(event) => {
                        setLocation((current) => ({ ...current, state: event.target.value }));
                        clearError('state');
                      }}
                      placeholder="e.g. Greater London"
                      className={inputClasses(Boolean(inputError('state')))}
                      aria-invalid={Boolean(inputError('state'))}
                    />
                  </FieldShell>

                  <FieldShell
                    label="Country"
                    htmlFor="location-country"
                    required
                    error={inputError('country')}
                  >
                    <div className="relative">
                      <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      <select
                        id="location-country"
                        value={location.country}
                        onChange={(event) => {
                          setLocation((current) => ({ ...current, country: event.target.value }));
                          clearError('country');
                        }}
                        className={`${inputClasses(Boolean(inputError('country')))} pl-10 pr-9 appearance-none cursor-pointer`}
                        aria-invalid={Boolean(inputError('country'))}
                      >
                        {COUNTRIES.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    </div>
                  </FieldShell>

                  <FieldShell
                    label="Additional location details"
                    htmlFor="location-additional"
                    hint="Optional — suite, unit, floor, entrance notes or parking guidance."
                    className="md:col-span-2"
                  >
                    <textarea
                      id="location-additional"
                      rows={3}
                      value={location.additional}
                      onChange={(event) =>
                        setLocation((current) => ({ ...current, additional: event.target.value }))
                      }
                      placeholder="e.g. Suite 100, enter through the courtyard entrance."
                      className="w-full rounded-lg border border-border-subtle bg-surface-container-lowest px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted resize-none transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </FieldShell>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div>
                      <p className="text-xs font-semibold text-text-primary">Entrance map preview</p>
                      <p className="text-[11px] text-text-muted">
                        A civic steward will verify the exact entrance before publication.
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        fullAddress
                          ? 'bg-status-confirmed-bg text-status-confirmed-text border-status-confirmed-text/20'
                          : 'bg-badge-amber-bg text-badge-amber-text border-badge-amber-text/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          fullAddress ? 'bg-status-confirmed-text' : 'bg-badge-amber-text'
                        }`}
                      />
                      {fullAddress ? 'Pin ready' : 'Pin pending'}
                    </span>
                  </div>

                  <div className="relative h-56 rounded-xl overflow-hidden border border-border-subtle bg-surface-container-low">
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundImage:
                          'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute left-0 right-0 top-1/3 h-4 bg-surface-card/80 -rotate-6" aria-hidden="true" />
                    <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-surface-card/80 rotate-6" aria-hidden="true" />
                    <div className="absolute left-0 right-0 bottom-1/4 h-3 bg-teal-wash/80 -rotate-3" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-wash/20 via-transparent to-surface-warm/40" aria-hidden="true" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center -translate-y-3">
                        <div className="max-w-[240px] px-3 py-1.5 rounded-full bg-text-primary text-white text-[11px] font-semibold shadow-lg truncate">
                          {business.name.trim() || 'Your business'}
                        </div>
                        <div className="mt-1 w-11 h-11 rounded-full bg-primary/20 ring-4 ring-primary/10 flex items-center justify-center">
                          <MapPin className="w-7 h-7 text-primary drop-shadow-sm" />
                        </div>
                        <div className="w-3.5 h-1.5 rounded-full bg-text-primary/30 blur-[1px]" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-card/95 backdrop-blur-sm text-[10px] text-text-secondary shadow-sm border border-border-subtle/70 truncate">
                        {fullAddress || 'Add your address to preview the map pin.'}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-surface-card/95 backdrop-blur-sm text-[10px] font-semibold text-text-muted shadow-sm border border-border-subtle/70">
                        Civic map pin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-warm/70 border border-border-subtle p-3.5">
                  <div>
                    <p className="text-xs font-semibold text-text-primary">
                      {services.length} service{services.length === 1 ? '' : 's'} in this draft
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Add each bookable service separately so customers know what to expect.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addService}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary hover:bg-teal-deep text-white text-[11px] font-semibold shadow-sm transition-all active:scale-95"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Add service
                  </button>
                </div>

                {services.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-primary/30 bg-teal-wash/40 p-8 text-center">
                    <span className="w-12 h-12 rounded-xl bg-surface-card text-primary flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <Wrench className="w-6 h-6" />
                    </span>
                    <h3 className="text-base font-bold text-text-primary">No services yet</h3>
                    <p className="mt-1 text-sm text-text-secondary max-w-md mx-auto">
                      Add your first service with a name, description, price and duration.
                    </p>
                    <button
                      type="button"
                      onClick={addService}
                      className="mt-4 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-sm transition-all"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add your first service
                    </button>
                  </div>
                ) : (
                  services.map((service, index) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-border-subtle bg-surface-container-lowest/70 p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-teal-wash text-primary text-xs font-bold flex items-center justify-center border border-primary/20">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              Service {index + 1}
                            </p>
                            <p className="text-[11px] text-text-muted">
                              Customers will see this on your public listing.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-status-rejected-bg/60 text-status-rejected-text text-[11px] font-semibold hover:bg-status-rejected-bg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldShell
                          label="Service name"
                          htmlFor={`service-name-${service.id}`}
                          required
                          error={inputError(`service-${service.id}-name`)}
                          className="md:col-span-2"
                        >
                          <input
                            id={`service-name-${service.id}`}
                            type="text"
                            value={service.name}
                            onChange={(event) =>
                              updateService(service.id, 'name', event.target.value)
                            }
                            placeholder="e.g. Signature Haircut & Hot Towel"
                            className={inputClasses(
                              Boolean(inputError(`service-${service.id}-name`))
                            )}
                            aria-invalid={Boolean(inputError(`service-${service.id}-name`))}
                          />
                        </FieldShell>

                        <FieldShell
                          label="Service description"
                          htmlFor={`service-description-${service.id}`}
                          required
                          error={inputError(`service-${service.id}-description`)}
                          className="md:col-span-2"
                        >
                          <textarea
                            id={`service-description-${service.id}`}
                            rows={2}
                            value={service.description}
                            onChange={(event) =>
                              updateService(service.id, 'description', event.target.value)
                            }
                            placeholder="Consultation, precision cut, hot towel finish and styling."
                            className={`w-full rounded-lg border bg-surface-container-lowest px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted resize-none transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                              inputError(`service-${service.id}-description`)
                                ? 'border-status-rejected-text/70'
                                : 'border-border-subtle'
                            }`}
                            aria-invalid={Boolean(
                              inputError(`service-${service.id}-description`)
                            )}
                          />
                        </FieldShell>

                        <FieldShell
                          label="Price"
                          htmlFor={`service-price-${service.id}`}
                          required
                          error={inputError(`service-${service.id}-price`)}
                        >
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted pointer-events-none">
                              £
                            </span>
                            <input
                              id={`service-price-${service.id}`}
                              type="number"
                              min="0"
                              step="0.01"
                              value={service.price}
                              onChange={(event) =>
                                updateService(service.id, 'price', event.target.value)
                              }
                              placeholder="45"
                              className={`${inputClasses(
                                Boolean(inputError(`service-${service.id}-price`))
                              )} pl-8`}
                              aria-invalid={Boolean(
                                inputError(`service-${service.id}-price`)
                              )}
                            />
                          </div>
                        </FieldShell>

                        <FieldShell
                          label="Duration"
                          htmlFor={`service-duration-${service.id}`}
                          required
                          error={inputError(`service-${service.id}-duration`)}
                        >
                          <div className="relative">
                            <Clock3 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                            <input
                              id={`service-duration-${service.id}`}
                              type="text"
                              value={service.duration}
                              onChange={(event) =>
                                updateService(service.id, 'duration', event.target.value)
                              }
                              placeholder="45 min"
                              className={`${inputClasses(
                                Boolean(inputError(`service-${service.id}-duration`))
                              )} pl-10`}
                              aria-invalid={Boolean(
                                inputError(`service-${service.id}-duration`)
                              )}
                            />
                          </div>
                        </FieldShell>
                      </div>
                    </div>
                  ))
                )}

                <button
                  type="button"
                  onClick={addService}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-primary/35 bg-teal-wash/30 text-primary text-sm font-semibold hover:bg-teal-wash/60 hover:border-primary/50 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add another service
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-teal-wash/70 border border-primary/15 p-4">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-surface-card text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Want to preview the finished card quickly?
                      </p>
                      <p className="text-[11px] text-text-secondary mt-0.5">
                        Drop in a set of sample images and replace them later.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={applySampleImages}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-card border border-border-subtle text-text-primary text-[11px] font-semibold hover:bg-surface-warm transition-colors shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Use sample images
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
                  <SingleImageUpload
                    label="Business logo"
                    description="Optional — a square mark or team photo works best."
                    value={images.logo}
                    onChange={(logo) => setImages((current) => ({ ...current, logo }))}
                    variant="logo"
                  />
                  <SingleImageUpload
                    label="Cover image"
                    description="The hero image customers see on your directory card."
                    value={images.cover}
                    onChange={(cover) => {
                      setImages((current) => ({ ...current, cover }));
                      clearError('cover');
                    }}
                    variant="cover"
                    required
                    error={errors.cover}
                  />
                </div>

                <GalleryUpload
                  images={images.gallery}
                  onChange={(gallery) => setImages((current) => ({ ...current, gallery }))}
                />

                <div className="flex items-start gap-2.5 rounded-xl bg-surface-warm/80 border border-border-subtle p-3.5">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    PNG, JPG and WebP files are supported. Each image must be 5 MB or smaller.
                    Images are previewed locally in this browser and are not uploaded anywhere.
                  </p>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Regular weekly hours</p>
                    <p className="text-[11px] text-text-muted">
                      Turn a day off when you are closed — it will be hidden from booking.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyMondayToWeekdays}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-warm border border-border-subtle text-text-secondary text-[11px] font-semibold hover:bg-surface-container transition-colors"
                  >
                    <CalendarDays className="w-3.5 h-3.5 text-primary" />
                    Copy Monday to weekdays
                  </button>
                </div>

                <div className="space-y-2.5">
                  {hours.map((day, index) => {
                    const rowError = inputError(`hours-${day.day}`);

                    return (
                      <div
                        key={day.day}
                        className={`rounded-xl border p-3.5 transition-colors ${
                          rowError
                            ? 'border-status-rejected-text/40 bg-status-rejected-bg/20'
                            : day.isClosed
                              ? 'border-border-subtle bg-surface-container-low/70'
                              : 'border-border-subtle bg-surface-container-lowest'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-center gap-2.5 sm:w-32 shrink-0">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                day.isClosed ? 'bg-text-muted/40' : 'bg-primary'
                              }`}
                            />
                            <span className="text-sm font-semibold text-text-primary">
                              {day.day}
                            </span>
                          </div>

                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <label className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                              Opens
                              <input
                                type="time"
                                value={day.open}
                                disabled={day.isClosed}
                                onChange={(event) =>
                                  updateDay(index, { open: event.target.value })
                                }
                                className="mt-1 block w-full h-10 rounded-lg border border-border-subtle bg-surface-card px-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                              />
                            </label>
                            <label className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                              Closes
                              <input
                                type="time"
                                value={day.close}
                                disabled={day.isClosed}
                                onChange={(event) =>
                                  updateDay(index, { close: event.target.value })
                                }
                                className="mt-1 block w-full h-10 rounded-lg border border-border-subtle bg-surface-card px-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                              />
                            </label>
                          </div>

                          <div className="flex items-center gap-2 sm:w-24 sm:justify-end shrink-0">
                            <button
                              type="button"
                              role="switch"
                              aria-checked={day.isClosed}
                              aria-label={`Mark ${day.day} as closed`}
                              onClick={() => updateDay(index, { isClosed: !day.isClosed })}
                              className={`relative w-9 h-5 rounded-full transition-colors ${
                                day.isClosed ? 'bg-surface-dim' : 'bg-primary'
                              }`}
                            >
                              <span
                                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                                  day.isClosed ? 'translate-x-0.5' : 'translate-x-[18px]'
                                }`}
                              />
                            </button>
                            <span
                              className={`text-[11px] font-semibold ${
                                day.isClosed ? 'text-text-muted' : 'text-text-secondary'
                              }`}
                            >
                              {day.isClosed ? 'Closed' : 'Open'}
                            </span>
                          </div>
                        </div>
                        {rowError && (
                          <p
                            role="alert"
                            className="mt-2 text-[11px] font-medium text-status-rejected-text sm:pl-32"
                          >
                            {rowError}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-surface-warm/80 border border-border-subtle p-3.5">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Opening hours are shown in your local time. You can add date-specific
                    exceptions and staff availability from the dashboard after submission.
                  </p>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <ReviewSection
                  title="Business information"
                  icon={<Store className="w-4 h-4" />}
                  onEdit={() => goToStep(1)}
                >
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <ReviewItem label="Business name" value={business.name} />
                    <ReviewItem label="Category" value={business.category} />
                    <ReviewItem label="Phone" value={business.phone} />
                    <ReviewItem label="Email" value={business.email} />
                    <div className="sm:col-span-2">
                      <ReviewItem label="Short description" value={business.description} />
                    </div>
                  </dl>
                </ReviewSection>

                <ReviewSection
                  title="Business location"
                  icon={<MapPin className="w-4 h-4" />}
                  onEdit={() => goToStep(2)}
                >
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="sm:col-span-2">
                      <ReviewItem label="Street address" value={location.street} />
                    </div>
                    {location.additional && (
                      <div className="sm:col-span-2">
                        <ReviewItem label="Additional details" value={location.additional} />
                      </div>
                    )}
                    <ReviewItem label="City / town" value={location.city} />
                    <ReviewItem label="State / region" value={location.state} />
                    <ReviewItem label="Country" value={location.country} />
                    <ReviewItem label="Full address" value={fullAddress} />
                  </dl>
                </ReviewSection>

                <ReviewSection
                  title="Services & pricing"
                  icon={<Wrench className="w-4 h-4" />}
                  onEdit={() => goToStep(3)}
                >
                  <div className="divide-y divide-border-subtle/70">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-primary">
                            {service.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-text-muted leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <div className="sm:text-right shrink-0">
                          <p className="text-sm font-bold text-text-primary">
                            {service.price ? `£${service.price}` : 'Price pending'}
                          </p>
                          <p className="text-[11px] text-text-muted flex sm:justify-end items-center gap-1 mt-0.5">
                            <Clock3 className="w-3 h-3" />
                            {service.duration || 'Duration pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ReviewSection>

                <ReviewSection
                  title="Business photos"
                  icon={<ImageIcon className="w-4 h-4" />}
                  onEdit={() => goToStep(4)}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted mb-1.5">
                        Logo
                      </p>
                      {images.logo ? (
                        <img
                          src={images.logo.src}
                          alt="Business logo"
                          className="w-full aspect-square object-cover rounded-lg border border-border-subtle"
                        />
                      ) : (
                        <div className="w-full aspect-square rounded-lg border border-dashed border-border-subtle bg-surface-container-low flex items-center justify-center text-[10px] text-text-muted">
                          Not added
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted mb-1.5">
                        Cover
                      </p>
                      {images.cover ? (
                        <img
                          src={images.cover.src}
                          alt="Business cover"
                          className="w-full aspect-square object-cover rounded-lg border border-border-subtle"
                        />
                      ) : (
                        <div className="w-full aspect-square rounded-lg border border-dashed border-border-subtle bg-surface-container-low flex items-center justify-center text-[10px] text-text-muted">
                          Not added
                        </div>
                      )}
                    </div>
                    {images.gallery.map((image) => (
                      <div key={image.id}>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted mb-1.5">
                          Gallery
                        </p>
                        <img
                          src={image.src}
                          alt={image.name}
                          className="w-full aspect-square object-cover rounded-lg border border-border-subtle"
                        />
                      </div>
                    ))}
                  </div>
                  {images.gallery.length === 0 && (
                    <p className="mt-3 text-[11px] text-text-muted">No gallery images added.</p>
                  )}
                </ReviewSection>

                <ReviewSection
                  title="Opening hours"
                  icon={<Clock3 className="w-4 h-4" />}
                  onEdit={() => goToStep(5)}
                >
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {hours.map((day) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between gap-3 py-1.5 border-b border-border-subtle/50 last:border-0"
                      >
                        <dt className="text-xs font-semibold text-text-secondary">{day.day}</dt>
                        <dd
                          className={`text-xs ${
                            day.isClosed ? 'text-text-muted' : 'text-text-primary font-medium'
                          }`}
                        >
                          {day.isClosed
                            ? 'Closed'
                            : `${formatTime(day.open)} – ${formatTime(day.close)}`}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </ReviewSection>

                <div className="flex items-start gap-3 rounded-xl bg-teal-wash border border-primary/15 p-4">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      Ready for civic verification
                    </p>
                    <p className="mt-0.5 text-[11px] text-text-secondary leading-relaxed">
                      Submitting sends this listing to the NearNest civic integrity team for a
                      quick review. This demo does not send data to a backend — you will see a
                      local success confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border-subtle/70 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-text-primary hover:bg-surface-container-high transition-colors text-sm font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <Link
                  to="/owner"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-text-primary hover:bg-surface-container-high transition-colors text-sm font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </Link>
              )}

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2">
                {step < TOTAL_STEPS && (
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-container-low transition-colors text-sm font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Save draft
                  </button>
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-md transition-all active:scale-95"
                  >
                    Continue to {WIZARD_STEPS[step].label}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-teal-deep text-white text-sm font-semibold shadow-md transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Submit listing
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <ListingPreviewCard
            name={business.name}
            category={business.category}
            address={fullAddress}
            cover={images.cover}
            logo={images.logo}
            serviceCount={completeServices.length}
            startingPrice={startingPrice}
            hoursSummary={hoursSummary}
          />

          <LaunchChecklist items={checklistItems} />

          <div className="bg-surface-warm rounded-2xl p-5 shadow-sm border border-border-warm">
            <div className="flex items-center gap-2 text-tertiary">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-sm font-bold text-text-primary">Why we verify</h2>
            </div>
            <p className="mt-2.5 text-[11px] text-text-secondary leading-relaxed">
              Every NearNest listing is checked by our civic integrity team to prevent
              impersonation and fake businesses. A genuine local presence keeps trust strong
              across the neighbourhood.
            </p>
            <p className="mt-3 text-[10px] font-semibold text-primary">
              Verification usually completes within 24 hours.
            </p>
          </div>
        </aside>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 right-4 sm:right-6 z-[80] max-w-sm flex items-center gap-3 rounded-xl bg-text-primary text-white px-4 py-3 shadow-floating"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-teal-light shrink-0" />
          <p className="text-sm font-medium">{toast}</p>
        </div>
      )}
    </div>
  );
};

export default ListingWizardPage;
