/**
 * City Data Management Utilities
 * Functions for loading, validating, and managing city data at build time
 */

import { CityConfig, BusinessData } from '../types/city';
import { getAllCities, getCityBySlug, getAllCitySlugs } from '../data/cities';
import { businessData } from '../data/business';
import { validateBuildConfiguration } from './validation';
import { generateCityMetadata, generateCityPageSchema } from './seoUtils';
import { generateCityHeroHeadline, generateCityTitle, generateCityDescription, generateCityKeywords } from './cityUtils';

/**
 * Loads and validates all city data at build time
 */
export function loadCityData(): {
  cities: CityConfig[];
  business: BusinessData;
  isValid: boolean;
  errors: string[];
} {
  const cities = getAllCities();
  const business = businessData;
  
  // Validate all configurations
  const validation = validateBuildConfiguration(cities, business);
  
  return {
    cities,
    business,
    isValid: validation.isValid,
    errors: [
      ...validation.globalErrors,
      ...Object.values(validation.cityResults).flatMap(result => result.errors),
      ...validation.businessResult.errors
    ]
  };
}

/**
 * Gets city data with enhanced metadata for page generation
 */
export function getCityDataForPage(slug: string): {
  cityData: CityConfig | null;
  businessData: BusinessData;
  metadata: unknown;
  schema: unknown[];
  heroHeadline: string;
} | null {
  const cityData = getCityBySlug(slug);
  
  if (!cityData) {
    return null;
  }
  
  // Generate enhanced metadata
  const metadata = generateCityMetadata(cityData, businessData);
  
  // Generate schema markup
  const schema = generateCityPageSchema(cityData, businessData);
  
  // Generate hero headline
  const heroHeadline = generateCityHeroHeadline(cityData.name);
  
  return {
    cityData,
    businessData,
    metadata,
    schema,
    heroHeadline
  };
}

/**
 * Generates static params for Next.js static generation
 */
export function generateCityStaticParams(): Array<{ city: string }> {
  const slugs = getAllCitySlugs();
  return slugs.map(slug => ({ city: slug }));
}

/**
 * Gets all city data for sitemap generation
 */
export function getCitiesForSitemap(): Array<{
  slug: string;
  name: string;
  url: string;
  lastModified: Date;
}> {
  const cities = getAllCities();
  const now = new Date();
  
  return cities.map(city => ({
    slug: city.slug,
    name: city.name,
    url: `/${city.slug}-house-cleaning`,
    lastModified: now
  }));
}

/**
 * Gets city data with SEO enhancements
 */
export function getCityWithSEOData(slug: string): (CityConfig & {
  enhancedSEO: {
    title: string;
    description: string;
    keywords: string[];
    heroHeadline: string;
  };
}) | null {
  const cityData = getCityBySlug(slug);
  
  if (!cityData) {
    return null;
  }
  
  return {
    ...cityData,
    enhancedSEO: {
      title: generateCityTitle(cityData.name, cityData.state),
      description: generateCityDescription(cityData.name, cityData.state),
      keywords: generateCityKeywords(cityData.name, cityData.state),
      heroHeadline: generateCityHeroHeadline(cityData.name)
    }
  };
}

/**
 * Gets nearby cities for internal linking
 */
export function getNearbyCityData(currentSlug: string, limit: number = 3): Array<{
  name: string;
  slug: string;
  url: string;
}> {
  const cities = getAllCities();
  const currentCity = getCityBySlug(currentSlug);
  
  if (!currentCity) {
    return [];
  }
  
  // Filter out current city and limit results
  return cities
    .filter(city => city.slug !== currentSlug)
    .slice(0, limit)
    .map(city => ({
      name: city.name,
      slug: city.slug,
      url: `/${city.slug}-house-cleaning`
    }));
}

/**
 * Validates city data at build time and throws if invalid
 */
export function validateCityDataOrThrow(): void {
  const { isValid, errors } = loadCityData();
  
  if (!isValid) {
    const errorMessage = `
❌ City data validation failed:

${errors.map(error => `  • ${error}`).join('\n')}

Please fix these errors before building.
    `.trim();
    
    throw new Error(errorMessage);
  }
}

/**
 * Gets city data for a specific route with error handling
 */
export function getCityDataSafe(slug: string): CityConfig | null {      
  try {
    return getCityBySlug(slug) || null;
  } catch (error) {
    console.error(`Error loading city data for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Gets all cities with their basic info for navigation/listings
 */
export function getCitiesForNavigation(): Array<{
  name: string;
  slug: string;
  url: string;
  state: string;
}> {
  const cities = getAllCities();
  
  return cities.map(city => ({
    name: city.name,
    slug: city.slug,
    url: `/${city.slug}-house-cleaning`,
    state: city.state
  }));
}

/**
 * Searches cities by name or slug
 */
export function searchCities(query: string): CityConfig[] {
  const cities = getAllCities();
  const lowerQuery = query.toLowerCase();
  
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowerQuery) ||
    city.slug.toLowerCase().includes(lowerQuery) ||
    city.neighborhoods.some(neighborhood => 
      neighborhood.toLowerCase().includes(lowerQuery)
    ) ||
    city.landmarks.some(landmark => 
      landmark.toLowerCase().includes(lowerQuery)
    )
  );
}

/**
 * Gets city statistics for analytics/reporting
 */
export function getCityStatistics(): {
  totalCities: number;
  averagePrice: number;
  priceRange: { min: number; max: number };
  totalZipCodes: number;
  totalNeighborhoods: number;
  totalLandmarks: number;
} {
  const cities = getAllCities();
  
  const prices = cities.map(city => city.pricing.averageVisit);
  const allZipCodes = cities.flatMap(city => city.zipCodes);
  const allNeighborhoods = cities.flatMap(city => city.neighborhoods);
  const allLandmarks = cities.flatMap(city => city.landmarks);
  
  return {
    totalCities: cities.length,
    averagePrice: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length),
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    totalZipCodes: new Set(allZipCodes).size,
    totalNeighborhoods: allNeighborhoods.length,
    totalLandmarks: allLandmarks.length
  };
}