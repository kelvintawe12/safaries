// src/types/index.ts

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
  reviews: any[]; // Adjust type if review structure is known
  rating: number;
  minParticipants: number;
  location: string;
  highlights: string[];
  availableDates: string[];
  maxParticipants: number;
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    description: {
      en: string;
      fr: string;
      rw: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
}

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
}

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
}

export interface Testimonial {
  id: number;
  name: string;
  text: {
    en: string;
    fr: string;
    rw: string;
  };
  rating: number;
}

export interface Booking {
  id: number;
  tourId: number;
  participants: number;
  date: string;
  clientDetails: ClientDetails;
  status: string;
  createdAt: string;
}

export interface ClientDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
}

export interface Receipt {
  bookingId: number;
  amount: number;
  currency: string;
  date: string;
  paymentMethod: string;
}

export interface TourDetails {
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
}