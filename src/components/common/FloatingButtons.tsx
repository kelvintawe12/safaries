import React, { useState } from 'react';
import { MessageCircleIcon, HelpCircleIcon, LifeBuoyIcon, XIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
export const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const {
    t
  } = useLanguage();
  return <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end space-y-4">
        {/* Chat Window */}
        {isChatOpen && <div className="bg-white rounded-lg shadow-xl p-4 mb-4 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Safari Assistant</h3>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="h-64 overflow-y-auto border rounded-lg p-4 mb-4">
              {/* Chat messages would go here */}
              <p className="text-gray-600">
                How can I help you plan your safari?
              </p>
            </div>
            <input type="text" placeholder="Type your message..." className="w-full p-2 border rounded-md" />
          </div>}
        {/* Floating Buttons */}
        <div className="flex flex-col space-y-4">
          <button onClick={() => window.location.href = '/faq'} className="bg-coral-500 text-white p-3 rounded-full shadow-lg hover:bg-coral-600 transition-colors" aria-label="FAQ">
            <HelpCircleIcon className="h-6 w-6" />
          </button>
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-teal-700 text-white p-3 rounded-full shadow-lg hover:bg-teal-800 transition-colors" aria-label="Chat">
            <MessageCircleIcon className="h-6 w-6" />
          </button>
          <button onClick={() => window.location.href = '/contact'} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors" aria-label="Support">
            <LifeBuoyIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>;
};