import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon, InstagramIcon, TwitterIcon, ArrowUpIcon } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [currentImage, setCurrentImage] = useState(0);

  // Slideshow images (sunset-themed)
  const slideshowImages = [
    '/celeb.jpg',
    'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
    'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg',
  ];

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slideshowImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  // Configuration for social links
  const socialLinks = [
    { 
      icon: <FacebookIcon className="h-6 w-6" />,
      url: "https://facebook.com/kivusafaris",
      label: "Visit our Facebook page"
    },
    {
      icon: <InstagramIcon className="h-6 w-6" />,
      url: "https://instagram.com/kivusafaris",
      label: "Follow us on Instagram"
    },
    {
      icon: <TwitterIcon className="h-6 w-6" />,
      url: "https://twitter.com/kivusafaris",
      label: "Follow us on Twitter"
    }
  ];

  // Configuration for footer links
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
    <footer className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-gray-200 overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 opacity-25">
        {slideshowImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
                       ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="relative container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info with Animated Logo */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start mb-10">
              {/* Refined SVG Logo with Blue Sunset Theme */}
              <svg className="h-24 w-auto mb-8 animate-logo-glow" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 70 C50 70 70 50 90 50 C110 50 130 70 150 70" stroke="#f97316" strokeWidth="5" className="animate-path-draw"/>
                <path d="M150 70 L170 50 L190 70" stroke="#f97316" strokeWidth="5" className="animate-path-draw delay-200"/>
                <circle cx="90" cy="50" r="12" fill="#60a5fa" className="animate-circle-pulse"/>
                <circle cx="170" cy="50" r="10" fill="#60a5fa" className="animate-circle-pulse delay-300"/>
                <text x="20" y="30" fill="#ffffff" fontSize="24" fontWeight="700" fontFamily="'Playfair Display', serif" className="animate-text-reveal">
                  Kivu Safaris
                </text>
              </svg>
              <p className="text-blue-200 mb-8 max-w-lg leading-relaxed text-base font-light">
                Embark on a journey through Africa's soul with Kivu Safaris. Our sustainable adventures weave authentic cultural experiences into unforgettable memories.
             "Es de la empresa, no mía, está en inglés porque es el idioma del cliente."
              </p>
              <div className="flex space-x-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-orange-400 transform hover:scale-125 transition-all duration-300"
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
              <h3 className="text-2xl font-semibold mb-6 text-orange-400 tracking-tight font-['Playfair Display']">{section.title}</h3>
              <ul className="space-y-5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-blue-200 hover:text-white hover:underline decoration-orange-400 underline-offset-4
                                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400
                                focus:ring-offset-2 rounded text-base font-light"
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
            <h3 className="text-2xl font-semibold mb-6 text-orange-400 tracking-tight font-['Playfair Display']">Contact Us</h3>
            <address className="not-italic text-base font-light">
              <ul className="space-y-5">
                <li className="flex items-start">
                  <MapPinIcon className="h-6 w-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                  <span className="text-blue-200">
                    123 Safari Road<br />
                    Goma, North Kivu<br />
                    Democratic Republic of Congo
                  </span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="h-6 w-6 mr-4 text-orange-400 flex-shrink-0" />
                  <a
                    href="tel:+243123456789"
                    className="text-blue-200 hover:text-white transition-all duration-300"
                  >
                    +243 (0) 123 456 789
                  </a>
                </li>
                <li className="flex items-center">
                  <MailIcon className="h-6 w-6 mr-4 text-orange-400 flex-shrink-0" />
                  <a
                    href="mailto:info@kivusafaris.com"
                    className="text-blue-200 hover:text-white transition-all duration-300"
                  >
                    info@kivusafaris.com
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 border-t border-blue-700 pt-12">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-2xl font-semibold mb-6 text-orange-400 tracking-tight font-['Playfair Display']">
              Subscribe to Our Newsletter
            </h4>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-lg bg-blue-800 text-white border border-blue-700
                          focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300
                          text-base font-light"
                aria-label="Email for newsletter subscription"
              />
              <button
                type="button"
                className="px-8 py-4 bg-orange-500 text-blue-900 rounded-lg hover:bg-orange-400
                          transform hover:scale-105 transition-all duration-300 focus:outline-none
                          focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 font-semibold"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-blue-700 mt-12 pt-10 text-center">
          <p className="text-blue-300 text-sm font-light">
            © {currentYear} Kivu Safaris. All rights reserved.<br />
            Registered with the Ministry of Tourism, DRC | License No: TOUR-123-456<br />
            <Link
              to="/accessibility"
              className="hover:text-white hover:underline decoration-orange-400 underline-offset-4
                        transition-all duration-300 inline-block mt-3"
            >
              Accessibility Statement
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Top Button (Left Side) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 p-4 bg-orange-500 text-blue-900 rounded-full shadow-2xl
                  hover:bg-orange-400 transform hover:scale-110 hover:rotate-12 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        aria-label="Back to top"
      >
        <ArrowUpIcon className="h-6 w-6" />
      </button>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes logo-glow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(249, 115, 22, 0.3)); }
            50% { filter: drop-shadow(0 0 15px rgba(249, 115, 22, 0.7)); }
          }
          .animate-logo-glow {
            animation: logo-glow 4s ease-in-out infinite;
          }
          @keyframes path-draw {
            0% { stroke-dasharray: 0 300; stroke-dashoffset: 0; }
            100% { stroke-dasharray: 300 300; stroke-dashoffset: 0; }
          }
          .animate-path-draw {
            stroke-dasharray: 300;
            animation: path-draw 2.5s ease-in-out forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          @keyframes circle-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          .animate-circle-pulse {
            animation: circle-pulse 2s ease-in-out infinite;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
          @keyframes text-reveal {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-text-reveal {
            animation: text-reveal 1s ease-out forwards;
          }
        `}
      </style>
    </footer>
  );
};