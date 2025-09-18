/**
 * Longwood City Configuration
 * Extracted from existing house-cleaning-longwood-fl page
 */

import { CityConfig } from '../../types/city';

export const longwoodCityData: CityConfig = {
  name: "Longwood",
  slug: "longwood",
  state: "FL",
  zipCodes: ["32750", "32779"],
  
  seo: {
    title: "Longwood House cleaning : Claim your FREE cleaning voucher",
    description: "Professional house cleaning in Longwood, FL. Claim your FREE cleaning voucher today! Serving Sweetwater Oaks, Wekiva Cove, and all of Longwood. Licensed, insured cleaners.",
    keywords: [
      "house cleaning Longwood FL",
      "Longwood house cleaning",
      "cleaning services Longwood",
      "maid service Longwood",
      "deep cleaning Longwood",
      "Sweetwater Oaks cleaning",
      "Wekiva Cove cleaning",
      "The Springs cleaning",
      "Sanlando Springs cleaning",
      "Big Tree Park cleaning"
    ],
    canonicalUrl: "https://curatedcleanings.com/longwood-house-cleaning"
  },
  
  neighborhoods: [
    "Sweetwater Oaks",
    "Wekiva Cove", 
    "The Springs",
    "Sanlando Springs",
    "Longwood Club"
  ],
  
  landmarks: [
    "Big Tree Park",
    "Wekiva Island",
    "Bradlee-McIntyre House",
    "Reiter Park"
  ],
  
  localDescription: "Your time in Longwood shouldn't be spent scrubbing when you could be enjoying Big Tree Park or kayaking at Wekiva Island.",
  
  pricing: {
    averageVisit: 220,
    range: { min: 190, max: 260 }
  },
  
  testimonials: [
    {
      quote: "Curated Cleanings is the best cleaning service I've used in Longwood. Always reliable and thorough!",
      name: "Rita",
      location: "Longwood"
    }
  ],
  
  coordinates: {
    latitude: 28.7031,
    longitude: -81.3384
  },
  
  serviceAreas: [
    "Longwood",
    "Altamonte Springs",
    "Wekiva Springs",
    "Lake Mary",
    "Oviedo", 
    "Winter Park",
    "Winter Springs",
    "Casselberry",
    "Sanford",
    "Heathrow",
    "Fern Park",
    "Chuluota",
    "Geneva",
    "Goldenrod",
    "Midway",
    "Black Hammock"
  ],
  
  nearbyPages: [
    { city: "Lake Mary", url: "/lake-mary-house-cleaning" },
    { city: "Orlando", url: "/orlando-house-cleaning" },
    { city: "Altamonte Springs", url: "/altamonte-springs-house-cleaning" }
  ]
};