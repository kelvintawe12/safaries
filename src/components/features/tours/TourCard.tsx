// Description: This component displays a card for a tour, including images, title, metadata, rating, tags, description, and action buttons.
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '../../../types';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Button } from '../../common/Button';
import {
  MapPinIcon,
  CalendarIcon,
  DollarSignIcon,
  StarIcon,
  TagIcon,
  ArrowRightIcon,
} from 'lucide-react';

interface TourCardProps {
  tour: Tour;
}

// Enhanced Slideshow Component
const Slideshow = ({
  images,
  interval = 7000,
}: {
  images: string[];
  interval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, interval, isPaused]);

  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative h-64 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Tour image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-coral-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const TourCard = ({ tour }: TourCardProps) => {
  const { t, language } = useLanguage();

  // Get next available date
  const nextDate =
    (tour.availableDates?.length ?? 0) > 0
      ? new Date(tour.availableDates.sort()[0]).toLocaleDateString(language)
      : t('tourCard.noDates');

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up">
      {/* Featured Badge */}
      {tour.featured && (
        <div className="absolute top-4 left-4 bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-fade-in">
          {t('tourCard.featured')}
        </div>
      )}

      {/* Slideshow */}
      <div className="relative h-64">
        <Slideshow images={tour.images} interval={7000} />
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">
          {tour.title[language]}
        </h3>

        {/* Metadata */}
        <div className="flex flex-wrap gap-y-3 gap-x-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-1 text-teal-600" />
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1 text-teal-600" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center">
            <DollarSignIcon className="h-4 w-4 mr-1 text-teal-600" />
            <span>
              {tour.currency} {tour.price}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1 text-teal-600" />
            <span>
              {t('tourCard.nextDate')}: {nextDate}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < (tour.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({tour.reviews || 0} {t('tourCard.reviews')})
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[tour.category, tour.difficulty, ...(tour.tags || [])].map(
            (tag, index) =>
              tag && (
                <span
                  key={index}
                  className="flex items-center bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              )
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-2">
          {tour.description[language]}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link
            to={`/tours/${tour.id}`}
            className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-800 transition-colors"
            aria-label={t('tourCard.viewDetails')}
          >
            {t('tourCard.viewDetails')}
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
          <Link to="/booking">
            <Button
              className="bg-coral-500 text-white hover:bg-coral-600 transform hover:scale-105 transition-transform duration-300"
              aria-label={t('tourCard.bookNow')}
            >
              {t('tourCard.bookNow')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
