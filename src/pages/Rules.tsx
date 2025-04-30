import React from 'react';
import { ShieldIcon, AlertCircleIcon } from 'lucide-react';
export const Rules = () => {
  return <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Rules & Regulations
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            Important guidelines for a safe and enjoyable experience
          </p>
        </div>
      </section>
      {/* Rules Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* General Rules */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <ShieldIcon className="h-6 w-6 text-teal-700 mr-3" />
                <h2 className="text-2xl font-bold">General Rules</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. All participants must be at least 18 years old or
                  accompanied by a guardian.
                </p>
                <p>
                  2. Participants must follow guide instructions at all times.
                </p>
                <p>3. Respect local customs and traditions.</p>
                <p>
                  4. Photography guidelines must be followed in sensitive areas.
                </p>
                <p>5. No littering - help us preserve the environment.</p>
              </div>
            </div>
            {/* Safety Guidelines */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <AlertCircleIcon className="h-6 w-6 text-coral-500 mr-3" />
                <h2 className="text-2xl font-bold">Safety Guidelines</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>1. Always carry identification documents.</p>
                <p>2. Stay with the group during guided tours.</p>
                <p>3. Wear appropriate safety gear when provided.</p>
                <p>4. Report any health conditions before the tour.</p>
                <p>5. Follow emergency procedures as instructed.</p>
              </div>
            </div>
            {/* Booking & Cancellation */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                Booking & Cancellation
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4 text-gray-700">
                <p>• 50% deposit required to confirm booking</p>
                <p>• Full refund for cancellations 30+ days before tour</p>
                <p>• 70% refund for cancellations 15-29 days before tour</p>
                <p>• 50% refund for cancellations 7-14 days before tour</p>
                <p>
                  • No refund for cancellations less than 7 days before tour
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};