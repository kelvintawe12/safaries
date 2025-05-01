
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
  category: string;
}

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
  currency: string;
  image: string;
  images: string[];
  durationDays: number;
  duration: string;
  category: string;
  difficulty: string;
  featured: boolean;
  tags: string[];
  promocode?: string;
  reviews: any[];
  rating: number;
  minParticipants: number;
  location: string;
  highlights: string[];
  availableDates: string[]; // ISO dates
  maxParticipants: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

// Add new TourDetails interface and update Booking interface to use it

export interface TourDetails {
  title: {
    en: string;
    fr: string;
    rw: string;
  };
  date: string; // ISO date
  participants: number;
  price: number;
  image: string; // Primary tour image
  specialRequests?: string; // Optional special requests
}

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
  tourDetails: TourDetails;
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
