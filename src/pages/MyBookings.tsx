// MyBookings.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { LoadingState } from '../components/common/LoadingState';
import { generateReceipt } from '../utils/receipt';
import { DownloadIcon, FileTextIcon, XCircleIcon, EyeIcon } from 'lucide-react';
import { FloatingButton } from '../components/common/FloatingButton';
import type { Booking, Receipt, TourDetails } from '../types';

// Simulated API for bookings
const fetchBookings = async (userId: string): Promise<Booking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return JSON.parse(localStorage.getItem('bookings') || '[]').filter(
    (booking: Booking) => booking.userId === userId
  );
};

const cancelBooking = async (bookingId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const updatedBookings = bookings.map((b: Booking) =>
    b.id === bookingId ? { ...b, status: 'cancelled' } : b
  );
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
};

// Error Toast Component
const ErrorToast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-slide-up flex items-center">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-white hover:text-gray-200"
        aria-label="Close error message"
      >
        ×
      </button>
    </div>
  );
};

// Booking Details Modal
const BookingDetailsModal = ({
  booking,
  onClose,
  onDownloadReceipt,
  onCancel,
}: {
  booking: Booking;
  onClose: () => void;
  onDownloadReceipt: (booking: Booking) => void;
  onCancel: (bookingId: string) => void;
}) => {
  const tour = booking.tourDetails || { title: booking.tourTitle || 'Unknown Tour' };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        className="bg-white rounded-lg p-8 max-w-lg w-full animate-slide-up-bounce shadow-2xl"
        role="dialog"
        aria-labelledby="booking-details-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close booking details"
        >
          <XCircleIcon className="h-6 w-6" />
        </button>
        <h2 id="booking-details-title" className="text-2xl font-bold text-gray-800 mb-6">
          Booking Details
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>Tour:</strong> {typeof tour.title === 'string' ? tour.title : tour.title.en}
          </p>
          <p>
            <strong>Date:</strong> {new Date(booking.tourDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Participants:</strong> {booking.participants}
          </p>
          <p>
            <strong>Total Price:</strong> ${booking.totalPrice}
          </p>
          <p>
            <strong>Payment Method:</strong>{' '}
            {(booking.paymentMethod ?? 'unknown').replace('_', ' ').toUpperCase()}
          </p>
          <p>
            <strong>Deposit Paid:</strong> {booking.depositPaid ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`inline-block px-2 py-1 rounded-full text-sm ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {booking.status || 'Pending'}
            </span>
          </p>
          <p>
            <strong>Client:</strong> {booking.clientDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {booking.clientDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {booking.clientDetails.phone}
          </p>
          {booking.specialRequests && (
            <p>
              <strong>Special Requests:</strong> {booking.specialRequests}
            </p>
          )}
          <p>
            <strong>Booking ID:</strong> {booking.id}
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={() => onDownloadReceipt(booking)}
            variant="outline"
            className="flex-1"
            aria-label="Download receipt"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          {booking.status !== 'cancelled' && (
            <Button
              onClick={() => onCancel(booking.id)}
              variant="primary"
              className="flex-1"
              aria-label="Cancel booking"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main MyBookings Component
/**
 * Displays and manages user bookings
 */
const MyBookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const bookingsPerPage = 5;

  // Fetch bookings
  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedBookings = await fetchBookings('1'); // Hardcoded userId for demo
      setBookings(fetchedBookings);
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Handle receipt download
  const handleDownloadReceipt = async (booking: Booking) => {
    try {
      setIsLoading(true);
      const receipt: Receipt = {
        id: `rec_${booking.id}`,
        bookingId: booking.id,
        uniqueId: `${booking.userId}-${new Date(booking.createdAt).getTime()}-${new Date(
          booking.createdAt
        ).toLocaleString('en-US', { weekday: 'short' })}`,
        clientDetails: booking.clientDetails,
        tourDetails: {
          title: typeof booking.tourTitle === 'string'
            ? { en: booking.tourTitle, fr: booking.tourTitle, rw: booking.tourTitle }
            : booking.tourDetails?.title || { en: 'Unknown Tour', fr: 'Unknown Tour', rw: 'Unknown Tour' },
          date: booking.tourDate,
          participants: booking.participants,
          price: booking.totalPrice,
          image: booking.tourDetails?.image || '',
        },
        paymentDetails: {
          total: booking.totalPrice,
          deposit: booking.depositAmount || 0,
          balance: booking.totalPrice - (booking.depositAmount || 0),
          currency: 'USD',
          method: booking.paymentMethod || 'credit_card',
          transactionId: '', // No transactionId available in booking, left empty
          paidAt: booking.updatedAt || booking.createdAt,
        },
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt || booking.createdAt,
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
      setError('Failed to generate receipt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId: string) => {
    try {
      setIsLoading(true);
      await cancelBooking(bookingId);
      await loadBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sorting and filtering
  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.tourDate).getTime() - new Date(b.tourDate).getTime()
        : new Date(b.tourDate).getTime() - new Date(a.tourDate).getTime();
    } else if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    } else {
      const titleA = a.tourTitle || a.tourDetails?.title || '';
      const titleB = b.tourTitle || b.tourDetails?.title || '';
      const titleAString = typeof titleA === 'string' ? titleA : titleA.en;
      const titleBString = typeof titleB === 'string' ? titleB : titleB.en;
      return sortOrder === 'asc' ? titleAString.localeCompare(titleBString) : titleBString.localeCompare(titleAString);
    }
  });

  const filteredBookings = sortedBookings.filter(
    (booking) => filterStatus === 'all' || booking.status === filterStatus
  );

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  if (isLoading) {
    return <LoadingState message="Loading bookings..." />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">My Bookings</h1>
          <p className="max-w-2xl mx-auto text-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
            View, manage, and download receipts for your tour bookings
          </p>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <label htmlFor="sortBy" className="text-sm font-medium text-gray-700 mr-2">
                  Sort by:
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'title')}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Sort bookings by"
                >
                  <option value="date">Date</option>
                  <option value="price">Price</option>
                  <option value="title">Tour Title</option>
                </select>
              </div>
              <div>
                <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700 mr-2">
                  Order:
                </label>
                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Sort order"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="filterStatus" className="text-sm font-medium text-gray-700 mr-2">
                Filter by status:
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as 'all' | 'confirmed' | 'pending' | 'cancelled')
                }
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Filter bookings by status"
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 animate-slide-up">
              <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
              <p className="text-gray-600 mb-4">
                {filterStatus === 'all'
                  ? "You haven't made any bookings yet."
                  : `No bookings found with status "${filterStatus}".`}{' '}
                Start exploring our tours to plan your adventure!
              </p>
              <Link
                to="/tours"
                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 duration-200"
                aria-label="Browse tours"
              >
                Browse Tours
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {typeof booking.tourDetails?.title === 'string'
                            ? booking.tourDetails.title
                            : booking.tourDetails?.title?.en || booking.tourTitle || 'Unknown Tour'}
                        </h3>
                        <div className="space-y-1 text-gray-600">
                          <p>
                            <strong>Date:</strong>{' '}
                            {new Date(booking.tourDate).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Participants:</strong> {booking.participants}
                          </p>
                          <p>
                            <strong>Total Price:</strong> ${booking.totalPrice}
                          </p>
                          <p>
                            <strong>Status:</strong>{' '}
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-sm ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {booking.status || 'Pending'}
                            </span>
                          </p>
                          <p className="text-sm">
                            <strong>Booking ID:</strong> {booking.id}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex space-x-4">
                        <Button
                          onClick={() => setSelectedBooking(booking)}
                          variant="outline"
                          aria-label={`View details for ${booking.tourTitle || 'tour'}`}
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          onClick={() => handleDownloadReceipt(booking)}
                          variant="outline"
                          aria-label="Download receipt"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Download Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                aria-label="Previous page"
              >
                Previous
              </Button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                aria-label="Next page"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Floating Button */}
      <FloatingButton />

      {/* Error Toast */}
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onDownloadReceipt={handleDownloadReceipt}
          onCancel={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default MyBookings;