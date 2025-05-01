import React from 'react';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FloatingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tours');
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 sm:bottom-8 sm:left-8">
      <button
        onClick={handleClick}
        aria-label="Add Booking"
        aria-describedby="add-booking-tooltip"
        className="group relative flex items-center justify-center bg-gradient-to-r from-coral-500 to-pink-500 hover:from-coral-600 hover:to-pink-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl border border-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coral-300 active:scale-95 animate-float sm:p-4"
      >
        <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-90" />
        {/* Tooltip */}
        <span
          id="add-booking-tooltip"
          role="tooltip"
          className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:block group-focus:block bg-gray-800 text-white text-xs rounded-md py-1 px-3 max-w-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100"
        >
          Add a New Booking
          <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </span>
        {/* Visually hidden animation description */}
        <span className="sr-only">Button pulses periodically to indicate action</span>
      </button>
    </div>
  );
};