/**
 * Orlando City Configuration
 * Extracted from existing house-cleaning-orlando-fl page
 */

import { CityConfig } from '../../types/city';

export const orlandoCityData: CityConfig = {
  name: "Orlando",
  slug: "orlando",
  state: "FL",
  zipCodes: ["32801", "32803", "32804", "32806", "32814"],
  
  seo: {
    title: "Orlando House cleaning : Claim your FREE cleaning voucher",
    description: "Professional house cleaning in Orlando, FL. Claim your FREE cleaning voucher today! Serving downtown Orlando, Baldwin Park, College Park. Licensed, insured cleaners.",
    keywords: [
      "house cleaning Orlando FL",
      "Orlando house cleaning",
      "cleaning services Orlando",
      "maid service Orlando",
      "deep cleaning Orlando",
      "downtown Orlando cleaning",
      "Baldwin Park cleaning",
      "College Park cleaning",
      "Thornton Park cleaning",
      "Lake Eola cleaning"
    ],
    canonicalUrl: "https://curatedcleanings.com/orlando-house-cleaning"
  },
  
  neighborhoods: [
    "Downtown Orlando",
    "Baldwin Park", 
    "College Park",
    "Lake Eola Heights",
    "Thornton Park"
  ],
  
  landmarks: [
    "Lake Eola Park",
    "Amway Center",
    "Orlando Science Center",
    "Dr. Phillips Center for the Performing Arts"
  ],
  
  localDescription: "Your time in Orlando shouldn't be spent scrubbing when you could be enjoying Lake Eola or catching a show at Dr. Phillips Center.",
  
  pricing: {
    averageVisit: 188,
    range: { min: 160, max: 220 }
  },
  
  testimonials: [
    {
      quote: "Curated Cleanings made my downtown apartment feel brand new. Highly recommend for anyone in Orlando!",
      name: "Patrick",
      location: "Orlando"
    }
  ],
  
  coordinates: {
    latitude: 28.5383,
    longitude: -81.3792
  },
  
  serviceAreas: [
    "Orlando",
    "Baldwin Park",
    "College Park",
    "Winter Park", 
    "Lake Mary",
    "Oviedo",
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
    { city: "Longwood", url: "/longwood-house-cleaning" }
  ]
};