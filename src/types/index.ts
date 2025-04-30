export interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  featured?: boolean;
}
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
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
  category: string;
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
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: 'en' | 'fr' | 'rw';
  createdAt: string;
}
export interface Booking {
  id: string;
  userId: string;
  tourId: number;
  participants: number;
  tourDate: string;
  specialRequests?: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash';
  totalPrice: number;
  depositPaid: boolean;
  createdAt: string;
}
export interface Receipt {
  id: string;
  bookingId: string;
  uniqueId: string;
  clientDetails: {
    name: string;
    email: string;
    phone: string;
  };
  tourDetails: {
    title: string;
    date: string;
    participants: number;
    price: number;
  };
  createdAt: string;
}