import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';
import { generateReceipt } from '../utils/receipt';
import { LoadingState } from '../components/common/LoadingState';

interface ClientDetails {
  name: string;
  email: string;
  phone: string;
}

interface TourDetails {
  title: string;
  date: string;
  participants: number;
  price: number;
  specialRequests?: string;
}

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  duration: string;
  included: string[];
  itinerary: { day: number; description: string }[];
  notIncluded: string[];
  location: string;
  featured?: boolean;
}

interface Booking {
  id: string;
  userId: string;
  tourId: number;
  tourDate: string;
  participants: number;
  totalPrice: number;
  createdAt: string;
  paymentMethod: string;
  depositPaid: boolean;
  specialRequests?: string;
  clientDetails: ClientDetails;
}

interface Receipt {
  id: string;
  bookingId: string;
  uniqueId: string;
  clientDetails: ClientDetails;
  tourDetails: TourDetails;
  createdAt: string;
}

const sendEmailInvitation = async (data: {
  senderName: string;
  recipientEmail: string;
  tour: Tour;
}): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (data.recipientEmail === 'fail@example.com') {
    throw new Error('Failed to send invitation');
  }
  return { success: true, message: `Invitation sent to ${data.recipientEmail}` };
};

const generateEmailTemplate = (senderName: string, tour: Tour): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: #1a7f7a; padding: 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; }
    .content h2 { color: #333333; font-size: 20px; }
    .content p { color: #666666; line-height: 1.6; }
    .tour-details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .tour-details h3 { color: #1a7f7a; margin-top: 0; }
    .cta { text-align: center; margin: 20px 0; }
    .cta a { display: inline-block; background: #1a7f7a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .footer { background: #f4f4f4; padding: 10px; text-align: center; color: #999999; font-size: 12px; }
    @media (max-width: 600px) {
      .container { margin: 10px; }
      .header h1 { font-size: 20px; }
      .content h2 { font-size: 18px; }
      .cta a { padding: 10px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Join ${senderName} on an Epic Adventure!</h1>
    </div>
    <div class="content">
      <h2>You're Invited to Explore ${tour.title}</h2>
      <p>Hi there,</p>
      <p>${senderName} thinks you'll love this incredible tour with Kivu Safaris! Check out the details below and join the adventure.</p>
      <div class="tour-details">
        <h3>${tour.title}</h3>
        <p><strong>Description:</strong> ${tour.description}</p>
        <p><strong>Duration:</strong> ${tour.duration}</p>
        <p><strong>Location:</strong> ${tour.location}</p>
        <p><strong>Price:</strong> $${tour.price} USD</p>
        <p><strong>Highlights:</strong></p>
        <ul>
          ${tour.included.map((highlight) => `<li>${highlight}</li>`).join('')}
        </ul>
      </div>
      <div class="cta">
        <a href="https://kivu-safaris.com/tours/${tour.id}" target="_blank">Explore This Tour</a>
      </div>
      <p>Ready to join? Visit our website to book your spot or learn more about this unforgettable experience!</p>
    </div>
    <div class="footer">
      <p>© 2025 Kivu Safaris. All rights reserved.<br>123 Adventure Lane, Safari City</p>
    </div>
  </div>
</body>
</html>
`;

const RegisterForm = ({ onProceed, onRegister }: { onProceed: () => void; onRegister: (data: ClientDetails) => void }) => {
  const [formData, setFormData] = useState<ClientDetails>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Partial<ClientDetails>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ClientDetails, boolean>>>({});

  const validate = (data: ClientDetails): Partial<ClientDetails> => {
    const newErrors: Partial<ClientDetails> = {};
    if (!data.name.trim()) newErrors.name = 'Full name is required';
    if (!data.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email is required';
    if (!data.phone.match(/^\+?\d{10,15}$/)) newErrors.phone = 'Valid phone number is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof ClientDetails]) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true });
    if (Object.keys(validationErrors).length === 0) {
      onRegister(formData);
      onProceed();
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full animate-slide-up">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Start Your Adventure</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {(['name', 'email', 'phone'] as const).map((field) => (
          <div key={field} className="relative">
            <input
              type={field === 'phone' ? 'tel' : field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer ${
                errors[field] && touched[field] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=" "
              aria-describedby={`${field}-error`}
            />
            <label
              className={`absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
                errors[field] && touched[field] ? 'text-red-500' : ''
              }`}
            >
              {field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            {errors[field] && touched[field] && (
              <p id={`${field}-error`} className="text-red-500 text-sm mt-1">
                {errors[field]}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 duration-200 font-semibold"
          aria-label="Proceed to tour selection"
        >
          Proceed to Tour Selection
        </button>
      </form>
    </div>
  );
};

const TourSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tours.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + tours.length) % tours.length);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % tours.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="min-w-full h-96 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${tour.images[0] || 'https://via.placeholder.com/800x400'})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white">{tour.title}</h3>
                <p className="text-white">{tour.description.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors transform hover:scale-110 duration-200"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors transform hover:scale-110 duration-200"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'An unforgettable experience! The tour was well-organized, and the guides were amazing.',
      rating: 5,
    },
    {
      name: 'James T.',
      text: 'Loved the adventure and the breathtaking views. Highly recommend!',
      rating: 4,
    },
    {
      name: 'Emma L.',
      text: 'Fantastic service and a seamless booking process. Will book again!',
      rating: 5,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-slide-up">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-gray-600 italic">"{testimonial.text}"</p>
            <p className="mt-4 font-semibold text-gray-800">{testimonial.name}</p>
            <div className="flex mt-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.574 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TourCard = ({
  tour,
  onSelect,
  clientDetails,
}: {
  tour: Tour;
  onSelect: (id: number) => void;
  clientDetails: ClientDetails | null;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteFormData, setInviteFormData] = useState({
    senderName: clientDetails?.name || '',
    recipientEmail: '',
  });
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tour.images.length]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    const shareData = {
      title: tour.title,
      text: `Check out this amazing tour: ${tour.title}! ${tour.description.slice(0, 100)}...`,
      url: `https://kivu-safaris.com/tours/${tour.id}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      alert(
        `Share this tour:\nTwitter: https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareData.text
        )}&url=${encodeURIComponent(
          shareData.url
        )}\nFacebook: https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
      );
    }
  };

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInviteFormData((prev) => ({ ...prev, [name]: value }));
    if (inviteError) setInviteError('');
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSuccess('');
    const { senderName, recipientEmail } = inviteFormData;

    if (!senderName.trim()) {
      setInviteError('Please enter your name');
      return;
    }
    if (!recipientEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setInviteError('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    try {
      const response = await sendEmailInvitation({ senderName, recipientEmail, tour });
      setInviteSuccess(response.message);
      setInviteFormData({ senderName: clientDetails?.name || '', recipientEmail: '' });
      setTimeout(() => {
        setShowInviteForm(false);
        setInviteSuccess('');
      }, 3000);
    } catch (error) {
      setInviteError('Failed to send invitation. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-slide-up">
      <div className="relative w-full h-48 mb-4">
        <img
          src={tour.images[currentImageIndex] || 'https://via.placeholder.com/300x200'}
          alt={tour.title}
          className="w-full h-full object-cover rounded-lg transition-opacity duration-500"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 bg-white bg-opacity-75 p-1 rounded-full hover:bg-opacity-100 transform hover:scale-110 transition-transform duration-200"
            aria-label={isLiked ? 'Unlike tour' : 'Like tour'}
          >
            <svg
              className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">{likeCount}</span>
          </button>
          <button
            onClick={handleShare}
            className="bg-white bg-opacity-75 p-1 rounded-full hover:bg-opacity-100 transform hover:scale-110 transition-transform duration-200"
            aria-label="Share tour"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
      <p className="text-gray-600 mt-2 line-clamp-3">{tour.description}</p>
      <p className="text-teal-600 font-bold mt-2">${tour.price} USD</p>
      <p className="text-gray-600 mt-1">Duration: {tour.duration}</p>
      <p className="text-gray-600 mt-1">Location: {tour.location}</p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => onSelect(tour.id)}
          className="flex-1 bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 duration-200"
          aria-label={`Book ${tour.title}`}
        >
          Book Now
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors transform hover:scale-105 duration-200"
          aria-label={isExpanded ? 'View less details' : 'View more details'}
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>
        <button
          onClick={() => setShowInviteForm(true)}
          className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105 duration-200"
          aria-label={`Invite a friend to ${tour.title}`}
        >
          Invite a Friend
        </button>
      </div>
      {showInviteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full animate-slide-up-bounce shadow-2xl"
            role="dialog"
            aria-labelledby="invite-form-title"
          >
            <button
              onClick={() => setShowInviteForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close invite form"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 id="invite-form-title" className="text-2xl font-bold text-gray-800 mb-6">
              Invite a Friend to {tour.title}
            </h3>
            <form onSubmit={handleInvite} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="senderName"
                  value={inviteFormData.senderName}
                  onChange={handleInviteChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer ${
                    inviteError && !inviteFormData.senderName.trim() ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder=" "
                  disabled={!!clientDetails?.name}
                  aria-describedby="senderName-error"
                />
                <label
                  className={`absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 ${
                    inviteError && !inviteFormData.senderName.trim() ? 'text-red-500' : ''
                  }`}
                >
                  Your Name
                </label>
                {inviteError && !inviteFormData.senderName.trim() && (
                  <p id="senderName-error" className="text-red-500 text-sm mt-1">
                    {inviteError}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="recipientEmail"
                  value={inviteFormData.recipientEmail}
                  onChange={handleInviteChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer ${
                    inviteError && !inviteFormData.recipientEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder=" "
                  aria-describedby="recipientEmail-error"
                />
                <label
                  className={`absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 ${
                    inviteError && !inviteFormData.recipientEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                      ? 'text-red-500'
                      : ''
                  }`}
                >
                  Friend's Email
                </label>
                {inviteError && !inviteFormData.recipientEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) && (
                  <p id="recipientEmail-error" className="text-red-500 text-sm mt-1">
                    {inviteError}
                  </p>
                )}
              </div>
              {inviteSuccess && (
                <p className="text-green-500 text-sm" aria-live="polite">
                  {inviteSuccess}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105 duration-200 flex items-center justify-center"
                disabled={isSending}
                aria-label="Send invitation"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Invitation'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slide-up">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Highlights</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {(tour.included || []).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Itinerary</h4>
            {(tour.itinerary || []).map((item) => (
              <div key={item.day} className="mt-2">
                <p className="font-medium text-gray-800">Day {item.day}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Inclusions</h4>
            <ul className="list-disc pl-5 text-gray-600">
            {(tour.notIncluded || []).map((inclusion, index) => (
              <li key={index}>{inclusion}</li>
            ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

interface BookingFormData {
  tourDate: string;
  participants: number;
  paymentMethod: string;
  depositPaid: boolean;
  specialRequests: string;
}

const BookingForm = ({
  tour,
  onSubmit,
  initialData,
}: {
  tour: Tour;
  onSubmit: (data: BookingFormData) => void;
  initialData?: Partial<Booking>;
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    tourDate: initialData?.tourDate || '',
    participants: initialData?.participants || 1,
    paymentMethod: initialData?.paymentMethod || 'credit_card',
    depositPaid: initialData?.depositPaid || false,
    specialRequests: initialData?.specialRequests || '',
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const validate = (data: BookingFormData): Partial<BookingFormData> => {
    const newErrors: Partial<BookingFormData> = {};
    const today = new Date().toISOString().split('T')[0];
    if (!data.tourDate || data.tourDate < today) newErrors.tourDate = 'Please select a future date';
    if (data.participants < 1) newErrors.participants = 'At least one participant is required';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors(validate({ ...formData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book {tour.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="date"
            name="tourDate"
            value={formData.tourDate}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer ${
              errors.tourDate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
            aria-describedby="tourDate-error"
          />
          <label
            className={`absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
              errors.tourDate ? 'text-red-500' : ''
            }`}
          >
            Tour Date
          </label>
          {errors.tourDate && (
            <p id="tourDate-error" className="text-red-500 text-sm mt-1">
              {errors.tourDate}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            min="1"
            required
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer ${
              errors.participants ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
            aria-describedby="participants-error"
          />
          <label
            className={`absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500 ${
              errors.participants ? 'text-red-500' : ''
            }`}
          >
            Participants
          </label>
          {errors.participants && (
            <p id="participants-error" className="text-red-500 text-sm mt-1">
              {errors.participants}
            </p>
          )}
        </div>
        <div className="relative">
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Payment method"
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
          <label
            className="absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300"
          >
            Payment Method
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="depositPaid"
              checked={formData.depositPaid}
              onChange={handleChange}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500"
              aria-label="Deposit paid"
            />
            <span className="text-sm font-medium text-gray-700">Deposit Paid</span>
          </label>
        </div>
        <div className="relative">
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 peer"
            rows={4}
            placeholder=" "
            aria-label="Special requests"
          />
          <label
            className="absolute left-3 -top-2.5 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-teal-500"
          >
            Special Requests
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 duration-200"
          aria-label={initialData ? 'Update booking' : 'Confirm booking'}
        >
          {initialData ? 'Update Booking' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

const ErrorToast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-slide-up">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-white hover:text-gray-200"
        aria-label="Close error message"
      >
        ×
      </button>
    </div>
  );
};

const BookingEntry = () => {
  const [step, setStep] = useState<'register' | 'select-tour' | 'book' | 'confirmed'>('register');
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegistrationProceed = () => {
    setStep('select-tour');
  };

  const handleRegister = (data: ClientDetails) => {
    setClientDetails(data);
  };

  const handleTourSelect = (tourId: number) => {
    setSelectedTourId(tourId);
    setStep('book');
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    if (!selectedTourId || !clientDetails) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const tour = tours.find((t) => t.id === selectedTourId);
      if (!tour) throw new Error('Tour not found');

      const booking: Booking = {
        id: Math.floor(Math.random() * 1000000).toString(),
        userId: '1',
        tourId: selectedTourId,
        tourDate: data.tourDate,
        participants: Number(data.participants),
        totalPrice: tour.price * Number(data.participants),
        createdAt: new Date().toISOString(),
        paymentMethod: data.paymentMethod,
        depositPaid: data.depositPaid,
        specialRequests: data.specialRequests || undefined,
        clientDetails,
      };

      setBookingDetails(booking);

      const receipt: Receipt = {
        id: `rec_${booking.id}`,
        bookingId: booking.id,
        uniqueId: `${booking.userId}-${new Date(booking.createdAt).getTime()}-${new Date(
          booking.createdAt
        ).toLocaleString('en-US', { weekday: 'short' })}`,
        clientDetails,
        tourDetails: {
          title:
            typeof tour.title === 'string'
              ? { en: tour.title, fr: tour.title, rw: tour.title }
              : tour.title,
          date: booking.tourDate,
          participants: booking.participants,
          price: booking.totalPrice,
          specialRequests: booking.specialRequests,
        },
        paymentDetails: {
          total: booking.totalPrice,
          deposit: booking.depositPaid ? booking.totalPrice * 0.1 : 0,
          balance: booking.depositPaid ? booking.totalPrice * 0.9 : booking.totalPrice,
          currency: 'USD',
          method: booking.paymentMethod,
          transactionId: '',
          paidAt: booking.createdAt,
        },
        createdAt: booking.createdAt,
        updatedAt: booking.createdAt,
      };

      const receiptBlob = await generateReceipt(receipt);
      const url = URL.createObjectURL(receiptBlob);
      setReceiptUrl(url);
      setStep('confirmed');
    } catch (error) {
      console.error('Booking failed:', error);
      setError('Failed to process booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingUpdate = async (data: BookingFormData) => {
    if (!bookingDetails || !selectedTourId || !clientDetails) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const tour = tours.find((t) => t.id === bookingDetails.tourId);
      if (!tour) throw new Error('Tour not found');

      const updatedBooking: Booking = {
        ...bookingDetails,
        tourDate: data.tourDate,
        participants: Number(data.participants),
        totalPrice: tour.price * Number(data.participants),
        paymentMethod: data.paymentMethod,
        depositPaid: data.depositPaid,
        specialRequests: data.specialRequests || undefined,
        clientDetails,
      };

      setBookingDetails(updatedBooking);
      setStep('confirmed');
    } catch (error) {
      console.error('Failed to update booking:', error);
      setError('Failed to update booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Processing your request..." />;
  }

  if (step === 'register') {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-slide-up">Book Your Dream Safari</h1>
          <p
            className="text-lg text-white mb-12 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Join us for an unforgettable adventure. Register now to explore our exclusive tours!
          </p>
          <RegisterForm onProceed={handleRegistrationProceed} onRegister={handleRegister} />
          <TourSlideshow />
          <Testimonials />
        </div>
        {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      </div>
    );
  }

  if (step === 'select-tour') {
    const getTitle = (title: string | { en: string; fr: string; rw: string }) => {
      if (typeof title === 'string') return title;
      return title.en || 'Unknown Tour';
    };

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-slide-up">
            Select a Tour
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TourCard
                  tour={{ ...tour, title: getTitle(tour.title) }}
                  onSelect={handleTourSelect}
                  clientDetails={clientDetails}
                />
              </div>
            ))}
          </div>
        </div>
        {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      </div>
    );
  }

  if (step === 'book') {
    const tour = tours.find((t) => t.id === selectedTourId);
    if (!tour) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <p className="text-red-600">Error: Selected tour not found.</p>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <BookingForm
            tour={tour}
            onSubmit={bookingDetails ? handleBookingUpdate : handleBookingSubmit}
            initialData={bookingDetails || undefined}
          />
        </div>
        {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      </div>
    );
  }

  if (step === 'confirmed' && bookingDetails && clientDetails) {
    const tour = tours.find((t) => t.id === bookingDetails.tourId);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed</h2>
          <p className="text-gray-600 mb-6">
            Thank you, {clientDetails.name}, for your booking! Here are your details:
          </p>
          <div className="text-left space-y-2 mb-6">
            <p>
              <strong>Tour:</strong> {tour?.title || 'Unknown Tour'}
            </p>
            <p>
              <strong>Date:</strong> {bookingDetails.tourDate}
            </p>
            <p>
              <strong>Participants:</strong> {bookingDetails.participants}
            </p>
            <p>
              <strong>Total Price:</strong> ${bookingDetails.totalPrice}
            </p>
            <p>
              <strong>Payment Method:</strong>{' '}
              {bookingDetails.paymentMethod.replace('_', ' ').toUpperCase()}
            </p>
            <p>
              <strong>Deposit Paid:</strong> {bookingDetails.depositPaid ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Email:</strong> {clientDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {clientDetails.phone}
            </p>
            {bookingDetails.specialRequests && (
              <p>
                <strong>Special Requests:</strong> {bookingDetails.specialRequests}
              </p>
            )}
          </div>
          {receiptUrl && (
            <a
              href={receiptUrl}
              download="kivu-safaris-receipt.pdf"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 duration-200"
              aria-label="Download receipt"
            >
              Download Receipt
            </a>
          )}
          <div className="mt-6 space-y-4">
            <button
              onClick={() => setStep('book')}
              className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-105 duration-200"
              aria-label="Edit booking"
            >
              Edit Booking
            </button>
            <Link
              to="/my-bookings"
              className="block text-teal-600 hover:underline font-medium"
              aria-label="View my bookings"
            >
              View My Bookings
            </Link>
          </div>
        </div>
        {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <p className="text-red-600">Error: Invalid state. Please try again.</p>
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default BookingEntry;