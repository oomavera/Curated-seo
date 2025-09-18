/**
 * City Utilities
 * Helper functions for city data validation and processing
 */

import { CityConfig, ValidationResult } from '../types/city';

// Common FAQ data that can be used across cities
export const commonFAQs = [
  {
    question: "Do you bring supplies and equipment?",
    answer: "Yes. Our team provides everything, including eco-friendly alternatives upon request."
  },
  {
    question: "How do you ensure quality every visit?",
    answer: "Cleaners upload room-by-room photos; a manager reviews them within hours to ensure consistency."
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We'll return within 24 hours to fix any issues at no cost. Your satisfaction is guaranteed."
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No. Many clients prefer to be out. We can work with your schedule and access preferences."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 2-3 days ahead, though same-day service may be available."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes. We're fully licensed, bonded, and insured for your peace of mind."
  }
];

/**
 * Generates city-specific hero headline
 */
export function generateCityHeroHeadline(cityName: string, state: string = "FL"): string {
  return `Professional House Cleaning in ${cityName}, ${state}`;
}

/**
 * Generates city-specific page title
 */
export function generateCityTitle(cityName: string, state: string = "FL"): string {
  return `${cityName} House Cleaning Services | Professional Cleaners | ${state}`;
}

/**
 * Generates city-specific meta description
 */
export function generateCityDescription(cityName: string, state: string = "FL"): string {
  return `Professional house cleaning services in ${cityName}, ${state}. Licensed, insured, and 5-star rated. Book your free estimate today!`;
}

/**
 * Generates city-specific keywords
 */
export function generateCityKeywords(cityName: string, state: string = "FL"): string[] {
  const cityLower = cityName.toLowerCase();
  const stateUpper = state.toUpperCase();
  
  return [
    `house cleaning ${cityName} ${stateUpper}`,
    `${cityName} house cleaning`,
    `cleaning services ${cityName}`,
    `maid service ${cityName}`,
    `deep cleaning ${cityName}`,
    `residential cleaning ${cityName}`,
    `professional cleaners ${cityName}`,
    `home cleaning ${cityName}`,
    `${cityLower} cleaning services`,
    `house cleaners ${cityName} ${stateUpper}`
  ];
}

/**
 * Validates city configuration
 */
export function validateCityConfig(config: CityConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!config.name) errors.push("City name is required");
  if (!config.slug) errors.push("City slug is required");
  if (!config.state) errors.push("State is required");
  if (!config.zipCodes || config.zipCodes.length === 0) {
    errors.push("At least one ZIP code is required");
  }

  // SEO validation
  if (!config.seo) {
    errors.push("SEO configuration is required");
  } else {
    if (!config.seo.title) errors.push("SEO title is required");
    if (!config.seo.description) errors.push("SEO description is required");
    if (!config.seo.keywords || config.seo.keywords.length === 0) {
      warnings.push("SEO keywords are recommended");
    }
    if (!config.seo.canonicalUrl) errors.push("Canonical URL is required");
  }

  // Content validation
  if (!config.localDescription) warnings.push("Local description is recommended");
  if (!config.neighborhoods || config.neighborhoods.length === 0) {
    warnings.push("Neighborhood data is recommended for local SEO");
  }
  if (!config.landmarks || config.landmarks.length === 0) {
    warnings.push("Landmark data is recommended for local relevance");
  }

  // Pricing validation
  if (!config.pricing) {
    warnings.push("Pricing information is recommended");
  } else {
    if (!config.pricing.averageVisit || config.pricing.averageVisit <= 0) {
      warnings.push("Average visit price should be greater than 0");
    }
    if (!config.pricing.range || !config.pricing.range.min || !config.pricing.range.max) {
      warnings.push("Price range is recommended");
    } else if (config.pricing.range.min >= config.pricing.range.max) {
      errors.push("Price range minimum must be less than maximum");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Normalizes city name for URL slugs
 */
export function normalizeCitySlug(cityName: string): string {
  return cityName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Formats city name for display
 */
export function formatCityName(cityName: string, state?: string): string {
  if (!state) return cityName;
  return `${cityName}, ${state}`;
}

/**
 * Gets city-specific service areas (includes nearby cities)
 */
export function getServiceAreas(cityData: CityConfig): string[] {
  const areas = [cityData.name];
  
  if (cityData.serviceAreas) {
    areas.push(...cityData.serviceAreas);
  }
  
  if (cityData.neighborhoods) {
    areas.push(...cityData.neighborhoods);
  }
  
  return [...new Set(areas)];
}

/**
 * Generates city-specific testimonials with local context
 */
export function generateLocalTestimonials(cityData: CityConfig): Array<{
  quote: string;
  name: string;
  location: string;
}> {
  if (cityData.testimonials && cityData.testimonials.length > 0) {
    return cityData.testimonials;
  }
  
  // Fallback testimonials with city context
  return [
    {
      quote: `Curated Cleanings transformed our home in ${cityData.name}. Professional, thorough, and reliable!`,
      name: "Sarah M.",
      location: cityData.name
    },
    {
      quote: `Best cleaning service we've used in ${cityData.name}. They pay attention to every detail.`,
      name: "Mike R.",
      location: cityData.name
    },
    {
      quote: `Finally found a trustworthy cleaning service in ${cityData.name}. Highly recommend!`,
      name: "Jennifer L.",
      location: cityData.name
    }
  ];
}

/**
 * Gets city-specific FAQ with local context
 */
export function getCityFAQs(cityData: CityConfig): Array<{question: string, answer: string}> {
  const baseFAQs = [...commonFAQs];
  
  // Add city-specific FAQ
  baseFAQs.push({
    question: `Do you serve all areas of ${cityData.name}?`,
    answer: `Yes! We provide cleaning services throughout ${cityData.name} and surrounding areas. Contact us to confirm service availability in your specific neighborhood.`
  });
  
  if (cityData.serviceAreas && cityData.serviceAreas.length > 0) {
    baseFAQs.push({
      question: "What other areas do you serve?",
      answer: `In addition to ${cityData.name}, we serve ${cityData.serviceAreas.slice(0, 3).join(', ')}, and other nearby communities.`
    });
  }
  
  return baseFAQs;
}

/**
 * Calculates estimated pricing for city
 */
export function getEstimatedPricing(cityData: CityConfig, bedrooms: number, bathrooms: number): {
  basePrice: number;
  range: { min: number; max: number };
} {
  const baseMultiplier = (bedrooms * 0.4) + (bathrooms * 0.3) + 0.3;
  const cityMultiplier = cityData.pricing?.averageVisit || 200;
  
  const basePrice = Math.round(cityMultiplier * baseMultiplier);
  const variance = basePrice * 0.15;
  
  return {
    basePrice,
    range: {
      min: Math.round(basePrice - variance),
      max: Math.round(basePrice + variance)
    }
  };
}

/**
 * Gets city-specific local description template
 */
export function generateLocalDescription(cityName: string, landmarks: string[]): string {
  const landmarkText = landmarks.length > 0 
    ? ` or exploring ${landmarks.slice(0, 2).join(' and ')}`
    : '';
    
  return `Your time in ${cityName} shouldn't be spent scrubbing when you could be enjoying local attractions${landmarkText}.`;
}

/**
 * Validates ZIP code format
 */
export function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}

/**
 * Validates phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phone);
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}