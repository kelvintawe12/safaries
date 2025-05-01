import React, { useState, useEffect, useCallback, useRef } from 'react';
import { XIcon, PlayIcon, PauseIcon, TwitterIcon, InstagramIcon, FacebookIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Slideshow } from '../features/hero/Slideshow';

const images = [
  { src: '/welcome.jpg', alt: 'Welcome to Kivu Safaris', caption: 'Discover the beauty of Kivu' },
  { src: '/journey.jpg', alt: 'Journey through Kivu', caption: 'Embark on an unforgettable adventure' },
  { src: '/trav.jpg', alt: 'Travel with us', caption: 'Explore the heart of Congo' },
];

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dismissPermanently, setDismissPermanently] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Check if popup was dismissed permanently
  useEffect(() => {
    const isDismissed = localStorage.getItem('welcomePopupDismissed');
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log('Analytics: Welcome popup shown');
    }, 5000); // 5s delay

    return () => clearTimeout(timer);
  }, []);

  // Focus trapping
  useEffect(() => {
    if (!isVisible || !popupRef.current) return;

    const focusableElements = popupRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = firstFocusableRef.current;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    firstElement?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (dismissPermanently) {
      localStorage.setItem('welcomePopupDismissed', 'true');
      console.log('Analytics: Welcome popup dismissed permanently');
    } else {
      console.log('Analytics: Welcome popup dismissed for session');
    }
  }, [dismissPermanently]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleSubscribe = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setIsSubscribed(true);
    setEmail('');
    console.log('Analytics: Newsletter signup', { email });
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000); // Reset success message after 3s
  }, [email]);

  const handleSocialClick = (platform: string) => {
    console.log(`Analytics: Social media click - ${platform}`);
  };

  const handleNavigateAndClose = (path: string, label: string) => {
    navigate(path);
    console.log(`Analytics: ${label} clicked`);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-2 sm:p-4 animate-slide-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
    >
      <div
        ref={popupRef}
        className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md sm:max-w-lg md:max-w-xl p-3 sm:p-4 md:p-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 sm:p-4 rounded-t-xl">
          <button
            ref={firstFocusableRef}
            onClick={handleClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white hover:text-gray-200 text-xl sm:text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-teal-300"
            aria-label="Close welcome popup"
          >
            <XIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <h2
            id="welcome-popup-title"
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-center animate-fade-in"
          >
            Welcome to Kivu Safaris!
          </h2>
          <p className="text-center text-white/80 mt-1 sm:mt-2 text-sm sm:text-base animate-fade-in">
            Embark on an adventure of a lifetime
          </p>
        </div>

        {/* Slideshow */}
        <div className="relative h-48 sm:h-64 md:h-80 my-3 sm:my-4 rounded-lg overflow-hidden">
          <Slideshow
            images={images}
            interval={4000}
            autoplay={!isPaused}
            showDots={true}
            showArrows={true}
            className="h-full"
          />
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-teal-500 hover:bg-teal-600 text-white p-1.5 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300"
            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {isPaused ? <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <PauseIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>

        {/* Content */}
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-gray-700 text-sm sm:text-base animate-fade-in">
            Discover the beauty of Kivu with our curated tours and experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => handleNavigateAndClose('/tours', 'Explore Tours')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-semibold text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
              aria-label="Explore Tours"
            >
              Explore Tours
            </button>
            <button
              onClick={() => handleNavigateAndClose('/contact', 'Contact Us')}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-semibold text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
              aria-label="Contact Us"
            >
              Contact Us
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Join Our Newsletter</h3>
            {isSubscribed ? (
              <p className="text-teal-600 text-sm sm:text-base animate-fade-in">
                Thank you for subscribing! Check your inbox for updates.
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full p-1.5 sm:p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    aria-label="Email for newsletter"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  {emailError && (
                    <p id="email-error" className="text-red-600 text-xs sm:text-sm mt-1">
                      {emailError}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscribe}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
            <a
              href="https://x.com/kivusafaris"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Twitter')}
              className="text-gray-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
              aria-label="Follow us on Twitter"
            >
              <TwitterIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://instagram.com/kivusafaris"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Instagram')}
              className="text-gray-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://facebook.com/kivusafaris"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Facebook')}
              className="text-gray-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
              aria-label="Follow us on Facebook"
            >
              <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>

          {/* Dismiss Options */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="dismiss-permanently"
              checked={dismissPermanently}
              onChange={(e) => setDismissPermanently(e.target.checked)}
              className="h-4 w-4 text-teal-500 focus:ring-teal-300"
              aria-label="Do not show this popup again"
            />
            <label htmlFor="dismiss-permanently" className="text-xs sm:text-sm text-gray-600">
              Don’t show again
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
