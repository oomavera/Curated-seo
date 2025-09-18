/**
 * Shared Business Data
 * Contains business information used across all city pages
 */

import { BusinessData } from '../types/city';

export const businessData: BusinessData = {
  name: "Curated Cleanings",
  phone: "(407) 470-1780",
  email: "admin@curatedcleanings.com",
  address: {
    street: "123 Main St",
    city: "Oviedo",
    state: "FL",
    zipCode: "32765"
  },
  hours: {
    monday: "8:00 AM - 6:00 PM",
    tuesday: "8:00 AM - 6:00 PM",
    wednesday: "8:00 AM - 6:00 PM",
    thursday: "8:00 AM - 6:00 PM",
    friday: "8:00 AM - 6:00 PM",
    saturday: "8:00 AM - 6:00 PM",
    sunday: "Closed"
  },
  serviceTypes: [
    "House Cleaning",
    "Residential Cleaning",
    "Deep Cleaning",
    "Standard Cleaning",
    "Maid Service",
    "Move In Cleaning",
    "Move Out Cleaning",
    "Weekly Cleaning",
    "Biweekly Cleaning",
    "One Time Cleaning"
  ],
  priceRange: {
    min: 125,
    max: 300,
    currency: "USD"
  },
  socialMedia: {
    facebook: "https://facebook.com/curatedcleanings",
    instagram: "https://instagram.com/curatedcleanings"
  },
  certifications: ["Licensed", "Bonded", "Insured"],
  yearEstablished: 2020,
  employeeCount: 15,
  serviceRadius: 25
};

// Common service areas for all cities
export const commonServiceAreas = [
  "Altamonte Springs",
  "Casselberry", 
  "Lake Mary",
  "Longwood",
  "Oviedo",
  "Sanford",
  "Winter Springs",
  "Heathrow",
  "Wekiwa Springs",
  "Fern Park",
  "Chuluota",
  "Geneva",
  "Goldenrod",
  "Midway",
  "Black Hammock"
];

// Standard packages data
export const standardPackages = {
  standard: {
    title: "STANDARD HOUSE CLEANING",
    items: [
      "Dusting all surfaces (furniture, shelves)",
      "Vacuuming carpets and rugs", 
      "Sweeping and mopping floors",
      "Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors",
      "Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)",
      "Emptying trash bins and replacing liners",
      "Making beds (not changing linens)"
    ]
  },
  deep: {
    title: "DEEP CLEANING SERVICES",
    items: [
      "All Standard Services plus",
      "Inside Microwave",
      "Exterior of Kitchen Cabinets", 
      "Dust Very High / Cluttered Shelves",
      "Change Bed Linens",
      "Inside Fridge",
      "Inside Oven",
      "Ceiling Fans",
      "Interior Windows"
    ]
  },
  addons: {
    title: "ADD-ONS",
    items: [
      "Laundry",
      "Spot Cleaning Walls",
      "Hand Scrubbing Baseboards",
      "Vacuum Dusting Baseboards",
      "Eco-friendly Consumables",
      "QC Photos",
      "Air Freshener",
      "Reset Fridge",
      "Deodorizer",
      "Paper Towel Reset",
      "Swap Sponges"
    ]
  }
};