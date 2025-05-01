// Interface for a Tour, representing a bookable safari experience
export interface Tour {
  id: number;
  title: {
    en: string;
    fr: string;
    rw: string;
  };
  description: {
    en: string;
    fr: string;
    rw: string;
  };
  price: number;
  currency: string; // e.g., "USD", "CDF"
  duration: string; // e.g., "3 days"
  location: string; // e.g., "Virunga National Park"
  images: string[]; // URLs for tour images
  included: string[]; // e.g., ["Meals", "Transport"]
  notIncluded: string[]; // e.g., ["Personal expenses"]
  category: string; // e.g., "Wildlife", "Cultural"
  rating: number; // e.g., 4.8
  reviews: number; // e.g., 120
  availableDates: string[]; // ISO dates, e.g., ["2025-06-01"]
  itinerary: {
    day: number;
    title: {
      en: string;
      fr: string;
      rw: string;
    };
    description: {
      en: string;
      fr: string;
      rw: string;
    };
  }[];
  featured: boolean;
  maxParticipants: number; // e.g., 12
  minParticipants: number; // e.g., 2
  difficulty: 'easy' | 'moderate' | 'challenging'; // Physical difficulty
  tags: string[]; // e.g., ["Gorilla Trekking", "Eco-Friendly"]
  promocode?: string; // Optional discount code
  createdAt: string; // ISO date, e.g., "2025-01-01T00:00:00Z"
  updatedAt: string; // ISO date
}

// Interface for a Testimonial, representing user reviews
export interface Testimonial {
  id: number;
  name: string;
  location: string; // e.g., "London, UK"
  rating: number; // 1 to 5
  comment: {
    en: string;
    fr: string;
    rw: string;
  };
  image?: string; // URL for user avatar
  date: string; // ISO date, e.g., "2025-02-15T00:00:00Z"
  tourId: number; // Links to associated tour
  approved: boolean; // Moderation status
  language: 'en' | 'fr' | 'rw'; // Language of original comment
}

// Interface for an FAQ, representing frequently asked questions
export interface FAQ {
  id: number;
  question: {
    en: string;
    fr: string;
    rw: string;
  };
  answer: {
    en: string;
    fr: string;
    rw: string;
  };
  category: string; // e.g., "Booking", "Safety"
  order: number; // Display order, e.g., 1 for top
  tags: string[]; // e.g., ["General", "Tour"]
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

// Interface for a Privacy Policy section
export interface PrivacySection {
  id: number;
  title: {
    en: string;
    fr: string;
    rw: string;
  };
  content: {
    en: string;
    fr: string;
    rw: string;
  };
  order: number; // Display order
  lastUpdated: string; // ISO date
}

// Interface for a User, representing a registered customer
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: 'en' | 'fr' | 'rw';
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  profileImage?: string; // URL for user avatar
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  bookingHistory: string[]; // Array of booking IDs
  loyaltyPoints: number; // e.g., 150
  lastLogin: string; // ISO date
}

// Interface for a Booking, representing a user's tour reservation
export interface Booking {
  id: string;
  userId: string;
  tourId: number;
  participants: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  tourDate: string; // ISO date, e.g., "2025-06-01"
  tourTitle?: string; // Optional title for the tour
  clientDetails: {
    name: string;
    email: string;
    phone: string;
    nationality?: string; // e.g., "UK"
    emergencyContact?: {
      name: string;
      phone: string;
    };
  };
  tourDetails: {
    title: {
      en: string;
      fr: string;
      rw: string;
    };
    date: string; // ISO date
    participants: number;
    price: number;
    duration: string;
    location: string;
    category: string;
    rating?: number;
    image: string; // Primary tour image
  };
  specialRequests?: string; // e.g., "Vegetarian meals"
  totalPrice: number;
  depositPaid: boolean;
  depositAmount?: number; // e.g., 100
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  paymentMethod?: 'credit_card' | 'bank_transfer' | 'mobile_money';
  promocode?: string; // Applied discount code
  cancellationDetails?: {
    reason: string;
    cancelledAt: string; // ISO date
    refundAmount?: number;
  };
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  bookingDate: string; // ISO date
  confirmationCode: string; // Unique code, e.g., "KVS-123456"
  analytics: {
    source: string; // e.g., "website", "mobile_app"
    bookedVia: string; // e.g., "contact_form", "tours_page"
  };
}

// Interface for a Receipt, representing a payment confirmation
export interface Receipt {
  id: string;
  bookingId: string;
  uniqueId: string; // e.g., "RCPT-789012"
  clientDetails: {
    name: string;
    email: string;
    phone: string;
    nationality?: string;
  };
  tourDetails: {
    title: {
      en: string;
      fr: string;
      rw: string;
    };
    date: string; // ISO date
    participants: number;
    price: number; // Total price
    image: string; // Primary tour image
  };
  paymentDetails: {
    total: number;
    deposit: number;
    balance: number;
    currency: string; // e.g., "USD"
    method: 'credit_card' | 'bank_transfer' | 'mobile_money';
    transactionId: string; // e.g., "TXN-456789"
    paidAt: string; // ISO date
  };
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  promocode?: string; // Applied discount code
  taxDetails?: {
    amount: number;
    rate: number; // e.g., 0.16 for 16%
    description: string; // e.g., "VAT"
  };
}