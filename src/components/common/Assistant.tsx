import React, { useState, useEffect, useRef, useCallback } from 'react';
import { XIcon } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface AssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  language: 'en' | 'fr' | 'rw';
  setLanguage: (lang: 'en' | 'fr' | 'rw') => void;
}

// Predefined bot responses
const botResponses: Record<string, string> = {
  'book a tour': 'To book a tour, please visit our website at /tours or click the "+" button to start a new booking. A 50% deposit is required to confirm your booking.',
  'cancel booking': 'Cancellations made 7 days prior to the tour are eligible for a 70% refund. No refunds are available for cancellations within 48 hours. Please contact us at /contact for assistance.',
  'safety guidelines': 'For your safety, always follow the guide’s instructions. Kivu Safaris is not liable for accidents caused by personal negligence.',
  'eco-tourism': 'We offer eco-tourism adventures focusing on sustainable travel and environmental preservation. Explore our offerings at /tours!',
};

const Assistant: React.FC<AssistantProps> = ({ isOpen, setIsOpen, language, setLanguage }) => {
  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'How can I help you plan your safari?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for bot responses
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Mock translation function with fallback
  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      const translations: Record<string, Record<string, string>> = {
        en: {
          welcome: 'How can I help you plan your safari?',
          send: 'Send',
          typeMessage: 'Type your message...',
          selectLanguage: 'Select Language',
          loading: 'Processing...',
          you: 'You',
          bot: 'Bot',
        },
        fr: {
          welcome: 'Comment puis-je vous aider à planifier votre safari ?',
          send: 'Envoyer',
          typeMessage: 'Tapez votre message...',
          selectLanguage: 'Sélectionner la langue',
          loading: 'Traitement...',
          you: 'Vous',
          bot: 'Assistant',
        },
        rw: {
          welcome: 'Ndingute nte kugufasha gutegura safari yawe?',
          send: 'Ohereza',
          typeMessage: 'Andika ubutumwa bwawe...',
          selectLanguage: 'Hitamo Ururimi',
          loading: 'Irimo gukora...',
          you: 'Wowe',
          bot: 'Umufasha',
        },
      };
      let text = translations[language][key] || key; // Fallback to key if translation is missing
      if (params) {
        Object.keys(params).forEach((param) => {
          text = text.replace(`{${param}}`, params[param]);
        });
      }
      return text;
    },
    [language]
  );

  // Scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus management when assistant opens
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.focus();
    }
  }, [isOpen]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setIsLoading(true);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const userInput = input.toLowerCase();
      let botReply = t('welcome'); // Fallback to welcome message
      Object.keys(botResponses).forEach((key) => {
        if (userInput.includes(key)) {
          botReply = botResponses[key];
        }
      });
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botReply,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle Enter key for sending messages
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Error boundary component
  class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return <div className="text-red-600 text-sm p-4">{t('error', { default: 'Something went wrong. Please try again.' })}</div>;
      }
      return this.props.children;
    }
  }

  if (!isOpen) return null;

  return (
    <ErrorBoundary>
      <div
        className="fixed inset-0 flex items-center justify-center sm:static sm:inset-auto sm:flex-none sm:mb-4 bg-white rounded-lg shadow-2xl p-4 sm:p-6 max-h-[80vh] overflow-y-auto w-11/12 sm:w-96"
        role="dialog"
        aria-labelledby="safari-assistant-title"
        tabIndex={-1}
        ref={chatContainerRef}
      >
        <div className="flex flex-col w-full">
          {/* Header with Logo */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img
                src="/kivu.jpg"
                alt="Safari Assistant Logo"
                className="h-8 w-8 rounded-full object-cover border-2 border-teal-700"
              />
              <h3 id="safari-assistant-title" className="font-semibold text-lg text-teal-800">
                Kivu Safaris Assistant
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close assistant"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="mb-4">
            <label htmlFor="language-select" className="sr-only">
              {t('selectLanguage')}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'rw')}
              className="w-full p-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
              aria-label={t('selectLanguage')}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="rw">Ikinyarwanda</option>
            </select>
          </div>

          {/* Chat Section */}
          <div role="log" aria-live="polite" className="flex flex-col items-center">
            <div className="h-48 sm:h-64 overflow-y-auto border rounded-lg p-3 sm:p-4 mb-4 bg-white shadow-inner w-full">
              {messages.map((message) => (
                <div key={message.id} className="mb-2 w-full max-w-md mx-auto">
                  <div
                    className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                      message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="font-semibold">{message.sender === 'user' ? t('you') : t('bot')}</p>
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70 block mt-1">{message.timestamp}</span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-2 w-full max-w-md mx-auto">
                  <div className="p-2 sm:p-3 rounded-lg text-xs sm:text-sm bg-gray-100 text-gray-800">
                    <p>{t('loading')}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex space-x-2 w-full max-w-md mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('typeMessage')}
                className="flex-1 p-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                aria-label="Type your message"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-teal-700 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-teal-800 transition-colors text-xs sm:text-sm disabled:opacity-50"
                aria-label="Send message"
                disabled={isLoading}
              >
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Assistant;