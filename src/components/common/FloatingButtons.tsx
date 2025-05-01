import React, { useState } from 'react';
import { HelpCircleIcon, MessageCircleIcon, LifeBuoyIcon, PlusIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Assistant from './Assistant';

const FloatingButtons: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr' | 'rw'>('en');
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation handler for adding a booking
  const handleMyBookingsClick = () => {
    navigate('/tours');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
      <div className="flex flex-col items-end space-y-3 sm:space-y-4">
        {/* Assistant Component */}
        <Assistant
          isOpen={isChatOpen}
          setIsOpen={setIsChatOpen}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Floating Buttons */}
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <button
            onClick={() => (window.location.href = '/faq')}
            className="bg-orange-500 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            aria-label="Frequently Asked Questions"
          >
            <HelpCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-teal-700 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-teal-800 transition-colors"
            aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
          >
            <MessageCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => (window.location.href = '/contact')}
            className="bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Contact support"
          >
            <LifeBuoyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          {location.pathname === '/my-bookings' && (
            <button
              onClick={handleMyBookingsClick}
              className="bg-green-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
              aria-label="Add new booking"
            >
              <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingButtons;