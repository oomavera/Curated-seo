/**
 * Lake Mary City Configuration
 * Extracted from existing house-cleaning-lake-mary-fl page
 */

import { CityConfig } from '../../types/city';

export const lakeMaryData: CityConfig = {
  name: "Lake Mary",
  slug: "lake-mary",
  state: "FL",
  zipCodes: ["32746"],
  
  seo: {
    title: "Lake Mary House cleaning : Claim your FREE cleaning voucher",
    description: "Professional house cleaning in Lake Mary, FL. Claim your FREE cleaning voucher today! Serving Heathrow, Timacuan, and all of Lake Mary. Licensed, insured cleaners.",
    keywords: [
      "house cleaning Lake Mary FL",
      "Lake Mary house cleaning",
      "cleaning services Lake Mary",
      "maid service Lake Mary",
      "deep cleaning Lake Mary",
      "residential cleaning Lake Mary",
      "Heathrow cleaning services",
      "Timacuan cleaning",
      "Lake Mary Woods cleaning",
      "Colonial TownPark cleaning"
    ],
    canonicalUrl: "https://curatedcleanings.com/lake-mary-house-cleaning"
  },
  
  neighborhoods: [
    "Heathrow",
    "Timacuan", 
    "Cardinal Oaks Cove",
    "Huntington Pointe",
    "Lake Mary Woods",
    "Colonial TownPark"
  ],
  
  landmarks: [
    "Central Park at Lake Mary City Hall",
    "Trailblazer Park",
    "Lake Mary Farmers Market",
    "Colonial TownPark"
  ],
  
  localDescription: "Your time in Lake Mary shouldn't be spent scrubbing baseboards when you could be enjoying Central Park or the Farmers Market.",
  
  pricing: {
    averageVisit: 210,
    range: { min: 180, max: 250 }
  },
  
  testimonials: [
    {
      quote: "Curated Cleanings always does a fantastic job. My home in Heathrow is spotless every time!",
      name: "Lauren",
      location: "Lake Mary"
    }
  ],
  
  coordinates: {
    latitude: 28.7589,
    longitude: -81.3178
  },
  
  serviceAreas: [
    "Lake Mary",
    "Heathrow",
    "Longwood",
    "Oviedo", 
    "Winter Park",
    "Winter Springs",
    "Casselberry",
    "Altamonte Springs",
    "Sanford",
    "Wekiwa Springs",
    "Fern Park",
    "Chuluota",
    "Geneva",
    "Goldenrod",
    "Midway",
    "Black Hammock"
  ],
  
  nearbyPages: [
    { city: "Oviedo", url: "/oviedo-house-cleaning" },
    { city: "Winter Park", url: "/winter-park-house-cleaning" },
    { city: "Longwood", url: "/longwood-house-cleaning" }
  ]
};