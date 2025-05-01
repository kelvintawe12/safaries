
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
  SearchIcon,
  FilterIcon,
  MapPinIcon,
  UsersIcon,
  StarIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  SendIcon,
} from 'lucide-react';
import { TourCard } from '../components/features/tours/TourCard';
import { tours } from '../data/tours';

// Simulated API with error handling
const fetchTours = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return tours;
  } catch (error) {
    throw new Error('Failed to load tours');
  }
};

// Slideshow Component
const Slideshow = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1516426122075-c23e6d2db1dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      caption: 'Discover Virunga National Park',
      alt: 'Gorillas in Virunga',
    },
    {
      image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      caption: 'Sail across Lake Kivu',
      alt: 'Lake Kivu sunset',
    },
    {
      image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      caption: 'Adventure in Nyungwe Forest',
      alt: 'Nyungwe Forest canopy',
    },
    {
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      caption: 'Explore Idjwi Island',
      alt: 'Idjwi Island landscape',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section
      ref={heroRef}
      className="relative h-[500px] md:h-[600px]"
      style={{ backgroundPosition: 'center' }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
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
    </section>
  );
};

// Toast Notification Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-2xl animate-slide-up flex items-center max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
      role="alert"
      aria-live="polite"
    >
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 text-white hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

// Reason Card Component
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

