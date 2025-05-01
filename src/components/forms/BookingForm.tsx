// BookingForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '../../utils/validation';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { Tour } from '../../types';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  UsersIcon,
  BanknoteIcon,
  MessageCircleIcon,
  TagIcon,
  StarIcon,
} from 'lucide-react';

interface BookingFormProps {
  tours: Tour[];
  onSubmit: (data: any) => Promise<void>;
}

interface FormData {
  tourId: number;
  participants: number;
  tourDate: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash';
  specialRequests?: string;
  depositPaid: boolean;
  promocode?: string;
}

// Toast Notification Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-2xl animate-slide-up flex items-center max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
      role="alert"
      aria-live="polite"
    >
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 text-white hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export const BookingForm = ({ tours, onSubmit }: BookingFormProps) => {
  const { t, language } = useLanguage();
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);
  const [promocodeStatus, setPromocodeStatus] = useState<'valid' | 'invalid' | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: 1,
      depositPaid: false,
    },
  });

  const selectedTourId = watch('tourId');
  const participants = watch('participants') || 1;
  const promocode = watch('promocode');
  const selectedTour = tours.find((tour) => tour.id === Number(selectedTourId));

  // Calculate pricing
  const basePrice = selectedTour ? selectedTour.price * participants : 0;
  const discount = selectedTour && promocode === selectedTour.promocode ? basePrice * 0.1 : 0; // 10% discount
  const taxRate = 0.16; // 16% VAT
  const taxAmount = (basePrice - discount) * taxRate;
  const totalPrice = basePrice - discount + taxAmount;
  const depositAmount = totalPrice * 0.5;

  // Validate promocode
  useEffect(() => {
    if (promocode && selectedTour) {
      setPromocodeStatus(promocode === selectedTour.promocode ? 'valid' : 'invalid');
    } else {
      setPromocodeStatus(null);
    }
  }, [promocode, selectedTour]);

  // Reset tour date if tour changes
  useEffect(() => {
    setValue('tourDate', '');
  }, [selectedTourId, setValue]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit({
        ...data,
        totalPrice,
        depositAmount,
        promocode: promocodeStatus === 'valid' ? promocode : undefined,
      });
      setToast({ show: true, message: t('booking.success'), type: 'success' });
    } catch (error) {
      setToast({ show: true, message: t('booking.error'), type: 'error' });
    }
  };

  return (
    <div className="relative bg-gray-100 py-12">
      {/* Sticky Need Help Button */}
      <Link to="/contact">
        <button
          className="fixed bottom-6 right-6 bg-coral-500 text-white p-4 rounded-full shadow-lg hover:bg-coral-600 transform hover:scale-110 transition-all duration-300 z-50 animate-slide-up"
          aria-label="Need help"
        >
          <MessageCircleIcon className="h-6 w-6" />
        </button>
      </Link>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-slide-up">
          {t('booking.title')}
        </h2>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl animate-slide-up">
          {/* Tour Preview */}
          {selectedTour && (
            <div className="mb-8 p-6 bg-gradient-to-r from-teal-50 to-coral-50 rounded-xl animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedTour.images[0]}
                  alt={selectedTour.title[language]}
                  className="w-full md:w-1/3 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {selectedTour.title[language]}
                  </h3>
                  <p className="text-gray-600 mb-4">{selectedTour.description[language]}</p>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < (selectedTour.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({selectedTour.reviews || 0} {t('booking.reviews')})
                    </span>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold">{t('booking.location')}:</span>{' '}
                    {selectedTour.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">{t('booking.duration')}:</span>{' '}
                    {selectedTour.duration}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tour Selection */}
              <div className="col-span-2 relative group">
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                    errors.tourId ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.selectTour')} *
                </label>
                <select
                  {...register('tourId', { valueAsNumber: true })}
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                    errors.tourId ? 'border-red-500' : 'border-gray-300 group-hover:border-teal-300'
                  }`}
                  aria-describedby="tourId-error"
                >
                  <option value="">{t('booking.selectTourPlaceholder')}</option>
                  {tours.map((tour) => (
                    <option key={tour.id} value={tour.id}>
                      {tour.title[language]} - {tour.currency} {tour.price}
                    </option>
                  ))}
                </select>
                {errors.tourId && typeof errors.tourId.message === 'string' && (
                  <p id="tourId-error" className="mt-1 text-sm text-red-600 animate-shake">
                    {errors.tourId.message}
                  </p>
                )}
              </div>

              {/* Number of Participants */}
              <div className="relative group">
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                    errors.participants ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.participants')} *
                </label>
                <div className="relative">
                  <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min={selectedTour?.minParticipants || 1}
                    max={selectedTour?.maxParticipants || 20}
                    {...register('participants', { valueAsNumber: true })}
                    className={`pl-10 w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                      errors.participants ? 'border-red-500' : 'border-gray-300 group-hover:border-teal-300'
                    }`}
                    aria-describedby="participants-error"
                  />
                </div>
                {errors.participants && typeof errors.participants.message === 'string' && (
                  <p id="participants-error" className="mt-1 text-sm text-red-600 animate-shake">
                    {errors.participants.message}
                  </p>
                )}
              </div>

              {/* Tour Date */}
              <div className="relative group">
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                    errors.tourDate ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.tourDate')} *
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    {...register('tourDate')}
                    className={`pl-10 w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                      errors.tourDate ? 'border-red-500' : 'border-gray-300 group-hover:border-teal-300'
                    }`}
                    aria-describedby="tourDate-error"
                    disabled={!selectedTour}
                  >
                    <option value="">{t('booking.selectDatePlaceholder')}</option>
                    {selectedTour?.availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString(language)}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.tourDate && typeof errors.tourDate.message === 'string' && (
                  <p id="tourDate-error" className="mt-1 text-sm text-red-600 animate-shake">
                    {errors.tourDate.message}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div className="relative group">
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                    errors.paymentMethod ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.paymentMethod')} *
                </label>
                <div className="relative">
                  <BanknoteIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    {...register('paymentMethod')}
                    className={`pl-10 w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                      errors.paymentMethod ? 'border-red-500' : 'border-gray-300 group-hover:border-teal-300'
                    }`}
                    aria-describedby="paymentMethod-error"
                  >
                    <option value="">{t('booking.selectPaymentMethod')}</option>
                    <option value="credit_card">{t('booking.creditCard')}</option>
                    <option value="bank_transfer">{t('booking.bankTransfer')}</option>
                    <option value="cash">{t('booking.cash')}</option>
                  </select>
                </div>
                {errors.paymentMethod && typeof errors.paymentMethod.message === 'string' && (
                  <p id="paymentMethod-error" className="mt-1 text-sm text-red-600 animate-shake">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              {/* Promocode */}
              <div className="relative group">
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                    promocodeStatus === 'invalid' ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.promocode')}
                </label>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('promocode')}
                    className={`pl-10 w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                      promocodeStatus === 'invalid'
                        ? 'border-red-500'
                        : promocodeStatus === 'valid'
                        ? 'border-green-500'
                        : 'border-gray-300 group-hover:border-teal-300'
                    }`}
                    placeholder={t('booking.promocodePlaceholder')}
                    aria-describedby="promocode-error"
                  />
                </div>
                {promocodeStatus === 'invalid' && (
                  <p id="promocode-error" className="mt-1 text-sm text-red-600 animate-shake">
                    {t('booking.invalidPromocode')}
                  </p>
                )}
                {promocodeStatus === 'valid' && (
                  <p id="promocode-success" className="mt-1 text-sm text-green-600 animate-fade-in">
                    {t('booking.validPromocode')}
                  </p>
                )}
              </div>

              {/* Special Requests */}
              <div className="col-span-2 relative group">
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500`}
                >
                  {t('booking.specialRequests')}
                </label>
                <textarea
                  {...register('specialRequests')}
                  rows={4}
                  className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 border-gray-300 group-hover:border-teal-300"
                  placeholder={t('booking.specialRequestsPlaceholder')}
                />
              </div>

              {/* Price Summary */}
              <div className="col-span-2 bg-gradient-to-r from-teal-50 to-coral-50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4 text-gray-800">
                  {t('booking.priceSummary')}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    {t('booking.tourPrice')}: {selectedTour?.currency || ''}{' '}
                    {selectedTour?.price || 0} × {participants} {t('booking.participants')}
                  </p>
                  {discount > 0 && (
                    <p className="text-green-600">
                      {t('booking.discount')}: -{selectedTour?.currency || ''} {discount.toFixed(2)} (10%)
                    </p>
                  )}
                  <p>
                    {t('booking.tax')}: {selectedTour?.currency || ''} {taxAmount.toFixed(2)} (16% VAT)
                  </p>
                  <p className="text-xl font-bold text-teal-700">
                    {t('booking.total')}: {selectedTour?.currency || ''} {totalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    {t('booking.depositRequired')}: {selectedTour?.currency || ''} {depositAmount.toFixed(2)} (50%)
                  </p>
                </div>
              </div>

              {/* Deposit Confirmation */}
              <div className="col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('depositPaid')}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    aria-describedby="depositPaid-error"
                  />
                  <span className="text-sm text-gray-700">
                    {`${t('booking.depositConfirmation')} ${selectedTour?.currency} ${depositAmount.toFixed(2)}`}
                  </span>
                </label>
                {errors.depositPaid && typeof errors.depositPaid.message === 'string' && (
                  <p id="depositPaid-error" className="mt-1 text-sm text-red-600 animate-shake">
                    {errors.depositPaid.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-teal-600 text-white hover:bg-teal-700 transform hover:scale-105 transition-transform duration-300"
                aria-label={t('booking.confirmBooking')}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t('booking.processing')}
                  </>
                ) : (
                  t('booking.confirmBooking')
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast?.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default BookingForm;