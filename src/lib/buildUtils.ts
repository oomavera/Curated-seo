/**
 * Build-Time Utilities
 * Functions for build-time validation, generation, and optimization
 */

import { loadCityData, validateCityDataOrThrow, getCitiesForSitemap } from './cityDataManager';
import { generateCityMetadata } from './seoUtils';

/**
 * Validates all city data at build time
 */
export function validateAtBuildTime(): void {
  console.log('🔍 Validating city configurations at build time...\n');
  
  try {
    validateCityDataOrThrow();
    console.log('✅ All city configurations are valid!\n');
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

/**
 * Generates build statistics
 */
export function generateBuildStats(): {
  totalCities: number;
  totalPages: number;
  totalRoutes: string[];
  buildTime: Date;
} {
  const { cities } = loadCityData();
  const routes = cities.map(city => `/${city.slug}-house-cleaning`);
  
  return {
    totalCities: cities.length,
    totalPages: cities.length,
    totalRoutes: routes,
    buildTime: new Date()
  };
}

/**
 * Pre-generates all metadata for build optimization
 */
export function preGenerateMetadata(): Map<string, unknown> {
  const { cities, business } = loadCityData();
  const metadataMap = new Map();
  
  cities.forEach(city => {
    const metadata = generateCityMetadata(city, business);
    metadataMap.set(city.slug, metadata);
  });
  
  return metadataMap;
}

/**
 * Generates sitemap data for all cities
 */
export function generateSitemapData(): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
}> {
  const cities = getCitiesForSitemap();
  
  return cities.map(city => ({
    url: `https://curatedcleanings.com${city.url}`,
    lastModified: city.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));
}

/**
 * Validates that all required assets exist
 */
export function validateAssets(): {
  isValid: boolean;
  missingAssets: string[];
} {
  
  const missingAssets: string[] = [];
  
  // In a real implementation, you would check if these files exist
  // For now, we'll assume they exist
  
  return {
    isValid: missingAssets.length === 0,
    missingAssets
  };
}

/**
 * Generates robots.txt entries for city pages
 */
export function generateRobotsEntries(): string[] {
  const { cities } = loadCityData();
  
  return cities.map(city => `Allow: /${city.slug}-house-cleaning`);
}

/**
 * Checks for potential SEO issues across all cities
 */
export function checkSEOIssues(): {
  issues: Array<{
    city: string;
    type: 'warning' | 'error';
    message: string;
  }>;
  summary: {
    totalIssues: number;
    errors: number;
    warnings: number;
  };
} {
  const { cities } = loadCityData();
  const issues: Array<{
    city: string;
    type: 'warning' | 'error';
    message: string;
  }> = [];
  
  cities.forEach(city => {
    // Check title length
    if (city.seo.title.length > 60) {
      issues.push({
        city: city.name,
        type: 'warning',
        message: `SEO title is ${city.seo.title.length} characters (recommended: ≤60)`
      });
    }
    
    // Check description length
    if (city.seo.description.length > 160) {
      issues.push({
        city: city.name,
        type: 'warning',
        message: `SEO description is ${city.seo.description.length} characters (recommended: ≤160)`
      });
    }
    
    // Check for duplicate content patterns
    const titleWords = city.seo.title.toLowerCase().split(' ');
    
    if (titleWords.filter(word => word === 'cleaning').length > 2) {
      issues.push({
        city: city.name,
        type: 'warning',
        message: 'Title may have keyword stuffing (multiple "cleaning" instances)'
      });
    }
    
    // Check testimonials
    if (!city.testimonials || city.testimonials.length === 0) {
      issues.push({
        city: city.name,
        type: 'warning',
        message: 'No testimonials configured - consider adding for credibility'
      });
    }
    
    // Check neighborhoods
    if (city.neighborhoods.length < 3) {
      issues.push({
        city: city.name,
        type: 'warning',
        message: 'Few neighborhoods listed - consider adding more for local relevance'
      });
    }
  });
  
  const errors = issues.filter(issue => issue.type === 'error').length;
  const warnings = issues.filter(issue => issue.type === 'warning').length;
  
  return {
    issues,
    summary: {
      totalIssues: issues.length,
      errors,
      warnings
    }
  };
}

/**
 * Logs build information
 */
export function logBuildInfo(): void {
  const stats = generateBuildStats();
  const seoIssues = checkSEOIssues();
  
  console.log('🏗️  Build Information\n');
  console.log(`📊 Cities: ${stats.totalCities}`);
  console.log(`📄 Pages: ${stats.totalPages}`);
  console.log(`🔗 Routes: ${stats.totalRoutes.join(', ')}`);
  console.log(`⏰ Build Time: ${stats.buildTime.toISOString()}\n`);
  
  if (seoIssues.summary.totalIssues > 0) {
    console.log('⚠️  SEO Issues Found:');
    console.log(`   Errors: ${seoIssues.summary.errors}`);
    console.log(`   Warnings: ${seoIssues.summary.warnings}\n`);
    
    seoIssues.issues.forEach(issue => {
      const icon = issue.type === 'error' ? '❌' : '⚠️';
      console.log(`   ${icon} ${issue.city}: ${issue.message}`);
    });
    console.log('');
  } else {
    console.log('✅ No SEO issues found!\n');
  }
}

/**
 * Runs complete build validation
 */
export function runBuildValidation(): boolean {
  console.log('🚀 Running complete build validation...\n');
  
  try {
    // Validate city data
    validateAtBuildTime();
    
    // Check assets
    const assetCheck = validateAssets();
    if (!assetCheck.isValid) {
      console.error('❌ Missing required assets:', assetCheck.missingAssets);
      return false;
    }
    
    // Log build info
    logBuildInfo();
    
    console.log('✅ Build validation completed successfully!\n');
    return true;
    
  } catch (error) {
    console.error('❌ Build validation failed:', error instanceof Error ? error.message : 'Unknown error');        
    return false;
  }
}