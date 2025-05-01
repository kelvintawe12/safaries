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
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    featured: true,
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
          fr: "Briefing matinal, commencez l'ascension difficile de 5 à 6 heures jusqu'au sommet. Nuit dans des cabanes avec vue sur le lac de lave.",
          rw: "Amakuru yo mu gitondo, tangira igihango cy'isaha 5-6 kugera ku gicuma. Ijoro mu bintu by'ikirunga by'ikirunga.",
        },
      },
      {
        day: 2,
        description: {
          en: "Sunrise views of the crater, begin descent after breakfast. Return to Goma by afternoon.",
          fr: "Vues du lever du soleil sur le cratère, commencez la descente après le petit déjeuner. Retour à Goma dans l'après-midi.",
          rw: "Ibibonwa by'izuba ry'umunsi, tangira kumanuka nyuma y'ifunguro rya mu gitondo. Garuka mu Goma mu gicuku.",
        },
      },
    ],
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    featured: true,
  },
  {
    id: 3,
    title: {
      en: "Idjwi Island Retreat",
      fr: "Retraite sur l'Île d'Idjwi",
      rw: "Icyambu cy'Ikirwa cya Idjwi",
    },
    description: {
      en: "Escape to the tranquil Idjwi Island in the middle of Lake Kivu. Experience rural Congolese life, coffee plantations, and pristine beaches.",
      fr: "Évadez-vous sur l'île tranquille d'Idjwi au milieu du lac Kivu. Découvrez la vie rurale congolaise, les plantations de café et les plages immaculées.",
      rw: "Hunga ku kirwa cya Idjwi cyuje amahoro mu kati ka Ikuzimu Kivu. Menya ubuzima bw'icyaro cya Kongo, ubuhinzi bwa kawa, n'inkombe z'umweru.",
    },
    price: 450,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    durationDays: 4,
    duration: "4 days, 3 nights",
    category: "Relaxation",
    included: [
      "Round-trip boat transfer to the island",
      "Accommodation in eco-lodges",
      "All meals with local ingredients",
      "Guided island tours",
      "Coffee plantation visit",
    ],
    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Souvenirs and crafts",
      "Additional activities not in itinerary",
    ],
    itinerary: [
      {
        day: 1,
        description: {
          en: "Morning boat departure from Goma to Idjwi Island. Afternoon beach relaxation and welcome dinner.",
          fr: "Départ en bateau le matin de Goma vers l'île d'Idjwi. Après-midi de détente sur la plage et dîner de bienvenue.",
          rw: "Gutaha mu bwato mu gitondo uhereye mu Goma ujya ku kirwa cya Idjwi. Ijoro ry'umunsi wo kwinezeza ku nkombe n'ifunguro ry'ikaze.",
        },
      },
      {
        day: 2,
        description: {
          en: "Visit local coffee plantations, learn about coffee production, and enjoy tastings.",
          fr: "Visitez les plantations de café locales, découvrez la production de café et profitez de dégustations.",
          rw: "Sura ubuhinzi bwa kawa bw'ahantu, wige ku bijyanye no guhinga kawa, kandi ufurahie ibyokunywa.",
        },
      },
      {
        day: 3,
        description: {
          en: "Visit local villages, interact with communities, and participate in traditional activities.",
          fr: "Visitez les villages locaux, interagissez avec les communautés et participez à des activités traditionnelles.",
          rw: "Sura amavuriro y'ahantu, uhurire n'abaturage, kandi wishyire mu bikorwa by'umuco.",
        },
      },
      {
        day: 4,
        description: {
          en: "Final morning on the island beaches, afternoon boat return to mainland.",
          fr: "Dernière matinée sur les plages de l'île, retour en bateau l'après-midi vers le continent.",
          rw: "Umuseke wanyuma ku nkombe z'ikirwa, igicuku cy'umunsi wo garuka ku mugabane mu bwato.",
        },
      },
    ],
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
    featured: false,
  },
];