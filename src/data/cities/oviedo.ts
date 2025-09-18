/**
 * Oviedo City Configuration
 * Extracted from existing house-cleaning-oviedo-fl page
 */

import { CityConfig } from '../../types/city';

export const oviedoCityData: CityConfig = {
  name: "Oviedo",
  slug: "oviedo",
  state: "FL",
  zipCodes: ["32765", "32766"],
  
  seo: {
    title: "Oviedo House cleaning : Claim your FREE cleaning voucher",
    description: "Professional house cleaning in Oviedo, FL. Claim your FREE cleaning voucher today! Serving Alafaya Woods, Twin Rivers, and all of Oviedo. Licensed, insured cleaners.",
    keywords: [
      "house cleaning Oviedo FL",
      "Oviedo house cleaning",
      "cleaning services Oviedo",
      "maid service Oviedo",
      "deep cleaning Oviedo",
      "residential cleaning Oviedo",
      "professional cleaners Oviedo",
      "Alafaya Woods cleaning",
      "Twin Rivers cleaning",
      "Black Hammock cleaning"
    ],
    canonicalUrl: "https://curatedcleanings.com/oviedo-house-cleaning"
  },
  
  neighborhoods: [
    "Alafaya Woods",
    "Twin Rivers", 
    "Kingsbridge East",
    "Live Oak Reserve",
    "Remington Park"
  ],
  
  landmarks: [
    "Oviedo on the Park",
    "Black Hammock Wilderness Area",
    "Lukas Nursery",
    "Oviedo Mall"
  ],
  
  localDescription: "Your time in Oviedo shouldn't be spent scrubbing baseboards or fighting Florida dust when you could be enjoying Oviedo on the Park or exploring Black Hammock Wilderness Area.",
  
  pricing: {
    averageVisit: 205,
    range: { min: 170, max: 240 }
  },
  
  testimonials: [
    {
      quote: "Absolutely amazing service! My home in Alafaya Woods has never looked better.",
      name: "Deja J.",
      location: "Oviedo"
    }
  ],
  
  coordinates: {
    latitude: 28.6661,
    longitude: -81.2084
  },
  
  serviceAreas: [
    "Oviedo",
    "Winter Park", 
    "Lake Mary",
    "Winter Springs",
    "Casselberry",
    "Altamonte Springs",
    "Longwood",
    "Sanford",
    "Heathrow",
    "Wekiwa Springs",
    "Fern Park",
    "Chuluota",
    "Geneva",
    "Goldenrod",
    "Midway",
    "Black Hammock"
  ],
  
  nearbyPages: [
    { city: "Winter Park", url: "/winter-park-house-cleaning" },
    { city: "Lake Mary", url: "/lake-mary-house-cleaning" },
    { city: "Winter Springs", url: "/winter-springs-house-cleaning" }
  ]
};