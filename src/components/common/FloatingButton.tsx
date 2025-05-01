import React from 'react';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FloatingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tours');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Add Booking"
      className="fixed bottom-8 right-8 bg-coral-500 hover:bg-coral-600 text-white p-4 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-coral-400"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
};
