import React, { useState } from 'react';
import { tours } from '../data/tours';
import { TourCard } from '../components/features/tours/TourCard';
import { Button } from '../components/common/Button';
import { SearchIcon, FilterIcon } from 'lucide-react';
export const Tours = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedPriceRange, setPriceRange] = useState('');
  // Get unique locations and durations for filters
  const locations = [...new Set(tours.map(tour => tour.location))];
  const durations = [...new Set(tours.map(tour => tour.duration))];
  const priceRanges = [{
    label: 'Under $300',
    min: 0,
    max: 300
  }, {
    label: '$300 - $500',
    min: 300,
    max: 500
  }, {
    label: 'Over $500',
    min: 500,
    max: Infinity
  }];
  // Filter tours based on search and filters
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || tour.location === selectedLocation;
    const matchesDuration = !selectedDuration || tour.duration === selectedDuration;
    const matchesPrice = !selectedPriceRange || selectedPriceRange === 'Under $300' && tour.price < 300 || selectedPriceRange === '$300 - $500' && tour.price >= 300 && tour.price <= 500 || selectedPriceRange === 'Over $500' && tour.price > 500;
    return matchesSearch && matchesLocation && matchesDuration && matchesPrice;
  });
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedDuration('');
    setPriceRange('');
  };
  return <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img src="https://images.unsplash.com/photo-1623690542850-bae41d2a7e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Kivu landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tours</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover unforgettable adventures in the heart of Kivu
            </p>
          </div>
        </div>
      </section>
      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search tours..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">All Locations</option>
                {locations.map(location => <option key={location} value={location}>
                    {location}
                  </option>)}
              </select>
              <select value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">All Durations</option>
                {durations.map(duration => <option key={duration} value={duration}>
                    {duration}
                  </option>)}
              </select>
              <select value={selectedPriceRange} onChange={e => setPriceRange(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">All Prices</option>
                {priceRanges.map(range => <option key={range.label} value={range.label}>
                    {range.label}
                  </option>)}
              </select>
              {(searchQuery || selectedLocation || selectedDuration || selectedPriceRange) && <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>}
            </div>
          </div>
        </div>
      </section>
      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredTours.length === 0 ? <div className="text-center py-12">
              <FilterIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Tours Found</h3>
              <p className="text-gray-600 mb-4">
                No tours match your current filters. Try adjusting your search
                criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
            </div>}
        </div>
      </section>
    </div>;
};