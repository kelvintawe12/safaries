import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Slideshow } from '../components/features/hero/Slideshow';
import { Button } from '../components/common/Button';
import { tours } from '../data/tours';
import { MapPinIcon, CalendarIcon, DollarSignIcon, CheckIcon, XIcon, ChevronLeftIcon } from 'lucide-react';
export const TourDetail = () => {
  const {
    id
  } = useParams();
  const tour = tours.find(t => t.id === Number(id));
  if (!tour) {
    return <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Tour Not Found</h2>
          <Link to="/tours">
            <Button>
              <ChevronLeftIcon className="h-5 w-5 mr-2" />
              Back to Tours
            </Button>
          </Link>
        </div>
      </div>;
  }
  return <div className="bg-white w-full">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Slideshow images={tour.images} className="h-full" />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="h-5 w-5 mr-2" />
                  <span>${tour.price} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <p className="text-gray-700 mb-8">{tour.description}</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* What's Included */}
              <div>
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {tour.included.map((item, index) => <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
              {/* What's Not Included */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Not Included</h3>
                <ul className="space-y-3">
                  {tour.notIncluded.map((item, index) => <li key={index} className="flex items-start">
                      <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
            </div>
            {/* Itinerary */}
            <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
            <div className="space-y-6 mb-12">
              {tour.itinerary.map((day, index) => <div key={index} className="border-l-4 border-teal-600 pl-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Day {day.day}: {day.title}
                  </h3>
                  <p className="text-gray-700">{day.description}</p>
                </div>)}
            </div>
            {/* Booking CTA */}
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Book This Tour?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact us to check availability and make your reservation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button size="large">Book Now</Button>
                </Link>
                <Link to="/tours">
                  <Button size="large" variant="outline">
                    View Other Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};