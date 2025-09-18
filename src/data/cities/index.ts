/**
 * City Data Index
 * Exports all city configurations and utility functions
 */

import { CityConfig } from '../../types/city';

// City data imports
import { oviedoCityData } from './oviedo';
import { winterParkCityData } from './winter-park';
import { lakeMaryData } from './lake-mary';
import { orlandoCityData } from './orlando';
import { longwoodCityData } from './longwood';

// All city configurations
export const allCities: CityConfig[] = [
  oviedoCityData,
  winterParkCityData,
  lakeMaryData,
  orlandoCityData,
  longwoodCityData
];

/**
 * Gets all city configurations
 */
export function getAllCities(): CityConfig[] {
  return allCities;
}

/**
 * Gets city configuration by slug
 */
export function getCityBySlug(slug: string): CityConfig | undefined {
  return allCities.find(city => city.slug === slug);
}

/**
 * Gets all city slugs for static generation
 */
export function getAllCitySlugs(): string[] {
  return allCities.map(city => city.slug);
}

/**
 * Validates that all city data is properly configured
 */
export function validateAllCityData(): boolean {
  if (allCities.length === 0) {
    console.warn('No city data configured');
    return false;
  }
  
  const slugs = new Set<string>();
  const names = new Set<string>();
  
  for (const city of allCities) {
    // Check for duplicate slugs
    if (slugs.has(city.slug)) {
      console.error(`Duplicate city slug found: ${city.slug}`);
      return false;
    }
    slugs.add(city.slug);
    
    // Check for duplicate names
    if (names.has(city.name)) {
      console.error(`Duplicate city name found: ${city.name}`);
      return false;
    }
    names.add(city.name);
  }
  
  return true;
}