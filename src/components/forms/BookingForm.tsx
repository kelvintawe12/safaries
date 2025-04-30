import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '../../utils/validation';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { Tour } from '../../types';
import { CalendarIcon, UsersIcon, BanknoteIcon } from 'lucide-react';
interface BookingFormProps {
  tours: Tour[];
  onSubmit: (data: any) => Promise<void>;
}
export const BookingForm = ({
  tours,
  onSubmit
}: BookingFormProps) => {
  const {
    t
  } = useLanguage();
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(bookingSchema)
  });
  const selectedTourId = watch('tourId');
  const participants = watch('participants') || 1;
  const selectedTour = tours.find(tour => tour.id === Number(selectedTourId));
  const totalPrice = selectedTour ? selectedTour.price * participants : 0;
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tour Selection */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Tour *
          </label>
          <select {...register('tourId', {
          valueAsNumber: true
        })} className="w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select a tour</option>
            {tours.map(tour => <option key={tour.id} value={tour.id}>
                {tour.title} - ${tour.price}
              </option>)}
          </select>
          {errors.tourId && <p className="mt-1 text-sm text-red-600">{errors.tourId.message}</p>}
        </div>
        {/* Number of Participants */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Participants *
          </label>
          <div className="relative">
            <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="number" min="1" max="20" {...register('participants', {
            valueAsNumber: true
          })} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          {errors.participants && <p className="mt-1 text-sm text-red-600">
              {errors.participants.message}
            </p>}
        </div>
        {/* Tour Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tour Date *
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="date" {...register('tourDate')} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2" min={new Date().toISOString().split('T')[0]} />
          </div>
          {errors.tourDate && <p className="mt-1 text-sm text-red-600">
              {errors.tourDate.message}
            </p>}
        </div>
        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method *
          </label>
          <div className="relative">
            <BanknoteIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select {...register('paymentMethod')} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Select payment method</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash on Arrival</option>
            </select>
          </div>
          {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">
              {errors.paymentMethod.message}
            </p>}
        </div>
        {/* Special Requests */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea {...register('specialRequests')} rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Any special requirements or requests..." />
        </div>
        {/* Price Summary */}
        <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Price Summary</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              Tour Price: ${selectedTour?.price || 0} × {participants}{' '}
              participants
            </p>
            <p className="text-xl font-bold text-teal-700">
              Total: ${totalPrice}
            </p>
            <p className="text-sm">50% deposit required to confirm booking</p>
          </div>
        </div>
        {/* Deposit Confirmation */}
        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register('depositPaid')} className="rounded border-gray-300 text-teal-600" />
            <span className="text-sm text-gray-700">
              I confirm that I will pay the 50% deposit (${totalPrice / 2}) to
              secure my booking
            </span>
          </label>
          {errors.depositPaid && <p className="mt-1 text-sm text-red-600">
              {errors.depositPaid.message}
            </p>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>;
};