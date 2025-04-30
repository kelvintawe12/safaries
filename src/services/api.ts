import { Tour } from '../types';
// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const api = {
  getTours: async (): Promise<Tour[]> => {
    await delay(1500); // Simulate network delay
    return import('../data/tours').then(module => module.tours);
  },
  getTourById: async (id: number): Promise<Tour | undefined> => {
    await delay(1000);
    return import('../data/tours').then(module => module.tours.find(tour => tour.id === id));
  }
  // Add more API methods as needed
};