import React from 'react';
import { ShieldIcon, AlertCircleIcon } from 'lucide-react';

interface RuleSectionProps {
  title: string;
  icon?: React.ElementType;
  rules: string[];
  iconColor?: string;
}

const RuleSection = ({ title, icon: Icon, rules, iconColor }: RuleSectionProps) => (
  <div className="mb-12">
    <div className="flex items-center mb-6">
      {Icon && <Icon className={`h-6 w-6 ${iconColor} mr-3`} aria-hidden="true" />}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="space-y-4 text-gray-700">
      {rules.map((rule, index) => (
        <p key={index}>{`${index + 1}. ${rule}`}</p>
      ))}
    </div>
  </div>
);

export const Rules = () => {
  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Rules & Regulations</h1>
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
            <RuleSection
              title="General Rules"
              icon={ShieldIcon}
              iconColor="text-teal-700"
              rules={[
                'All participants must be at least 18 years old or accompanied by a guardian.',
                'Participants must follow guide instructions at all times.',
                'Respect local customs and traditions.',
                'Photography guidelines must be followed in sensitive areas.',
                'No littering - help us preserve the environment.',
              ]}
            />

            {/* Safety Guidelines */}
            <RuleSection
              title="Safety Guidelines"
              icon={AlertCircleIcon}
              iconColor="text-coral-500"
              rules={[
                'Always carry identification documents.',
                'Stay with the group during guided tours.',
                'Wear appropriate safety gear when provided.',
                'Report any health conditions before the tour.',
                'Follow emergency procedures as instructed.',
              ]}
            />

            {/* Booking & Cancellation */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Booking & Cancellation</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4 text-gray-700">
                <p>• 50% deposit required to confirm booking</p>
                <p>• Full refund for cancellations 30+ days before tour</p>
                <p>• 70% refund for cancellations 15-29 days before tour</p>
                <p>• 50% refund for cancellations 7-14 days before tour</p>
                <p>• No refund for cancellations less than 7 days before tour</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};