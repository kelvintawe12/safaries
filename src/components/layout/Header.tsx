import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon, GlobeIcon } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/tours', label: 'Tours' },
  { path: '/faq', label: 'FAQ' },
  { path: '/privacy', label: 'Privacy' },
  { path: '/contact', label: 'Contact' },
  { path: '/gallery', label: 'Gallery' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  // Focus trapping for mobile menu
  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll(
      'a, button'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      } else if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    firstElement.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Go to Home">
          <img
            src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&h=60"
            alt="Kivu Safaris Logo"
            className="h-10 rounded-md"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-teal-700 font-medium'
                  : 'text-gray-700 hover:text-teal-700 transition-colors'
              }
              aria-label={`Go to ${link.label}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center text-gray-700 hover:text-teal-700 transition-colors"
              onClick={() => {
                const nextLang = language === 'en' ? 'fr' : language === 'fr' ? 'rw' : 'en';
                changeLanguage(nextLang);
              }}
              aria-label="Change language"
            >
              <GlobeIcon className="h-5 w-5 mr-1" />
              <span className="uppercase">{language}</span>
            </button>
          </div>

          {/* Book Now Button */}
          <Link
            to="/booking-entry"
            className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md transition-colors"
            aria-label="Book Now"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t"
          aria-label="Mobile navigation menu"
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-teal-700 font-medium'
                      : 'text-gray-700 hover:text-teal-700 transition-colors'
                  }
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-2 flex items-center justify-between">
                {/* Language Selector */}
                <button
                  className="flex items-center text-gray-700"
                  onClick={() => {
                    const nextLang = language === 'en' ? 'fr' : language === 'fr' ? 'rw' : 'en';
                    changeLanguage(nextLang);
                  }}
                  aria-label="Change language"
                >
                  <GlobeIcon className="h-5 w-5 mr-1" />
                  <span className="uppercase">{language}</span>
                </button>

                {/* Book Now Button */}
                <Link
                  to="/booking-entry"
                  className="bg-teal-700 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Book Now"
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};