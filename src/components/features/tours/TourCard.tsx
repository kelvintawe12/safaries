import React from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '../../../types';
import { Slideshow } from '../hero/Slideshow';
import { MapPinIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
interface TourCardProps {
  tour: Tour;
}
export const TourCard = ({
  tour
}: TourCardProps) => {
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-64">
        <Slideshow images={tour.images} interval={7000} />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
        <div className="flex flex-wrap gap-y-2 mb-3">
          <div className="flex items-center text-gray-600 mr-4">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{tour.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mr-4">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{tour.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSignIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">${tour.price} USD</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
        <Link to={`/tours/${tour.id}`} className="inline-block text-teal-700 font-medium hover:underline">
          View Details
        </Link>
      </div>
    </div>;
};