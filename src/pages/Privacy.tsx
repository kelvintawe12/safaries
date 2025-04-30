import React, { useState } from 'react';
import { privacySections } from '../data/privacy';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
export const Privacy = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'en' | 'fr' | 'rw'>('en');
  const toggleSection = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };
  return <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            How we protect your personal information and respect your privacy
          </p>
        </div>
      </section>
      {/* Language Selector */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-end space-x-2">
            <button className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setLanguage('en')}>
              English
            </button>
            <button className={`px-3 py-1 rounded-md ${language === 'fr' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setLanguage('fr')}>
              Français
            </button>
            <button className={`px-3 py-1 rounded-md ${language === 'rw' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setLanguage('rw')}>
              Kinyarwanda
            </button>
          </div>
        </div>
      </section>
      {/* Privacy Policy Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg mb-8">
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-6">
              {privacySections.map(section => <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors" onClick={() => toggleSection(section.id)}>
                    <span className="font-medium text-xl">
                      {section.title[language]}
                    </span>
                    {activeId === section.id ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                  </button>
                  {activeId === section.id && <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 whitespace-pre-line">
                        {section.content[language]}
                      </p>
                    </div>}
                </div>)}
            </div>
            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>By email: privacy@kivusafaris.com</li>
                <li>By phone: +243 123 456 789</li>
                <li>By mail: 123 Main Street, Goma, North Kivu, DRC</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>;
};