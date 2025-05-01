import React, { useState } from 'react';
import { RegisterForm } from '../components/forms/RegisterForm';
import { BookingForm } from '../components/forms/BookingForm';
import { generateReceipt } from '../utils/receipt';
import { LoadingState } from '../components/common/LoadingState';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';
import type { Booking, Receipt } from '../types';

export const BookingEntry = () => {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const handleRegisterSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTourSelect = (tourId: number) => {
    setSelectedTourId(tourId);
  };

  const handleBookingSubmit = async (data: any) => {
    if (selectedTourId === null) return;
    setIsLoading(true);
    try {
      // Simulate booking API call
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+243123456789'
        },
        tourDetails: {
          title: tours.find((t: any) => t.id === data.tourId)?.title || '',
          date: String(data.tourDate),
          participants: data.participants,
          price: tours.find((t: any) => t.id === data.tourId)?.price || 0
        },
        createdAt: new Date().toISOString()
      });
      const url = URL.createObjectURL(receiptBlob);
      setReceiptUrl(url);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Processing..." />;
  }

  if (!registrationComplete) {
    return (
      <div className="container mx-auto p-4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <RegisterForm onSubmit={handleRegisterSubmit} />
      </div>
    );
  }

  if (!bookingComplete) {
    return (
      <div className="container mx-auto p-4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Book a Tour</h2>
        <BookingForm tours={tours} onSubmit={handleBookingSubmit} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
      <p className="mb-4">Thank you for your booking! Your receipt is ready.</p>
      {receiptUrl && (
        <a
          href={receiptUrl}
          download="kivu-safaris-receipt.pdf"
          className="inline-block bg-coral-500 text-white px-4 py-2 rounded hover:bg-coral-600 transition-colors"
        >
          Download Receipt
        </a>
      )}
      <div className="mt-6">
        <Link to="/my-bookings" className="text-teal-700 hover:underline">
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingEntry;
