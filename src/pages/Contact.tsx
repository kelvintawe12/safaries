
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../components/common/Button';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  ChevronDownIcon,
  MessageCircleIcon,
  UsersIcon,
  GlobeIcon,
  StarIcon,
  SearchIcon,
} from 'lucide-react';

// Simulated API with retry logic
const submitContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: string;
}, retries = 3): Promise<{ success: boolean; message: string }> => {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (data.email === 'fail@example.com') {
        throw new Error('Failed to send message');
      }
      return { success: true, message: 'Your message has been sent successfully!' };
    } catch (error) {
      if (i === retries - 1) throw new Error('Failed to send message after multiple attempts');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Unexpected error');
};

// Toast Notification Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-2xl animate-slide-up flex items-center max-w-sm ${
        type === 'success'
          ? 'bg-green-500 text-white'
          : type === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-teal-500 text-white'
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

// Contact Card Component
const ContactCard = ({
  icon,
  title,
  details,
  socials,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  details: string[];
  socials?: { href: string; icon: React.ReactNode; label: string }[];
  index: number;
}) => (
  <div
    className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-coral-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    <div className="relative z-10">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      {details.map((detail, i) => (
        <p key={i} className="text-gray-600 mb-1">
          {detail}
        </p>
      ))}
      {socials && (
        <div className="mt-4 flex justify-center space-x-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-800 transform hover:scale-110 transition-all duration-200"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

// FAQ Accordion Component
const FAQAccordion = ({ searchQuery }: { searchQuery: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I book a tour with Kivu Safaris?',
      answer: 'Browse our tours, select your preferred option, and complete the booking form on our website.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 30+ days before the tour date receive a full refund. Contact us for details.',
    },
    {
      question: 'Can I request a custom tour?',
      answer: 'Yes, select "Custom Tour Request" in the contact form to discuss your preferences.',
    },
    {
      question: 'What safety measures are in place?',
      answer: 'We follow strict safety protocols, including trained guides and emergency response plans.',
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes, groups of 5+ may be eligible for discounts. Please inquire via the contact form.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredFaqs.length === 0 ? (
        <p className="text-center text-gray-600 animate-fade-in">No FAQs match your search.</p>
      ) : (
        filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-teal-50 transition-colors duration-200"
              aria-expanded={openIndex === index}
              aria-controls={`faq-${index}`}
            >
              <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
              <ChevronDownIcon
                className={`h-5 w-5 text-teal-600 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div
                id={`faq-${index}`}
                className="px-6 py-4 text-gray-600 animate-fade-in"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

// Stats Counter Component
const StatsCounter = () => {
  const [counts, setCounts] = useState({ tours: 0, clients: 0, countries: 0, rating: 0 });
  const targetCounts = { tours: 500, clients: 10000, countries: 20, rating: 4.8 };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        tours: Math.min(prev.tours + 10, targetCounts.tours),
        clients: Math.min(prev.clients + 200, targetCounts.clients),
        countries: Math.min(prev.countries + 1, targetCounts.countries),
        rating: Math.min(prev.rating + 0.1, targetCounts.rating),
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {[
        { icon: <GlobeIcon className="h-8 w-8" />, label: 'Tours Completed', value: counts.tours },
        { icon: <UsersIcon className="h-8 w-8" />, label: 'Happy Clients', value: counts.clients },
        { icon: <MapPinIcon className="h-8 w-8" />, label: 'Countries Visited', value: counts.countries },
        { icon: <StarIcon className="h-8 w-8" />, label: 'Average Rating', value: counts.rating.toFixed(1) },
      ].map((stat, index) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl shadow-lg text-center animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-700 rounded-full mb-4">
            {stat.icon}
          </div>
          <h3 className="text-3xl font-bold text-teal-600">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [formStatus, setFormStatus] = useState<{
    isSubmitting: boolean;
    progress: number;
    toast: { show: boolean; message: string; type: 'success' | 'error' | 'info' } | null;
  }>({
    isSubmitting: false,
    progress: 0,
    toast: null,
  });
  const [faqSearch, setFaqSearch] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Load form draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('contactFormDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      setFormStatus((prev) => ({
        ...prev,
        toast: { show: true, message: 'Restored your form draft!', type: 'info' },
      }));
    }
  }, []);

  // Autosave form draft
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [formData]);

  // Parallax effect for hero
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

  // Progress animation during submission
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (formStatus.isSubmitting) {
      interval = setInterval(() => {
        setFormStatus((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [formStatus.isSubmitting]);

  const validate = useCallback((data: typeof formData) => {
    const newErrors: Partial<typeof formData> = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email is required';
    if (data.phone && !data.phone.match(/^\+?\d{10,15}$/)) newErrors.phone = 'Valid phone number is required';
    if (!data.message.trim()) newErrors.message = 'Message is required';
    if (!data.preferredContact) newErrors.preferredContact = 'Please select a contact method';
    return newErrors;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof formData]) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      preferredContact: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormStatus((prev) => ({
        ...prev,
        toast: { show: true, message: 'Please correct the errors in the form.', type: 'error' },
      }));
      return;
    }

    setFormStatus((prev) => ({ ...prev, isSubmitting: true, progress: 10 }));
    try {
      const response = await submitContactForm(formData);
      setFormStatus({
        isSubmitting: false,
        progress: 100,
        toast: { show: true, message: response.message, type: 'success' },
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email',
      });
      setTouched({});
      setErrors({});
      localStorage.removeItem('contactFormDraft');
      // Simulate analytics tracking
      console.log('Analytics: Form submitted', { subject: formData.subject });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        progress: 0,
        toast: { show: true, message: 'Failed to send message. Please try again.', type: 'error' },
      });
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Sticky Contact Button */}
      <button
        onClick={scrollToForm}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-110 transition-all duration-300 z-50 animate-slide-up"
        aria-label="Contact us now"
      >
        <MessageCircleIcon className="h-6 w-6" />
      </button>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-r from-teal-800 to-teal-500 text-white py-32"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-slide-up tracking-tight">
            Let's Plan Your Safari
          </h1>
          <p
            className="max-w-3xl mx-auto text-xl md:text-2xl animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Connect with our expert team to craft your dream adventure in the heart of Africa.
          </p>
          <Button
            onClick={scrollToForm}
            size="large"
            className="mt-8 bg-coral-500 text-white hover:bg-coral-600 transform hover:scale-105 transition-transform duration-300 animate-slide-up px-8 py-3 text-lg animate-delay-[400ms]"
            aria-label="Get started"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Our Achievements
          </h2>
          <StatsCounter />
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Reach Out to Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <PhoneIcon className="h-6 w-6" />,
                title: 'Phone',
                details: ['+243 123 456 789', '+243 987 654 321'],
              },
              {
                icon: <MailIcon className="h-6 w-6" />,
                title: 'Email',
                details: ['info@kivusafaris.com', 'bookings@kivusafaris.com'],
                socials: [
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
                ],
              },
              {
                icon: <MapPinIcon className="h-6 w-6" />,
                title: 'Office',
                details: ['123 Main Street', 'Goma, North Kivu, DRC'],
              },
            ].map((item, index) => (
              <ContactCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 animate-slide-up">
              Send Us a Message
            </h2>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-xl animate-slide-up relative"
            >
              {formStatus.isSubmitting && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-2xl z-10">
                  <div className="w-full max-w-xs">
                    <div className="bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${formStatus.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-gray-600 mt-2">Sending your message...</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name', 'email'].map((field) => (
                  <div key={field} className="relative group">
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                        errors[field as keyof typeof formData] && touched[field as keyof typeof formData]
                          ? 'border-red-500'
                          : 'border-gray-300 group-hover:border-teal-300'
                      }`}
                      placeholder=" "
                      required
                      aria-describedby={`${field}-error`}
                    />
                    <label
                      className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                        errors[field as keyof typeof formData] && touched[field as keyof typeof formData] ? 'text-red-500' : ''
                      }`}
                    >
                      {field === 'name' ? 'Your Name' : 'Email Address'}
                    </label>
                    {errors[field as keyof typeof formData] && touched[field as keyof typeof formData] && (
                      <p
                        id={`${field}-error`}
                        className="text-red-500 text-sm mt-1 animate-shake"
                      >
                        {errors[field as keyof typeof formData]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                      errors.phone && touched.phone
                        ? 'border-red-500'
                        : 'border-gray-300 group-hover:border-teal-300'
                    }`}
                    placeholder=" "
                    aria-describedby="phone-error"
                  />
                  <label
                    className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                      errors.phone && touched.phone ? 'text-red-500' : ''
                    }`}
                  >
                    Phone Number
                  </label>
                  {errors.phone && touched.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1 animate-shake">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="relative group">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 group-hover:border-teal-300 appearance-none transition-all duration-300"
                    aria-label="Subject"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tour Booking">Tour Booking</option>
                    <option value="Custom Tour Request">Custom Tour Request</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                  <label className="absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300">
                    Subject
                  </label>
                </div>
              </div>
              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer transition-all duration-300 ${
                    errors.message && touched.message
                      ? 'border-red-500'
                      : 'border-gray-300 group-hover:border-teal-300'
                  }`}
                  placeholder=" "
                  required
                  aria-describedby="message-error"
                />
                <label
                  className={`absolute left-4 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                    errors.message && touched.message ? 'text-red-500' : ''
                  }`}
                >
                  Your Message
                </label>
                {errors.message && touched.message && (
                  <p
                    id="message-error"
                    className="text-red-500 text-sm mt-1 animate-shake"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex space-x-4">
                  {['email', 'phone', 'either'].map((method) => (
                    <label
                      key={method}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                        aria-describedby="preferredContact-error"
                      />
                      <span className="text-gray-600 capitalize">{method}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredContact && touched.preferredContact && (
                  <p
                    id="preferredContact-error"
                    className="text-red-500 text-sm mt-1 animate-shake"
                  >
                    {errors.preferredContact}
                  </p>
                )}
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  size="large"
                  disabled={formStatus.isSubmitting}
                  className="bg-teal-600 text-white hover:bg-teal-700 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center w-full py-4 text-lg"
                  aria-label="Send message"
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
                aria-label="Search FAQs"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion searchQuery={faqSearch} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 animate-slide-up">
            Visit Our Office
          </h2>
          <div className="max-w-5xl mx-auto h-[500px] rounded-2xl overflow-hidden shadow-xl animate-slide-up transform hover:scale-[1.01] transition-transform duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.676357225832!2d29.2333333!3d-1.6833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i landet!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNDEnMDAuMCJTIDI5wrAxNCc0MC4wIkU!5e0!3m2!1sen!2sus!4v1634567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Kivu Safaris Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
                  <a href="/tours" className="text-gray-300 hover:text-white transition-colors">
                    Browse Tours
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormStatus((prev) => ({
                    ...prev,
                    toast: {
                      show: true,
                      message: 'Subscribed to newsletter!',
                      type: 'success',
                    },
                  }));
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

      {/* Toast Notification */}
      {formStatus.toast?.show && (
        <Toast
          message={formStatus.toast.message}
          type={formStatus.toast.type}
          onClose={() =>
            setFormStatus((prev) => ({ ...prev, toast: null }))
          }
        />
      )}
    </div>
  );
};