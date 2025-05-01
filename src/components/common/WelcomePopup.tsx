import React, { useState, useEffect } from 'react';

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Show popup after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setIsVisible(false)}
          aria-label="Close welcome popup"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to Our Site!</h2>
        <img
          src="/welcome.jpg"
          alt="Welcome"
          className="mx-auto mb-4 rounded"
        />
        <p className="text-center text-gray-700">
          We're glad you're here. Enjoy exploring our site!
        </p>
      </div>
    </div>
  );
};

export default WelcomePopup;
