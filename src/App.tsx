import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Tours } from './pages/Tours';
import { TourDetail } from './pages/TourDetail';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';
import FloatingButtons from './components/common/FloatingButtons';
import WelcomePopup from './components/common/WelcomePopup';
import { Rules } from './pages/Rules';
import MyBookings from './pages/MyBookings';
import RegisterForm from './components/forms/RegisterForm';
import BookingForm from './components/forms/BookingForm';
import BookingEntry from './pages/BookingEntry';
import { Gallery } from './pages/Gallery';
import { tours } from './data/tours';
import { Tour } from './types';

export function App() {
  const handleBookingSubmit = async (data: {
    tourId: number;
    clientDetails: { name: string; email: string; phone?: string; country?: string };
    participants: number;
    date: string;
  }) => {
    try {
      // Simulated API call
      console.log('Booking submitted:', data);
      return Promise.resolve();
    } catch (error) {
      console.error('Booking failed:', error);
      return Promise.reject(error);
    }
  };

  return (
    <LanguageProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <div className="flex flex-col min-h-screen bg-white overflow-x-hidden max-w-full">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking-entry" element={<BookingEntry />} />
              <Route
                path="/booking"
                element={<BookingForm tours={tours} onSubmit={handleBookingSubmit} />}
              />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/about" element={<About />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingButtons />
          <WelcomePopup />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}