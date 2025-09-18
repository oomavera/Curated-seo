/**
 * Winter Park City Configuration
 * Extracted from existing house-cleaning-winter-park-fl page
 */

import { CityConfig } from '../../types/city';

export const winterParkCityData: CityConfig = {
  name: "Winter Park",
  slug: "winter-park",
  state: "FL",
  zipCodes: ["32789", "32792"],
  
  seo: {
    title: "Winter Park House cleaning : Claim your FREE cleaning voucher",
    description: "Professional house cleaning in Winter Park, FL. Claim your FREE cleaning voucher today! Serving Olde Winter Park, Windsong, and historic homes. Licensed, insured cleaners.",
    keywords: [
      "house cleaning Winter Park FL",
      "Winter Park house cleaning",
      "cleaning services Winter Park",
      "maid service Winter Park",
      "deep cleaning Winter Park",
      "historic home cleaning Winter Park",
      "luxury home cleaning Winter Park",
      "Olde Winter Park cleaning",
      "Rollins College cleaning",
      "Central Park Winter Park"
    ],
    canonicalUrl: "https://curatedcleanings.com/winter-park-house-cleaning"
  },
  
  neighborhoods: [
    "Olde Winter Park",
    "Windsong", 
    "Winter Park Pines",
    "Lake Killarney",
    "Orwin Manor"
  ],
  
  landmarks: [
    "Rollins College",
    "Central Park",
    "Mead Botanical Garden",
    "Winter Park Farmers' Market"
  ],
  
  localDescription: "Historic charm and lakefront living deserve more than a rushed wipe-down when you could be spending Saturday at the Farmers' Market or enjoying Central Park.",
  
  pricing: {
    averageVisit: 218,
    range: { min: 180, max: 260 }
  },
  
  testimonials: [
    {
      quote: "The team at Curated Cleanings is always on time and leaves my home spotless. I love their attention to detail!",
      name: "Ki Alexis",
      location: "Winter Park"
    }
  ],
  
  coordinates: {
    latitude: 28.5933,
    longitude: -81.3392
  },
  
  serviceAreas: [
    "Winter Park",
    "Oviedo", 
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
    { city: "Oviedo", url: "/oviedo-house-cleaning" },
    { city: "Lake Mary", url: "/lake-mary-house-cleaning" },
    { city: "Orlando", url: "/orlando-house-cleaning" }
  ]
};