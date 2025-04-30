import React from 'react';
import { Slideshow } from './Slideshow';
import { Button } from '../../common/Button';
interface HeroProps {
  title: string;
  subtitle: string;
  images: string[];
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}
export const Hero = ({
  title,
  subtitle,
  images,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}: HeroProps) => {
  return <div className="relative h-[70vh] min-h-[500px] w-full">
      <Slideshow images={images} className="h-full" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="large" variant="primary" onClick={() => window.location.href = ctaLink}>
              {ctaText}
            </Button>
            {secondaryCtaText && secondaryCtaLink && <Button size="large" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={() => window.location.href = secondaryCtaLink}>
                {secondaryCtaText}
              </Button>}
          </div>
        </div>
      </div>
    </div>;
};