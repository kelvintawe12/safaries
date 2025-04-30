import React, { useState } from 'react';
import { faqs } from '../data/faqs';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [language, setLanguage] = useState<'en' | 'fr' | 'rw'>('en');
  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };
  const filteredFaqs = faqs.filter(faq => faq.question[language].toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer[language].toLowerCase().includes(searchQuery.toLowerCase()));
  const categories = [...new Set(faqs.map(faq => faq.category))];
  return <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            Find answers to common questions about traveling with Kivu Safaris
          </p>
        </div>
      </section>
      {/* Search and Language Selector */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search FAQs..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex space-x-2">
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
        </div>
      </section>
      {/* FAQs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchQuery && <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
              {filteredFaqs.length === 0 ? <p className="text-gray-600">
                  No FAQs found matching "{searchQuery}"
                </p> : <p className="text-gray-600">
                  Found {filteredFaqs.length} results for "{searchQuery}"
                </p>}
            </div>}
          {!searchQuery ?
        // Display by categories when not searching
        categories.map(category => <div key={category} className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">{category}</h2>
                <div className="space-y-4">
                  {faqs.filter(faq => faq.category === category).map(faq => <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors" onClick={() => toggleAccordion(faq.id)}>
                          <span className="font-medium text-lg">
                            {faq.question[language]}
                          </span>
                          {activeId === faq.id ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                        </button>
                        {activeId === faq.id && <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">
                              {faq.answer[language]}
                            </p>
                          </div>}
                      </div>)}
                </div>
              </div>) :
        // Display search results
        <div className="space-y-4">
              {filteredFaqs.map(faq => <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors" onClick={() => toggleAccordion(faq.id)}>
                    <div>
                      <span className="font-medium text-lg">
                        {faq.question[language]}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {faq.category}
                      </p>
                    </div>
                    {activeId === faq.id ? <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />}
                  </button>
                  {activeId === faq.id && <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer[language]}</p>
                    </div>}
                </div>)}
            </div>}
        </div>
      </section>
      {/* Contact CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            If you couldn't find the answer you were looking for, please don't
            hesitate to contact us directly. Our team is always ready to help
            you with any questions or concerns.
          </p>
          <a href="/contact" className="inline-block bg-teal-700 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-800 transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </div>;
};