import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  SendIcon,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';

// Slideshow images from Pexels
const slideshowImages = [
  {
    url: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Virunga volcano landscape, photo by Pixabay on Pexels',
  },
  {
    url: 'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Mountain gorilla in the wild, photo by Pixabay on Pexels',
  },
  {
    url: 'https://images.pexels.com/photos/1612463/pexels-photo-1612463.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Lake Kivu sunset, photo by Taryn Elliott on Pexels',
  },
  {
    url: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'African cultural scene, photo by Pixabay on Pexels',
  },
];

// Newsletter form schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Slideshow Component
const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slideshowImages.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}
    </div>
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
        type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
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

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onNewsletterSubmit = async (data: NewsletterFormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to subscribe');
      setToast({ show: true, message: t('footer.newsletter.success'), type: 'success' });
      reset();
    } catch {
      setToast({ show: true, message: t('footer.newsletter.error'), type: 'error' });
    }
  };

  return (
    <footer className="relative text-white overflow-hidden min-h-[600px]">
      {/* Background Slideshow */}
      <BackgroundSlideshow />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div
            className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <img
              src="/assets/logo-white.svg"
              alt={t('footer.logoAlt')}
              className="h-14 mb-6 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)]"
            />
            <p className="text-gray-200 text-lg font-light mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-6">
              {[
                { Icon: FacebookIcon, href: 'https://facebook.com/kivusafaris', label: 'Facebook' },
                { Icon: InstagramIcon, href: 'https://instagram.com/kivusafaris', label: 'Instagram' },
                { Icon: TwitterIcon, href: 'https://twitter.com/kivusafaris', label: 'Twitter' },
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-yellow-400 hover:scale-110 transition-all duration-300 animate-pulse-on-click"
                  aria-label={t('footer.social', { platform: label })}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <Icon className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <h3 className="text-xl font-semibold mb-5 text-teal-600">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'home' },
                { to: '/about', label: 'about' },
                { to: '/tours', label: 'tours' },
                { to: '/contact', label: 'contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-200 hover:text-yellow-400 hover:underline hover:scale-95 transition-all duration-300"
                    aria-label={t(`footer.links.${label}`)}
                  >
                    {t(`footer.links.${label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div
            className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <h3 className="text-xl font-semibold mb-5 text-teal-600">{t('footer.legal')}</h3>
            <ul className="space-y-4">
              {[
                { to: '/privacy', label: 'privacy' },
                { to: '/faq', label: 'faq' },
                { to: '/terms', label: 'terms' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-200 hover:text-yellow-400 hover:underline hover:scale-95 transition-all duration-300"
                    aria-label={t(`footer.legalLinks.${label}`)}
                  >
                    {t(`footer.legalLinks.${label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <h3 className="text-xl font-semibold mb-5 text-teal-600">{t('footer.contact')}</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPinIcon className="h-6 w-6 mr-3 text-teal-600 mt-0.5" />
                <span className="text-gray-200">{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-6 w-6 mr-3 text-teal-600" />
                <a
                  href="tel:+243123456789"
                  className="text-gray-200 hover:text-yellow-400 hover:scale-95 transition-all duration-300"
                  aria-label={t('footer.phone')}
                >
                  +243 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-6 w-6 mr-3 text-teal-600" />
                <a
                  href="mailto:info@kivusafaris.com"
                  className="text-gray-200 hover:text-yellow-400 hover:scale-95 transition-all duration-300"
                  aria-label={t('footer.email')}
                >
                  info@kivusafaris.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-teal-700 to-yellow-600 p-10 rounded-2xl shadow-lg animate-slide-up mt-10">
            <h3 className="text-2xl font-bold mb-5 text-white">{t('footer.newsletter.title')}</h3>
            <p className="text-gray-100 text-lg mb-6">{t('footer.newsletter.description')}</p>
            <form onSubmit={handleSubmit(onNewsletterSubmit)} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <input
                  {...register('email')}
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/95 text-gray-900 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300 group-hover:border-yellow-400'
                  }`}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-300 animate-shake">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:-translate-y-0.5 transform transition-all duration-300 animate-pulse-on-click shadow-lg"
                aria-label={t('footer.newsletter.submit')}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-gray-900"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t('footer.newsletter.submitting')}
                  </>
                ) : (
                  <>
                    <SendIcon className="h-5 w-5 mr-2" />
                    {t('footer.newsletter.submit')}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 mt-12 pt-8 text-center animate-slide-up">
          <p className="text-gray-300 text-sm">
            {t('footer.copyright', { year: currentYear.toString() })}
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast?.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </footer>
  );
};