import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface SlideshowProps {
  images: { src: string; alt?: string }[];
  interval?: number;
  autoplay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  transitionDuration?: number; // New prop
}

export const Slideshow = ({
  images,
  interval = 5000,
  autoplay = true,
  showDots = true,
  showArrows = true,
  className = '',
  transitionDuration = 1000, // Default to 1 second
}: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      goToNext();
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval]);

  if (!images.length) {
    return (
      <div className="text-center text-gray-500">
        <p>No images available for the slideshow.</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: `${transitionDuration}ms` }}
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Navigation arrows */}
        {showArrows && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
        {/* Indicators */}
        {showDots && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
