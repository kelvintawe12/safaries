import React from 'react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
export const About = () => {
  return <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Kivu landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore. Experience. Connect.
            </p>
          </div>
        </div>
      </section>
      {/* Who We Are Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              Kivu Safaris is a legally registered tourism company based in the
              Kivu region of Eastern Congo (DRC). Our mission is to showcase the
              natural beauty, cultural richness, and hospitality of Kivu through
              sustainable and community-driven travel experiences.
            </p>
            <h2 className="text-3xl font-bold mb-6 mt-12">Our Focus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Eco-tourism & Nature Adventures
                </h3>
                <p className="text-gray-700">
                  We specialize in showcasing the incredible natural landscapes
                  of the Kivu region, from the stunning Lake Kivu to the
                  majestic Virunga volcanoes, all while promoting environmental
                  conservation and sustainability.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Cultural & Heritage Experiences
                </h3>
                <p className="text-gray-700">
                  Our tours provide authentic cultural immersion, connecting
                  travelers with local communities, traditions, and the rich
                  heritage of the Kivu region through respectful and meaningful
                  interactions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Custom-made Tours and Safaris
                </h3>
                <p className="text-gray-700">
                  We create personalized travel experiences tailored to your
                  interests, preferences, and schedule, ensuring that each
                  journey is unique and meets your expectations.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Local Guide Services
                </h3>
                <p className="text-gray-700">
                  Our experienced local guides provide expert knowledge,
                  ensuring your safety and enhancing your understanding of the
                  region's ecology, history, and culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Vision Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl max-w-2xl mx-auto">
            To become the leading travel brand that connects people to the heart
            of Kivu while supporting local communities and protecting the
            environment.
          </p>
        </div>
      </section>
      {/* Where We Operate */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Where We Operate</h2>
            <p className="text-gray-700 mb-6">
              Our services span across both North Kivu and South Kivu, including
              Goma, Bukavu, Idjwi Island, Virunga landscapes, Lake Kivu shores,
              and nearby cultural and natural attractions.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-3">Legal Status</h3>
              <p className="text-gray-700">
                Kivu Safaris is officially registered with relevant tourism and
                business authorities in the Democratic Republic of Congo. All
                operations are conducted in compliance with national and
                regional tourism regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Kivu?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join us for an unforgettable journey through one of Africa's most
            beautiful regions. Our team is ready to help you plan your perfect
            adventure.
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
    </div>;
};