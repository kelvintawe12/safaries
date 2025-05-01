// Description: 404 Not Found page for Kivu Safaris website
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
  HomeIcon,
  MapPinIcon,
  UsersIcon,
  StarIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
} from 'lucide-react';

// Slideshow images with captions
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1516426122075-c23e6d2db1dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    caption: 'Discover majestic wildlife in Virunga National Park',
    alt: 'Gorillas in Virunga National Park',
  },
  {
    image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    caption: 'Explore the serene beauty of Lake Kivu',
    alt: 'Lake Kivu sunset',
  },
  {
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    caption: 'Experience thrilling safaris in Nyungwe Forest',
    alt: 'Nyungwe Forest canopy',
  },
];

// Slideshow Component
const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Link to="/tours">
              <p className="text-white text-xl md:text-3xl font-semibold text-center px-4 animate-slide-up">
                {slide.caption}
              </p>
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-coral-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

// Reasons Card Component
const ReasonCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => (
  <div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-700 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const NotFound = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sticky Explore Tours Button */}
      <Link to="/tours">
        <button
          className="fixed bottom-6 right-6 bg-coral-500 text-white p-4 rounded-full shadow-lg hover:bg-coral-600 transform hover:scale-110 transition-all duration-300 z-50 animate-slide-up"
          aria-label="Explore our tours"
        >
          <MapPinIcon className="h-6 w-6" />
        </button>
      </Link>

      {/* Slideshow Section */}
      <section className="py-8">
        <Slideshow />
      </section>

      {/* 404 Message */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-8xl md:text-9xl font-extrabold text-teal-700 mb-6 animate-slide-up">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
            It looks like you're off the trail. Let's guide you back to your adventure with Kivu Safaris!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <Button
                size="large"
                className="bg-teal-600 text-white hover:bg-teal-700 transform hover:scale-105 transition-transform duration-300"
                aria-label="Return to homepage"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Return to Homepage
              </Button>
            </Link>
            <Link to="/tours">
              <Button
                size="large"
                className="bg-coral-500 text-white hover:bg-coral-600 transform hover:scale-105 transition-transform duration-300"
                aria-label="Browse tours"
              >
                <MapPinIcon className="h-5 w-5 mr-2" />
                Browse Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reasons Not to Miss */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Why You Shouldn't Miss Kivu Safaris
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: 'Expert Guides',
                description: 'Our local guides are passionate experts, ensuring a safe and unforgettable journey.',
              },
              {
                icon: <MapPinIcon className="h-6 w-6" />,
                title: 'Unique Destinations',
                description: 'Explore hidden gems like Virunga National Park and Lake Kivu with exclusive tours.',
              },
              {
                icon: <StarIcon className="h-6 w-6" />,
                title: 'Top-Rated Experiences',
                description: 'Join thousands of happy travelers with our 4.8-star rated adventures.',
              },
            ].map((reason, index) => (
              <ReasonCard key={reason.title} {...reason} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800 animate-slide-up">
            Find Your Way Back
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { to: '/', label: 'Home', icon: <HomeIcon className="h-5 w-5" /> },
              { to: '/tours', label: 'Tours', icon: <MapPinIcon className="h-5 w-5" /> },
              { to: '/about', label: 'About Us', icon: <UsersIcon className="h-5 w-5" /> },
              { to: '/contact', label: 'Contact', icon: <MailIcon className="h-5 w-5" /> },
            ].map((link, index) => (
              <Link
                key={link.label}
                to={link.to}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center space-x-2">
                  {link.icon}
                  <span className="text-gray-800 font-semibold">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4">Kivu Safaris</h3>
              <p className="text-gray-300">
                Explore the heart of Africa with our expert-guided tours. Your adventure starts here.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/tours" className="text-gray-300 hover:text-white transition-colors">
                    Browse Tours
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Subscribed to newsletter!');
                }}
                className="flex"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-3 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-coral-500 text-gray-800"
                  aria-label="Newsletter email"
                />
                <Button
                  type="submit"
                  className="bg-coral-500 text-white hover:bg-coral-600 rounded-l-none"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </Button>
              </form>
              <div className="mt-4 flex space-x-4">
                {[
                  {
                    href: 'https://instagram.com/kivusafaris',
                    icon: <InstagramIcon className="h-5 w-5" />,
                    label: 'Instagram',
                  },
                  {
                    href: 'https://twitter.com/kivusafaris',
                    icon: <TwitterIcon className="h-5 w-5" />,
                    label: 'Twitter',
                  },
                  {
                    href: 'https://facebook.com/kivusafaris',
                    icon: <FacebookIcon className="h-5 w-5" />,
                    label: 'Facebook',
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transform hover:scale-110 transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-12">
            © 2025 Kivu Safaris. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};