import { useState, useEffect, useCallback } from 'react';
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
  InfoIcon,
  Loader2Icon,
  SearchIcon,
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
      className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-2xl animate-slide-in flex items-center max-w-sm ${
        type === 'success' ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'
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
  const [tourSearch, setTourSearch] = useState('');
  const [filteredTours, setFilteredTours] = useState(tours);
  const [isPriceSummaryOpen, setIsPriceSummaryOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
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

  // Filter tours based on search
  useEffect(() => {
    const filtered = tours.filter(
      (tour) =>
        tour.title[language].toLowerCase().includes(tourSearch.toLowerCase()) ||
        tour.location.toLowerCase().includes(tourSearch.toLowerCase())
    );
    setFilteredTours(filtered);
  }, [tourSearch, tours, language]);

  // Calculate pricing
  const basePrice = selectedTour ? selectedTour.price * participants : 0;
  const discount = selectedTour && promocodeStatus === 'valid' ? basePrice * 0.1 : 0; // 10% discount
  const taxRate = 0.16; // 16% VAT
  const taxAmount = (basePrice - discount) * taxRate;
  const totalPrice = basePrice - discount + taxAmount;
  const depositAmount = totalPrice * 0.5;

  // Validate promocode
  const verifyPromocode = useCallback(() => {
    if (promocode && selectedTour) {
      const isValid = promocode === selectedTour.promocode;
      setPromocodeStatus(isValid ? 'valid' : 'invalid');
      console.log(`Analytics: Promocode verified - ${isValid ? 'valid' : 'invalid'}`, { promocode });
    } else {
      setPromocodeStatus(null);
    }
  }, [promocode, selectedTour]);

  // Reset tour date and promocode on tour change
  useEffect(() => {
    setValue('tourDate', '');
    setValue('promocode', '');
    setPromocodeStatus(null);
  }, [selectedTourId, setValue]);

  // Track field interactions
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        console.log(`Analytics: Field interacted - ${name}`, value[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit({
        ...data,
        totalPrice,
        depositAmount,
        promocode: promocodeStatus === 'valid' ? promocode : undefined,
      });
      setToast({ show: true, message: t('booking.success'), type: 'success' });
      reset();
      setTourSearch('');
      setPromocodeStatus(null);
    } catch (error) {
      setToast({ show: true, message: t('booking.error'), type: 'error' });
    }
  };

  return (
    <div className="relative bg-gray-100 py-10 sm:py-16">
      {/* Sticky Need Help Button */}
      <Link to="/contact">
        <button
          className="fixed bottom-6 right-6 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transform hover:scale-110 transition-all duration-300 z-50 animate-slide-in"
          aria-label="Need help"
        >
          <MessageCircleIcon className="h-6 w-6" />
        </button>
      </Link>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-10 sm:mb-12 animate-slide-in">
          {t('booking.title')}
        </h2>

        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-xl animate-slide-in">
          {/* Tour Preview */}
          {selectedTour && (
            <div className="mb-8 sm:mb-10 p-6 sm:p-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <img
                  src={selectedTour.images[0]}
                  alt={selectedTour.title[language]}
                  className="w-full sm:w-1/3 h-48 sm:h-64 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    {selectedTour.title[language]}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{selectedTour.description[language]}</p>
                  <div className="flex items-center mb-3 sm:mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < (selectedTour.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600 text-sm sm:text-base">
                      ({selectedTour.reviews || 0} {t('booking.reviews')})
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <span className="font-semibold">{t('booking.location')}:</span>{' '}
                    {selectedTour.location}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <span className="font-semibold">{t('booking.duration')}:</span>{' '}
                    {selectedTour.duration}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 sm:space-y-10">
            {/* Tour Search */}
            <div className="col-span-2 relative group mb-6 sm:mb-8">
              <label
                htmlFor="tourSearch"
                className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3"
              >
                {t('booking.searchTours')}
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                <input
                  id="tourSearch"
                  type="text"
                  value={tourSearch}
                  onChange={(e) => setTourSearch(e.target.value)}
                  placeholder={t('booking.searchToursPlaceholder')}
                  className="pl-12 sm:pl-14 w-full p-4 sm:p-5 h-12 sm:h-14 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 border-gray-300 hover:border-teal-300 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {/* Tour Selection */}
              <div className="col-span-2 lg:col-span-3 relative group">
                <label
                  htmlFor="tourId"
                  className={`absolute left-4 -top-3 sm:-top-3.5 px-2 bg-white text-sm sm:text-base font-semibold text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 sm:peer-focus:-top-3.5 peer-focus:text-teal-500 ${
                    errors.tourId ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.selectTour')} *
                </label>
                <select
                  id="tourId"
                  {...register('tourId', { valueAsNumber: true })}
                  className={`w-full p-4 sm:p-5 h-12 sm:h-14 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 peer transition-all duration-300 ${
                    errors.tourId ? 'border-red-500 animate-shake' : 'border-gray-300 hover:border-teal-300'
                  }`}
                  aria-invalid={!!errors.tourId}
                  aria-describedby={errors.tourId ? 'tourId-error' : undefined}
                >
                  <option value="">{t('booking.selectTourPlaceholder')}</option>
                  {filteredTours.map((tour) => (
                    <option key={tour.id} value={tour.id}>
                      {tour.title[language]} - {tour.currency} {tour.price}
                    </option>
                  ))}
                </select>
                {errors.tourId && typeof errors.tourId.message === 'string' && (
                  <p id="tourId-error" className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 animate-shake max-w-full">
                    {errors.tourId.message}
                  </p>
                )}
              </div>

              {/* Number of Participants */}
              <div className="relative group">
                <label
                  htmlFor="participants"
                  className={`absolute left-4 -top-3 sm:-top-3.5 px-2 bg-white text-sm sm:text-base font-semibold text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 sm:peer-focus:-top-3.5 peer-focus:text-teal-500 ${
                    errors.participants ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.participants')} *
                </label>
                <div className="relative">
                  <UsersIcon className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  <input
                    id="participants"
                    type="range"
                    min={selectedTour?.minParticipants || 1}
                    max={selectedTour?.maxParticipants || 20}
                    step={1}
                    {...register('participants', { valueAsNumber: true })}
                    className={`pl-12 sm:pl-14 w-full h-12 sm:h-14 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 peer transition-all duration-300 ${
                      errors.participants ? 'border-red-500 animate-shake' : 'border-gray-300 hover:border-teal-300'
                    }`}
                    aria-invalid={!!errors.participants}
                    aria-describedby={errors.participants ? 'participants-error' : undefined}
                  />
                  <span className="absolute right-4 sm:right-5 top-4 sm:top-5 text-sm sm:text-base text-gray-600 w-12 text-right">
                    {participants}
                  </span>
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                  {t('booking.participantsRange', {
                    min: String(selectedTour?.minParticipants || 1),
                    max: String(selectedTour?.maxParticipants || 20),
                  })}
                </p>
                {errors.participants && typeof errors.participants.message === 'string' && (
                  <p id="participants-error" className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 animate-shake max-w-full">
                    {errors.participants.message}
                  </p>
                )}
              </div>

              {/* Tour Date */}
              <div className="relative group">
                <label
                  htmlFor="tourDate"
                  className={`absolute left-4 -top-3 sm:-top-3.5 px-2 bg-white text-sm sm:text-base font-semibold text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 sm:peer-focus:-top-3.5 peer-focus:text-teal-500 ${
                    errors.tourDate ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.tourDate')} *
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  <input
                    id="tourDate"
                    type="date"
                    {...register('tourDate')}
                    className={`pl-12 sm:pl-14 w-full p-4 sm:p-5 h-12 sm:h-14 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 peer transition-all duration-300 ${
                      errors.tourDate ? 'border-red-500 animate-shake' : 'border-gray-300 hover:border-teal-300'
                    }`}
                    min={selectedTour?.availableDates[0]}
                    max={selectedTour?.availableDates[selectedTour.availableDates.length - 1]}
                    disabled={!selectedTour}
                    aria-invalid={!!errors.tourDate}
                    aria-describedby={errors.tourDate ? 'tourDate-error' : undefined}
                  />
                </div>
                {errors.tourDate && typeof errors.tourDate.message === 'string' && (
                  <p id="tourDate-error" className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 animate-shake max-w-full">
                    {errors.tourDate.message}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div className="relative group">
                <label
                  htmlFor="paymentMethod"
                  className={`absolute left-4 -top-3 sm:-top-3.5 px-2 bg-white text-sm sm:text-base font-semibold text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 sm:peer-focus:-top-3.5 peer-focus:text-teal-500 ${
                    errors.paymentMethod ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.paymentMethod')} *
                </label>
                <div className="relative">
                  <BanknoteIcon className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  <select
                    id="paymentMethod"
                    {...register('paymentMethod')}
                    className={`pl-12 sm:pl-14 w-full p-4 sm:p-5 h-12 sm:h-14 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 peer transition-all duration-300 ${
                      errors.paymentMethod ? 'border-red-500 animate-shake' : 'border-gray-300 hover:border-teal-300'
                    }`}
                    aria-invalid={!!errors.paymentMethod}
                    aria-describedby={errors.paymentMethod ? 'paymentMethod-error' : undefined}
                  >
                    <option value="">{t('booking.selectPaymentMethod')}</option>
                    <option value="credit_card">{t('booking.creditCard')}</option>
                    <option value="bank_transfer">{t('booking.bankTransfer')}</option>
                    <option value="cash">{t('booking.cash')}</option>
                  </select>
                </div>
                {errors.paymentMethod && typeof errors.paymentMethod.message === 'string' && (
                  <p id="paymentMethod-error" className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 animate-shake max-w-full">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              {/* Promocode */}
              <div className="relative group">
                <label
                  htmlFor="promocode"
                  className={`absolute left-4 -top-3 sm:-top-3.5 px-2 bg-white text-sm sm:text-base font-semibold text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 sm:peer-focus:-top-3.5 peer-focus:text-teal-500 ${
                    promocodeStatus === 'invalid' ? 'text-red-500' : ''
                  }`}
                >
                  {t('booking.promocode')}
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <TagIcon className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    <input
                      id="promocode"
                      type="text"
                      {...register('promocode')}
                      className={`pl-12 sm:pl-14 w-full p-4 sm:p-5 h-12 sm:h-14 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 peer transition-all duration-300 ${
                        promocodeStatus === 'invalid'
                          ? 'border-red-500 animate-shake'
                          : promocodeStatus === 'valid'
                          ? 'border-teal-500'
                          : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder={t('booking.promocodePlaceholder')}
                      aria-invalid={promocodeStatus === 'invalid'}
                      aria-describedby={
                        promocodeStatus === 'invalid'
                          ? 'promocode-error'
                          : promocodeStatus === 'valid'
                          ? 'promocode-success'
                          : undefined
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={verifyPromocode}
                    className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base transform hover:scale-105 transition-transform duration-300"
                    disabled={!promocode || !selectedTour}
                    aria-label="Verify promocode"
                  >
                    {t('booking.verify')}
                  </Button>
                </div>
                {promocodeStatus === 'invalid' && (
                  <p id="promocode-error" className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 animate-shake max-w-full" aria-live="polite">
                    {t('booking.invalidPromocode')}
                  </p>
                )}
                {promocodeStatus === 'valid' && (
                  <p id="promocode-success" className="mt-3 sm:mt-4 text-xs sm:text-sm text-teal-600 animate-fade-in max-w-full" aria-live="polite">
                    {t('booking.validPromocode')}
                  </p>
                )}
              </div>

              {/* Special Requests */}
              <div className="col-span-2 lg:col-span-3 relative group mt-6 sm:mt-8">
                <label
                  htmlFor="specialRequests"
                  className="absolute left-4 -top-3 sm:-top-3.5 px-2 bg-white text-sm sm:text-base font-semibold text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 sm:peer-focus:-top-3.5 peer-focus:text-teal-500"
                >
                  {t('booking.specialRequests')}
                </label>
                <textarea
                  id="specialRequests"
                  {...register('specialRequests')}
                  rows={4}
                  className="w-full p-4 sm:p-5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 peer transition-all duration-300 border-gray-300 hover:border-teal-300"
                  placeholder={t('booking.specialRequestsPlaceholder')}
                />
              </div>

              {/* Price Summary */}
              <div className="col-span-2 lg:col-span-3 mt-6 sm:mt-8">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 sm:p-8 rounded-xl md:sticky md:top-4">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                        {t('booking.priceSummary')}
                      </h3>
                      <div className="group relative">
                        <InfoIcon className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 cursor-pointer" />
                        <div className="absolute hidden group-hover:block w-64 sm:w-80 p-3 sm:p-4 bg-white shadow-lg rounded-lg text-sm sm:text-base text-gray-600 z-10 -left-10 sm:left-auto sm:right-0">
                          {t('booking.priceTooltip', {
                            taxRate: (taxRate * 100).toFixed(0),
                            depositRate: '50',
                          })}
                        </div>
                      </div>
                    </div>
                    <button
                      className="sm:hidden text-teal-600 font-semibold text-sm"
                      onClick={() => setIsPriceSummaryOpen(!isPriceSummaryOpen)}
                      aria-label={isPriceSummaryOpen ? 'Hide price summary' : 'Show price summary'}
                    >
                      {isPriceSummaryOpen ? t('booking.hide') : t('booking.show')}
                    </button>
                  </div>
                  <div className={`${isPriceSummaryOpen ? 'block' : 'hidden sm:block'} space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base`}>
                    <p>
                      {t('booking.tourPrice')}: {selectedTour?.currency || ''}{' '}
                      {selectedTour?.price || 0} × {participants} {t('booking.participants')} ={' '}
                      {selectedTour?.currency || ''} {basePrice.toFixed(2)}
                    </p>
                    {discount > 0 && (
                      <p className="text-teal-600">
                        {t('booking.discount')}: -{selectedTour?.currency || ''} {discount.toFixed(2)} (10%)
                      </p>
                    )}
                    <p>
                      {t('booking.tax')}: {selectedTour?.currency || ''} {taxAmount.toFixed(2)} (16% VAT)
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-teal-700">
                      {t('booking.total')}: {selectedTour?.currency || ''} {totalPrice.toFixed(2)}
                    </p>
                    <p className="text-xs sm:text-sm">
                      {t('booking.depositRequired')}: {selectedTour?.currency || ''} {depositAmount.toFixed(2)} (50%)
                    </p>
                  </div>
                </div>
              </div>

              {/* Deposit Confirmation */}
              <div className="col-span-2 lg:col-span-3 mt-6 sm:mt-8">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('depositPaid')}
                    className="rounded border-gray-300 text-teal-500 focus:ring-teal-300 h-4 w-4 sm:h-5 sm:w-5"
                    aria-invalid={!!errors.depositPaid}
                    aria-describedby={errors.depositPaid ? 'depositPaid-error' : undefined}
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    {`${t('booking.depositConfirmation')} ${selectedTour?.currency || ''} ${depositAmount.toFixed(2)}`}
                  </span>
                </label>
                {errors.depositPaid && typeof errors.depositPaid.message === 'string' && (
                  <p id="depositPaid-error" className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 animate-shake max-w-full">
                    {errors.depositPaid.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 mt-8 sm:mt-10">
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setTourSearch('');
                  setPromocodeStatus(null);
                  setIsPriceSummaryOpen(false);
                  console.log('Analytics: Form reset');
                }}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transform hover:scale-105 transition-transform duration-300"
                disabled={isSubmitting}
                aria-label="Reset form"
              >
                {t('booking.reset')}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                aria-label={t('booking.confirmBooking')}
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
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