import { Tour } from '../types';
export const tours: Tour[] = [{
  id: 1,
  title: "Lake Kivu Experience",
  description: "Discover the breathtaking beauty of Lake Kivu with this 3-day adventure. Enjoy boat trips, beach relaxation, and cultural encounters with local communities.",
  price: 350,
  duration: "3 days, 2 nights",
  location: "Lake Kivu, Goma",
  images: ["https://images.unsplash.com/photo-1580309237429-661e2be50469?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1494386346843-e12284507169?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  included: ["Accommodation in lakeside hotels", "All meals (breakfast, lunch, dinner)", "Boat trips and water activities", "Local guide and translator", "Transportation within the tour"],
  notIncluded: ["International flights", "Visa fees", "Travel insurance", "Personal expenses", "Alcoholic beverages"],
  itinerary: [{
    day: 1,
    title: "Arrival and Welcome",
    description: "Arrive in Goma, transfer to your lakeside accommodation. Enjoy a welcome dinner with cultural performances."
  }, {
    day: 2,
    title: "Lake Exploration",
    description: "Full day boat trip around Lake Kivu, visiting islands and local fishing communities. Lunch on a private island."
  }, {
    day: 3,
    title: "Cultural Immersion",
    description: "Morning visit to local community projects. Traditional cooking class and farewell ceremony."
  }],
  featured: true
}, {
  id: 2,
  title: "Virunga Volcano Trek",
  description: "Challenge yourself with an unforgettable trek to the active Nyiragongo volcano in Virunga National Park. Witness the world's largest lava lake.",
  price: 650,
  duration: "2 days, 1 night",
  location: "Virunga National Park",
  images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1533551037358-c8f7182cdb93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  included: ["Park entrance fees", "Guided volcano trek", "Overnight accommodation in volcano cabins", "All meals during the trek", "Safety equipment and first aid"],
  notIncluded: ["International flights", "Visa fees", "Travel insurance", "Personal trekking gear", "Tips for guides"],
  itinerary: [{
    day: 1,
    title: "Ascent",
    description: "Morning briefing, begin the challenging 5-6 hour ascent to the summit. Overnight stay in cabins with views of the lava lake."
  }, {
    day: 2,
    title: "Descent and Return",
    description: "Sunrise views of the crater, begin descent after breakfast. Return to Goma by afternoon."
  }],
  featured: true
}, {
  id: 3,
  title: "Idjwi Island Retreat",
  description: "Escape to the tranquil Idjwi Island in the middle of Lake Kivu. Experience rural Congolese life, coffee plantations, and pristine beaches.",
  price: 450,
  duration: "4 days, 3 nights",
  location: "Idjwi Island, Lake Kivu",
  images: ["https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
  included: ["Round-trip boat transfer to the island", "Accommodation in eco-lodges", "All meals with local ingredients", "Guided island tours", "Coffee plantation visit"],
  notIncluded: ["International flights", "Visa fees", "Travel insurance", "Souvenirs and crafts", "Additional activities not in itinerary"],
  itinerary: [{
    day: 1,
    title: "Island Transfer",
    description: "Morning boat departure from Goma to Idjwi Island. Afternoon beach relaxation and welcome dinner."
  }, {
    day: 2,
    title: "Coffee Experience",
    description: "Visit local coffee plantations, learn about coffee production, and enjoy tastings."
  }, {
    day: 3,
    title: "Island Culture",
    description: "Visit local villages, interact with communities, and participate in traditional activities."
  }, {
    day: 4,
    title: "Return Journey",
    description: "Final morning on the island beaches, afternoon boat return to mainland."
  }],
  featured: false
}];