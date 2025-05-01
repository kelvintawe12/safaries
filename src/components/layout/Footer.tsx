import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/kivu.jpg')" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" aria-hidden="true" />
      {/* Footer content */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img
              src="https://placehold.co/200x60?text=Kivu+Safaris&bg=2D7A73&fg=ffffff"
              alt="Kivu Safaris Logo"
              className="h-10 mb-4"
            />
            <p className="text-gray-300 mb-4">Explore. Experience. Connect.</p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-300 hover:text-white">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 text-teal-500 mt-0.5" />
                <span className="text-gray-300">
                  123 Main Street, Goma, North Kivu, DRC
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-teal-500" />
                <a href="tel:+243123456789" className="text-gray-300 hover:text-white">
                  +243 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 text-teal-500" />
                <a href="mailto:info@kivusafaris.com" className="text-gray-300 hover:text-white">
                  info@kivusafaris.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Kivu Safaris. All rights reserved. Officially
            registered with tourism authorities in the Democratic Republic of
            Congo.
          </p>
        </div>
      </div>
    </footer>
  );
};