// Testimonial Component
const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: 'Jane Doe',
      quote: 'An unforgettable adventure! The guides were amazing, and Virunga was breathtaking.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'John Smith',
      quote: 'Lake Kivu was a highlight of my life. Kivu Safaris made it seamless!',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Sarah Lee',
      quote: 'The cultural tour was so immersive. Highly recommend!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative max-w-3xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0 absolute'
          }`}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center animate-slide-up">
            <img
              src={testimonial.avatar}
              alt={`${testimonial.name}'s avatar`}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-800 font-semibold">{testimonial.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Tours = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedPriceRange, setPriceRange] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [toursData, setToursData] = useState(tours);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);

  const locations = [...new Set(tours.map((tour) => tour.location))];
  const durations = [...new Set(tours.map((tour) => tour.duration))];
  const categories = ['Wildlife', 'Cultural', 'Adventure', 'Relaxation'];
  const priceRanges = [
    { label: 'Under $300', min: 0, max: 300 },
    { label: '$300 - $500', min: 300, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity },
  ];

  // Load filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('tourFilters');
    if (savedFilters) {
      const { searchQuery, location, duration, priceRange, category, date } = JSON.parse(savedFilters);
      setSearchQuery(searchQuery || '');
      setSelectedLocation(location || '');
      setSelectedDuration(duration || '');
      setPriceRange(priceRange || '');
      setSelectedCategory(category || '');
      setSelectedDate(date || '');
      setToast({ show: true, message: 'Restored your filter settings!', type: 'success' });
    }
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        'tourFilters',
        JSON.stringify({
          searchQuery,
          location: selectedLocation,
          duration: selectedDuration,
          priceRange: selectedPriceRange,
          category: selectedCategory,
          date: selectedDate,
        })
      );
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchQuery, selectedLocation, selectedDuration, selectedPriceRange, selectedCategory, selectedDate]);

  // Fetch tours
  useEffect(() => {
    fetchTours()
      .then((data) => setToursData(data))
      .catch(() => setToast({ show: true, message: 'Failed to load tours', type: 'error' }));
  }, []);

  // Filter and sort tours
  const filteredTours = toursData
    .filter((tour) => {
      const matchesSearch =
        (tour.title?.en ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tour.description?.en ?? '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !selectedLocation || tour.location === selectedLocation;
      const matchesDuration = !selectedDuration || tour.duration === selectedDuration;
      const matchesPrice =
        !selectedPriceRange ||
        priceRanges.find((range) => range.label === selectedPriceRange && tour.price >= range.min && tour.price <= range.max);
      const matchesCategory = !selectedCategory || tour.category === selectedCategory;
      const matchesDate = !selectedDate || tour.availableDates?.includes(selectedDate);
      return matchesSearch && matchesLocation && matchesDuration && matchesPrice && matchesCategory && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const toursPerPage = 9;
  const displayedTours = filteredTours.slice(0, page * toursPerPage);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedDuration('');
    setPriceRange('');
    setSelectedCategory('');
    setSelectedDate('');
    setSortBy('default');
    setPage(1);
    setToast({ show: true, message: 'Filters cleared!', type: 'success' });
    localStorage.removeItem('tourFilters');
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Sticky Book Now Button */}
      <Link to="/contact">
        <button
          className="fixed bottom-6 right-6 bg-coral-500 text-white p-4 rounded-full shadow-lg hover:bg-coral-600 transform hover:scale-110 transition-all duration-300 z-50 animate-slide-up"
          aria-label="Book now"
        >
          <SendIcon className="h-6 w-6" />
        </button>
      </Link>

      {/* Slideshow Hero */}
      <Slideshow />

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden mb-4 bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center"
            aria-label="Toggle filters"
          >
            <FilterIcon className="h-5 w-5 mr-2" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          <div className={`flex flex-col gap-4 ${isFilterOpen ? 'block' : 'hidden md:flex md:flex-row'}`}>
            {/* Search */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours (e.g., Virunga, Wildlife)"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search tours"
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Filter by location"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Filter by duration"
              >
                <option value="">All Durations</option>
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
              <select
                value={selectedPriceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Filter by price range"
              >
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Filter by date"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Sort tours"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
              </select>
              {(searchQuery || selectedLocation || selectedDuration || selectedPriceRange || selectedCategory || selectedDate) && (
                <Button variant="outline" onClick={clearFilters} className="hover:bg-teal-100">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {displayedTours.length === 0 ? (
            <div className="text-center py-12 animate-slide-up">
              <FilterIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Tours Found</h3>
              <p className="text-gray-600 mb-4">
                No tours match your current filters. Try adjusting your search criteria.
              </p>
              <Button variant="outline" onClick={clearFilters} className="hover:bg-teal-100">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTours.map((tour, index) => (
                  <div
                    key={tour.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TourCard tour={tour} />
                    <div className="mt-2 flex justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < (tour.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">({tour.reviews || 0} reviews)</span>
                    </div>
                  </div>
                ))}
              </div>
              {displayedTours.length < filteredTours.length && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setPage(page + 1)}
                    className="bg-teal-600 text-white hover:bg-teal-700"
                    aria-label="Load more tours"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Why Choose Kivu Safaris
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: 'Expert Guides',
                description: 'Our local guides ensure a safe and immersive experience.',
              },
              {
                icon: <MapPinIcon className="h-6 w-6" />,
                title: 'Unique Destinations',
                description: 'Explore exclusive locations like Virunga and Lake Kivu.',
              },
              {
                icon: <StarIcon className="h-6 w-6" />,
                title: 'Sustainable Tourism',
                description: 'We prioritize eco-friendly and community-focused travel.',
              },
            ].map((reason, index) => (
              <ReasonCard key={reason.title} {...reason} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            What Our Travelers Say
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                image: 'https://images.unsplash.com/photo-1516426122075-c23e6d2db1dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                name: 'Virunga National Park',
                link: '/tours?location=Virunga',
              },
              {
                image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                name: 'Lake Kivu',
                link: '/tours?location=Lake Kivu',
              },
              {
                image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                name: 'Nyungwe Forest',
                link: '/tours?location=Nyungwe',
              },
            ].map((dest, index) => (
              <Link
                key={dest.name}
                to={dest.link}
                className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img src={dest.image} alt={dest.name} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">{dest.name}</p>
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
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/tours" className="text-gray-300 hover:text-white transition-colors">
                    Tours
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
                  setToast({ show: true, message: 'Subscribed to newsletter!', type: 'success' });
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
          <p className="text-center text-gray-400 mt-12">© 2025 Kivu Safaris. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast?.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};