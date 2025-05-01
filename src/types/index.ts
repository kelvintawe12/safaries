import { Tour } from '../types';

export const tours: Tour[] = [
  {
    id: 1,
    title: {
      en: "Lake Kivu Experience",
      fr: "Expérience du Lac Kivu",
      rw: "Ibyerekezo by'Ikuzimu Kivu",
    },
    description: {
      en: "Discover the breathtaking beauty of Lake Kivu with this 3-day adventure. Enjoy boat trips, beach relaxation, and cultural encounters with local communities.",
      fr: "Découvrez la beauté époustouflante du lac Kivu avec cette aventure de 3 jours. Profitez de promenades en bateau, de détente sur la plage et de rencontres culturelles avec les communautés locales.",
      rw: "Menya ubwiza bw'Ikuzimu Kivu n'uru rugendo rw'iminsi 3. Furahia ubwato, kwinezeza ku nkombe, no guhura n'abaturage.",
    },
    price: 350,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1580309237429-661e2be50469?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1580309237429-661e2be50469?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1494386346843-e12284507169?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    durationDays: 3,
    duration: "3 days, 2 nights",
    category: "Adventure",
    difficulty: "Easy",
    featured: true,
    tags: ["lake", "culture", "relaxation"],
    promocode: "KIVU2025",
    reviews: [],
    rating: 4.8,
    minParticipants: 2,
    location: "Lake Kivu, Goma",
    highlights: [
      "Scenic boat trips",
      "Cultural performances",
      "Beach relaxation",
    ],
    availableDates: ["2025-06-01", "2025-07-01", "2025-08-01"],
    maxParticipants: 12,
    included: [
      "Accommodation in lakeside hotels",
      "All meals (breakfast, lunch, dinner)",
      "Boat trips and water activities",
      "Local guide and translator",
      "Transportation within the tour",
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages",
    ],
    itinerary: [
      {
        day: 1,
        description: {
          en: "Arrive in Goma, transfer to your lakeside accommodation. Enjoy a welcome dinner with cultural performances.",
          fr: "Arrivez à Goma, transfert vers votre hébergement au bord du lac. Profitez d'un dîner de bienvenue avec des spectacles culturels.",
          rw: "Injira mu Goma, wimurwe mu icumbi ryawe ryo ku nkombe y'ikiyaga. Furahia ifunguro ry'ikaze hamwe n'ibitaramo by'umuco.",
        },
      },
      {
        day: 2,
        description: {
          en: "Full day boat trip around Lake Kivu, visiting islands and local fishing communities. Lunch on a private island.",
          fr: "Journée complète en bateau autour du lac Kivu, visite des îles et des communautés de pêcheurs locaux. Déjeuner sur une île privée.",
          rw: "Urugendo rw'umunsi wose mu bwato bwo gukikira Ikuzimu Kivu, usura ibirwa n'abarobyi b'ahantu. Ifunguro rya mu gitondo ku kirwa cyihariye.",
        },
      },
      {
        day: 3,
        description: {
          en: "Morning visit to local community projects. Traditional cooking class and farewell ceremony.",
          fr: "Visite matinale des projets communautaires locaux. Cours de cuisine traditionnelle et cérémonie d'adieu.",
          rw: "Sura mu gitondo amashusho y'abaturage b'ahantu. Amasomo y'uburyo bwo guteka gakondo no gusezerana.",
        },
      },
    ],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: {
      en: "Virunga Volcano Trek",
      fr: "Trek des Volcans de Virunga",
      rw: "Urugendo rw'Imisozi ya Virunga",
    },
    description: {
      en: "Challenge yourself with an unforgettable trek to the active Nyiragongo volcano in Virunga National Park. Witness the world's largest lava lake.",
      fr: "Défiez-vous avec un trek inoubliable vers le volcan actif Nyiragongo dans le parc national de Virunga. Découvrez le plus grand lac de lave au monde.",
      rw: "Ihangane n'urugendo rw'ikirunga cya Nyiragongo mu parike y'igihugu ya Virunga. Reba ikirunga cy'ibirunga bikomeye cyane ku isi.",
    },
    price: 650,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533551037358-c8f7182cdb93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    durationDays: 2,
    duration: "2 days, 1 night",
    category: "Trekking",
    difficulty: "Moderate",
    featured: true,
    tags: ["volcano", "trekking", "adventure"],
    promocode: undefined,
    reviews: [],
    rating: 4.9,
    minParticipants: 4,
    location: "Virunga National Park",
    highlights: [
      "World’s largest lava lake",
      "Guided summit trek",
      "Overnight at the crater",
    ],
    availableDates: ["2025-06-15", "2025-07-15", "2025-08-15"],
    maxParticipants: 8,
    included: [
      "Park entrance fees",
      "Guided volcano trek",
      "Overnight accommodation in volcano cabins",
      "All meals during the trek",
      "Safety equipment and first aid",
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal trekking gear",
      "Tips for guides",
    ],
    itinerary: [
      {
        day: 1,
        description: {
          en: "Morning briefing, begin the challenging 5-6 hour ascent to the summit. Overnight stay in cabins with views of the lava lake.",
          fr: "Briefing matinal, commencez l'ascension difficile de 5 à 6 heures jusqu'au sommet. Nuit dans des cabanes avec vue sur le lacJesusHeader: true
Content-Type: text/plain; charset=UTF-8
Date: Wed, 29 Jan 2025 07:47:46 GMT
Expires: Wed, 29 Jan 2025 07:47:46 GMT
Cache-Control: no-cache
Pragma: no-cache
Content-Length: 5123
Connection: keep-alive
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-src 'none'; object-src 'none'
Permissions-Policy: geolocation=(), microphone=(), camera=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: same-origin

{
  "id": 2,
  "title": {
    "en": "Virunga Volcano Trek",
    "fr": "Trek des Volcans de Virunga",
    "rw": "Urugendo rw'Imisozi ya Virunga"
  },
  "description": {
    "en": "Challenge yourself with an unforgettable trek to the active Nyiragongo volcano in Virunga National Park. Witness the world's largest lava lake.",
    "fr": "Défiez-vous avec un trek inoubliable vers le volcan actif Nyiragongo dans le parc national de Virunga. Découvrez le plus grand lac de lave au monde.",
    "rw": "Ihangane n'urugendo rw'ikirunga cya Nyiragongo mu parike y'igihugu ya Virunga. Reba ikirunga cy'ibirunga bikomeye cyane ku isi."
  },
  "price": 650,
  "currency": "USD",
  "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "images": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1533551037358-c8f7182cdb93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ],
  "durationDays": 2,
  "duration": "2 days, 1 night",
  "category": "Trekking",
  "difficulty": "Moderate",
  "featured": true,
  "tags": [
    "volcano",
    "trekking",
    "adventure"
  ],
  "promocode": null,
  "reviews": [],
  "rating": 4.9,
  "minParticipants": 4,
  "location": "Virunga National Park",
  "highlights": [
    "World’s largest lava lake",
    "Guided summit trek",
    "Overnight at the crater"
  ],
  "availableDates": [
    "2025-06-15",
    "2025-07-15",
    "2025-08-15"
  ],
  "maxParticipants": 8,
  "included": [
    "Park entrance fees",
    "Guided volcano trek",
    "Overnight accommodation in volcano cabins",
    "All meals during the trek",
    "Safety equipment and first aid"
  ],
  "notIncluded": [
    "International flights",
    "Visa fees",
    "Travel insurance",
    "Personal trekking gear",
    "Tips for guides"
  ],
  "itinerary": [
    {
      "day": 1,
      "description": {
        "en": "Morning briefing, begin the challenging 5-6 hour ascent to the summit. Overnight stay in cabins with views of the lava lake.",
        "fr": "Briefing matinal, commencez l'ascension difficile de 5 à 6 heures jusqu'au sommet. Nuit dans des cabanes avec vue sur le lac de lave.",
        "rw": "Amakuru yo mu gitondo, tangira igihango cy'isaha 5-6 kugera ku gicuma. Ijoro mu bintu by'ikirunga by'ikirunga."
      }
    },
    {
      "day": 2,
      "description": {
        "en": "Sunrise views of the crater, begin descent after breakfast. Return to Goma by afternoon.",
        "fr": "Vues du lever du soleil sur le cratère, commencez la descente après le petit déjeuner. Retour à Goma dans l'après-midi.",
        "rw": "Ibibonwa by'izuba ry'umunsi, tangira kumanuka nyuma y'ifunguro rya mu gitondo. Garuka mu Goma mu gicuku."
      }
    }
  ],
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}