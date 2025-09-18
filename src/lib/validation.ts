/**
 * Enhanced Validation Utilities
 * Comprehensive validation for city data and configurations
 */

import { CityConfig, BusinessData, ValidationResult } from '../types/city';
import { isValidZipCode, isValidPhoneNumber, isValidEmail, isValidUrl } from './cityUtils';

/**
 * Validates business data configuration
 */
export function validateBusinessData(data: BusinessData): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Required fields
  if (!data.name) errors.push("Business name is required");
  if (!data.phone) errors.push("Business phone is required");
  if (!data.email) errors.push("Business email is required");
  if (!data.hours) errors.push("Business hours are required");
  
  // Format validation
  if (data.phone && !isValidPhoneNumber(data.phone)) {
    errors.push("Phone number must be in format: (XXX) XXX-XXXX");
  }
  
  if (data.email && !isValidEmail(data.email)) {
    errors.push("Email must be a valid email address");
  }
  
  // Service types validation
  if (!data.serviceTypes || data.serviceTypes.length === 0) {
    warnings.push("At least one service type is recommended");
  }
  
  // Price range validation
  if (!data.priceRange) {
    warnings.push("Price range is recommended for SEO");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates city configuration with enhanced checks
 */
export function validateCityConfigEnhanced(config: CityConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Basic validation
  if (!config.name) errors.push("City name is required");
  if (!config.slug) errors.push("City slug is required");
  if (!config.state) errors.push("State is required");
  
  // Slug validation
  if (config.slug && !/^[a-z0-9-]+$/.test(config.slug)) {
    errors.push("City slug must contain only lowercase letters, numbers, and hyphens");
  }
  
  // ZIP codes validation
  if (!config.zipCodes || config.zipCodes.length === 0) {
    errors.push("At least one ZIP code is required");
  } else {
    config.zipCodes.forEach((zip, index) => {
      if (!isValidZipCode(zip)) {
        errors.push(`ZIP code ${index + 1} (${zip}) is not in valid format`);
      }
    });
  }
  
  // SEO validation
  if (!config.seo) {
    errors.push("SEO configuration is required");
  } else {
    if (!config.seo.title) {
      errors.push("SEO title is required");
    } else {
      if (config.seo.title.length > 60) {
        warnings.push(`SEO title is ${config.seo.title.length} characters (recommended: ≤60)`);
      }
      if (config.seo.title.length < 30) {
        warnings.push(`SEO title is ${config.seo.title.length} characters (recommended: ≥30)`);
      }
    }
    
    if (!config.seo.description) {
      errors.push("SEO description is required");
    } else {
      if (config.seo.description.length > 160) {
        warnings.push(`SEO description is ${config.seo.description.length} characters (recommended: ≤160)`);
      }
      if (config.seo.description.length < 120) {
        warnings.push(`SEO description is ${config.seo.description.length} characters (recommended: ≥120)`);
      }
    }
    
    if (!config.seo.canonicalUrl) {
      errors.push("Canonical URL is required");
    } else if (!isValidUrl(config.seo.canonicalUrl)) {
      errors.push("Canonical URL must be a valid URL");
    }
    
    if (!config.seo.keywords || config.seo.keywords.length === 0) {
      warnings.push("SEO keywords are recommended");
    } else if (config.seo.keywords.length < 5) {
      warnings.push("At least 5 SEO keywords are recommended");
    }
  }
  
  // Content validation
  if (!config.localDescription) {
    errors.push("Local description is required");
  } else if (config.localDescription.length < 50) {
    warnings.push("Local description should be at least 50 characters for better SEO");
  }
  
  if (!config.neighborhoods || config.neighborhoods.length === 0) {
    warnings.push("Neighborhoods list helps with local SEO");
  }
  
  if (!config.landmarks || config.landmarks.length === 0) {
    warnings.push("Landmarks list helps with local relevance");
  }
  
  // Pricing validation
  if (!config.pricing) {
    errors.push("Pricing configuration is required");
  } else {
    if (!config.pricing.averageVisit || config.pricing.averageVisit <= 0) {
      errors.push("Average visit price must be greater than 0");
    }
    
    if (!config.pricing.range) {
      errors.push("Price range is required");
    } else {
      if (config.pricing.range.min >= config.pricing.range.max) {
        errors.push("Price range minimum must be less than maximum");
      }
      
      if (config.pricing.averageVisit < config.pricing.range.min ||
          config.pricing.averageVisit > config.pricing.range.max) {
        errors.push("Average visit price should be within the specified range");
      }
    }
  }
  
  // Testimonials validation
  if (!config.testimonials || config.testimonials.length === 0) {
    warnings.push("At least one testimonial is recommended for credibility");
  } else {
    config.testimonials.forEach((testimonial, index) => {
      if (!testimonial.quote) {
        errors.push(`Testimonial ${index + 1} is missing quote text`);
      } else if (testimonial.quote.length < 20) {
        warnings.push(`Testimonial ${index + 1} quote is very short (${testimonial.quote.length} chars)`);
      }
      
      if (!testimonial.name) {
        errors.push(`Testimonial ${index + 1} is missing author name`);
      }
    });
  }
  
  // Geographic validation
  if (!config.coordinates) {
    errors.push("Geographic coordinates are required");
  } else {
    if (!config.coordinates.latitude || !config.coordinates.longitude) {
      errors.push("Both latitude and longitude are required");
    }
    
    if (Math.abs(config.coordinates.latitude) > 90) {
      errors.push("Latitude must be between -90 and 90");
    }
    
    if (Math.abs(config.coordinates.longitude) > 180) {
      errors.push("Longitude must be between -180 and 180");
    }
    
    // Florida-specific validation (rough bounds)
    if (config.state === 'FL') {
      if (config.coordinates.latitude < 24.5 || config.coordinates.latitude > 31) {
        warnings.push("Latitude seems outside Florida bounds");
      }
      if (config.coordinates.longitude < -87.5 || config.coordinates.longitude > -80) {
        warnings.push("Longitude seems outside Florida bounds");
      }
    }
  }
  
  // Service areas validation
  if (!config.serviceAreas || config.serviceAreas.length === 0) {
    errors.push("At least one service area is required");
  } else {
    // Check if primary city is in service areas
    if (!config.serviceAreas.includes(config.name)) {
      warnings.push(`Primary city "${config.name}" should be included in service areas`);
    }
  }
  
  // Nearby pages validation
  if (config.nearbyPages) {
    config.nearbyPages.forEach((page, index) => {
      if (!page.city) {
        errors.push(`Nearby page ${index + 1} is missing city name`);
      }
      if (!page.url) {
        errors.push(`Nearby page ${index + 1} is missing URL`);
      } else if (!page.url.startsWith('/')) {
        warnings.push(`Nearby page ${index + 1} URL should be relative (start with /)`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates all configurations at build time
 */
export function validateBuildConfiguration(cities: CityConfig[], business: BusinessData): {
  isValid: boolean;
  cityResults: { [cityName: string]: ValidationResult };
  businessResult: ValidationResult;
  globalErrors: string[];
} {
  const cityResults: { [cityName: string]: ValidationResult } = {};
  const globalErrors: string[] = [];
  
  // Validate business data
  const businessResult = validateBusinessData(business);
  
  // Validate each city
  cities.forEach(city => {
    cityResults[city.name] = validateCityConfigEnhanced(city);
  });
  
  // Check for duplicate slugs
  const slugs = new Set<string>();
  cities.forEach(city => {
    if (slugs.has(city.slug)) {
      globalErrors.push(`Duplicate city slug found: ${city.slug}`);
    }
    slugs.add(city.slug);
  });
  
  // Check for duplicate names
  const names = new Set<string>();
  cities.forEach(city => {
    if (names.has(city.name)) {
      globalErrors.push(`Duplicate city name found: ${city.name}`);
    }
    names.add(city.name);
  });
  
  // Check if we have any cities
  if (cities.length === 0) {
    globalErrors.push("No cities configured");
  }
  
  // Determine overall validity
  const allCitiesValid = Object.values(cityResults).every(result => result.isValid);
  const isValid = businessResult.isValid && allCitiesValid && globalErrors.length === 0;
  
  return {
    isValid,
    cityResults,
    businessResult,
    globalErrors
  };
}

/**
 * Logs validation results in a readable format
 */
export function logValidationResults(results: ReturnType<typeof validateBuildConfiguration>): void {
  console.log('\n🔍 Build Configuration Validation Results\n');
  
  // Business validation
  console.log('📊 Business Data:');
  if (results.businessResult.isValid) {
    console.log('  ✅ Valid');
  } else {
    console.log('  ❌ Invalid');
    results.businessResult.errors.forEach(error => {
      console.log(`    • ${error}`);
    });
  }
  
  if (results.businessResult.warnings && results.businessResult.warnings.length > 0) {
    console.log('  ⚠️  Warnings:');
    results.businessResult.warnings.forEach(warning => {
      console.log(`    • ${warning}`);
    });
  }
  
  // City validation
  console.log('\n🏙️  City Data:');
  Object.entries(results.cityResults).forEach(([cityName, result]) => {
    if (result.isValid) {
      console.log(`  ✅ ${cityName}: Valid`);
    } else {
      console.log(`  ❌ ${cityName}: Invalid`);
      result.errors.forEach(error => {
        console.log(`    • ${error}`);
      });
    }
    
    if (result.warnings && result.warnings.length > 0) {
      console.log(`  ⚠️  ${cityName} Warnings:`);
      result.warnings.forEach(warning => {
        console.log(`    • ${warning}`);
      });
    }
  });
  
  // Global errors
  if (results.globalErrors.length > 0) {
    console.log('\n🚨 Global Errors:');
    results.globalErrors.forEach(error => {
      console.log(`  • ${error}`);
    });
  }
  
  // Summary
  console.log(`\n📋 Summary: ${results.isValid ? '✅ All Valid' : '❌ Validation Failed'}\n`);
}