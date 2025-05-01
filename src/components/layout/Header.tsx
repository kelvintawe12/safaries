import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon, GlobeIcon } from 'lucide-react';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };
  return <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="https://placehold.co/200x60?text=Kivu+Safaris" alt="Kivu Safaris Logo" className="h-10" />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({
          isActive
        }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700 hover:text-teal-700 transition-colors'}>
            Home
          </NavLink>
          <NavLink to="/about" className={({
          isActive
        }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700 hover:text-teal-700 transition-colors'}>
            About
          </NavLink>
          <NavLink to="/tours" className={({
          isActive
        }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700 hover:text-teal-700 transition-colors'}>
            Tours
          </NavLink>
          <NavLink to="/faq" className={({
          isActive
        }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700 hover:text-teal-700 transition-colors'}>
            FAQ
          </NavLink>
          <NavLink to="/privacy" className={({
          isActive
        }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700 hover:text-teal-700 transition-colors'}>
            Privacy
          </NavLink>
          <NavLink to="/contact" className={({
          isActive
        }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700 hover:text-teal-700 transition-colors'}>
            Contact
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center text-gray-700 hover:text-teal-700 transition-colors" onClick={() => {
            const nextLang = language === 'en' ? 'fr' : language === 'fr' ? 'rw' : 'en';
            changeLanguage(nextLang);
          }}>
              <GlobeIcon className="h-5 w-5 mr-1" />
              <span className="uppercase">{language}</span>
            </button>
          </div>
          <Link to="/booking-entry" className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md transition-colors">
            Book Now
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <NavLink to="/" className={({
            isActive
          }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700'} onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" className={({
            isActive
          }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700'} onClick={() => setIsMenuOpen(false)}>
                About
              </NavLink>
              <NavLink to="/tours" className={({
            isActive
          }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700'} onClick={() => setIsMenuOpen(false)}>
                Tours
              </NavLink>
              <NavLink to="/faq" className={({
            isActive
          }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700'} onClick={() => setIsMenuOpen(false)}>
                FAQ
              </NavLink>
              <NavLink to="/privacy" className={({
            isActive
          }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700'} onClick={() => setIsMenuOpen(false)}>
                Privacy
              </NavLink>
              <NavLink to="/contact" className={({
            isActive
          }) => isActive ? 'text-teal-700 font-medium' : 'text-gray-700'} onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
              <div className="pt-2 flex items-center justify-between">
                <button className="flex items-center text-gray-700" onClick={() => {
              const nextLang = language === 'en' ? 'fr' : language === 'fr' ? 'rw' : 'en';
              changeLanguage(nextLang);
            }}>
                  <GlobeIcon className="h-5 w-5 mr-1" />
                  <span className="uppercase">{language}</span>
                </button>
                <Link to="/booking-entry" className="bg-teal-700 text-white px-4 py-2 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Book Now
                </Link>
              </div>
            </nav>
          </div>
        </div>}
    </header>;
};