import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Configuration for social links
  const socialLinks = [
    { 
      icon: <FacebookIcon className="h-5 w-5" />,
      url: "https://facebook.com/kivusafaris",
      label: "Visit our Facebook page"
    },
    {
      icon: <InstagramIcon className="h-5 w-5" />,
      url: "https://instagram.com/kivusafaris",
      label: "Follow us on Instagram"
    },
    {
      icon: <TwitterIcon className="h-5 w-5" />,
      url: "https://twitter.com/kivusafaris",
      label: "Follow us on Twitter"
    }
  ];

  // Configuration for quick links
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { path: "/", label: "Home" },
        { path: "/about", label: "About Us" },
        { path: "/tours", label: "Tours" },
        { path: "/contact", label: "Contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { path: "/privacy", label: "Privacy Policy" },
        { path: "/terms", label: "Terms of Service" },
        { path: "/faq", label: "FAQ" },
        { path: "/sitemap", label: "Site Map" }
      ]
    }
  ];

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Optimized background image with lazy loading */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/kivu.jpg')" }}
        aria-hidden="true"
        loading="lazy"
      />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start mb-8">
              <img
                src="/kivu.jpg"
                alt="Kivu Safaris Logo"
                className="h-12 w-48 mb-4"
                loading="lazy"
              />
              <p className="text-gray-300 mb-6 max-w-md">
                Discover the heart of Africa with our expert-guided tours. Committed to sustainable tourism 
                and authentic cultural experiences.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-teal-400">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300
                                 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Contact Us</h3>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPinIcon className="h-5 w-5 mr-2 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    123 Safari Road<br />
                    Goma, North Kivu<br />
                    Democratic Republic of Congo
                  </span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-2 text-teal-400 flex-shrink-0" />
                  <a
                    href="tel:+243123456789"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    +243 (0) 123 456 789
                  </a>
                </li>
                <li className="flex items-center">
                  <MailIcon className="h-5 w-5 mr-2 text-teal-400 flex-shrink-0" />
                  <a
                    href="mailto:info@kivusafaris.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    info@kivusafaris.com
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4 text-teal-400">
              Subscribe to Our Newsletter
            </h4>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white
                         focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Email for newsletter subscription"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                         transition-colors duration-300 focus:outline-none focus:ring-2
                         focus:ring-teal-400 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Kivu Safaris. All rights reserved.<br />
            Registered with the Ministry of Tourism, DRC | License No: TOUR-123-456<br />
            <Link
              to="/accessibility"
              className="hover:text-white transition-colors duration-300 inline-block mt-2"
            >
              Accessibility Statement
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 p-3 bg-teal-600 rounded-full shadow-lg
                 hover:bg-teal-700 transition-colors duration-300 focus:outline-none
                 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};