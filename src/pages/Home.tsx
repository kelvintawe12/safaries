
import { Link } from 'react-router-dom';
import { Hero } from '../components/features/hero/Hero';
import { TourCard } from '../components/features/tours/TourCard';
import { Button } from '../components/common/Button';
import { tours } from '../data/tours';
import { testimonials } from '../data/testimonials';
import { ChevronRightIcon, StarIcon } from 'lucide-react';

export const Home = () => {
  const featuredTours = tours.filter((tour) => tour.featured);
  const heroImages = [
    'https://images.unsplash.com/photo-1623690542850-bae41d2a7e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1580309237429-661e2be50469?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero
        title="Discover the Beauty of Kivu"
        subtitle="Experience unforgettable adventures in one of Africa's most breathtaking landscapes"
        images={heroImages}
        ctaText="Explore Tours"
        ctaLink="/tours"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/about"
      />

      {/* Featured Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Experiences</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of the most incredible adventures across the Kivu region
            </p>
          </div>
          {featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No featured tours available at the moment.</p>
          )}
          <div className="text-center mt-12">
            <Link to="/tours">
              <Button variant="outline">
                View All Tours <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Kivu landscape"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">About Kivu Safaris</h2>
              <p className="text-gray-600 mb-6">
                Kivu Safaris is a legally registered tourism company based in the Kivu region of Eastern Congo (DRC). Our
                mission is to showcase the natural beauty, cultural richness, and hospitality of Kivu through sustainable
                and community-driven travel experiences.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Focus</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                <li>Eco-tourism & nature adventures</li>
                <li>Cultural & heritage experiences</li>
                <li>Custom-made tours and safaris</li>
                <li>Local guide services and accommodation partnerships</li>
              </ul>
              <Link to="/about">
                <Button>Learn More About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Guests Say</h2>
            <p className="max-w-2xl mx-auto opacity-90">
              Read about the experiences of travelers who have explored the wonders of Kivu with us
            </p>
          </div>
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md text-gray-800">
                  <div className="flex items-center mb-4">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-300">No testimonials available at the moment.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Adventure?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us today to start planning your perfect Kivu experience. Our team is ready to help you create memories
            that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/tours">
              <Button size="large">Browse Our Tours</Button>
            </Link>
            <Link to="/contact">
              <Button size="large" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};