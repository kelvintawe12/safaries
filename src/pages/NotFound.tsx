import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { HomeIcon } from 'lucide-react';
export const NotFound = () => {
  return <div className="bg-white w-full min-h-[60vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-8xl font-bold text-teal-700 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button size="large">
            <HomeIcon className="h-5 w-5 mr-2" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>;
};