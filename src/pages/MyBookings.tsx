import React, { useState, createElement } from 'react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { LoadingState } from '../components/common/LoadingState';
import { generateReceipt } from '../utils/receipt';
import { DownloadIcon, FileTextIcon } from 'lucide-react';
import type { Booking, Receipt } from '../types';
import { FloatingButton } from '../components/common/FloatingButton';

export const MyBookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Mock bookings data - in a real app, this would come from an API
  const bookings: Booking[] = [];
  const handleDownloadReceipt = async (booking: Booking) => {
    try {
      setIsLoading(true);
      const receipt: Receipt = {
        id: `rec_${booking.id}`,
        bookingId: booking.id,
        uniqueId: `${booking.userId}-${new Date(booking.createdAt).getTime()}-${new Date(booking.createdAt).toLocaleString('en-US', {
          weekday: 'short'
        })}`,
        clientDetails: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+243123456789'
        },
        tourDetails: {
          title: 'Lake Kivu Experience',
          date: booking.tourDate,
          participants: booking.participants,
          price: booking.totalPrice
        },
        createdAt: booking.createdAt
      };
      const pdfBlob = await generateReceipt(receipt);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kivu-safaris-receipt-${receipt.uniqueId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate receipt:', error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingState message="Generating receipt..." />;
  }
  return <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Bookings</h1>
          <p className="max-w-2xl mx-auto text-lg">
            View and manage your tour bookings
          </p>
        </div>
      </section>
      {/* Bookings List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {bookings.length === 0 ? <div className="text-center py-12">
              <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't made any bookings yet. Start exploring our tours to
                plan your adventure!
              </p>
              <Link to="/tours" className="inline-block bg-coral-500 text-white px-4 py-2 rounded hover:bg-coral-600 transition-colors">
                Browse Tours
              </Link>
            </div> : <div className="space-y-6">
              {bookings.map(booking => <div key={booking.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Lake Kivu Experience{' '}
                          {/* This would come from tour data */}
                        </h3>
                        <div className="space-y-1 text-gray-600">
                          <p>
                            Date:{' '}
                            {new Date(booking.tourDate).toLocaleDateString()}
                          </p>
                          <p>Participants: {booking.participants}</p>
                          <p>Total Price: ${booking.totalPrice}</p>
                          <p className="text-sm">Booking ID: {booking.id}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button onClick={() => handleDownloadReceipt(booking)} variant="outline">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Download Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>}
        </div>
      </section>
      <FloatingButton />
    </div>;
};