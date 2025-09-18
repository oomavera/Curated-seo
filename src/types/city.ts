/**
 * City Configuration Types
 * Defines the structure for city-specific data used in landing pages
 */

export interface CityConfig {
  // Basic Info
  name: string;
  slug: string;
  state: string;
  zipCodes: string[];
  
  // SEO Data
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
  };
  
  // Local Content
  neighborhoods: string[];
  landmarks: string[];
  localDescription: string;
  
  // Business Data
  pricing: {
    averageVisit: number;
    range: {
      min: number;
      max: number;
    };
  };
  
  // Content
  testimonials?: Array<{
    quote: string;
    name: string;
    location: string;
  }>;
  
  // Geographic
  coordinates: {
    latitude: number;
    longitude: number;
  };
  
  // Service Areas
  serviceAreas: string[];
  
  // Internal Linking
  nearbyPages?: Array<{
    city: string;
    url: string;
  }>;
}

export interface BusinessData {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  serviceTypes: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  certifications: string[];
  yearEstablished: number;
  employeeCount: number;
  serviceRadius: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface CityPageData {
  city: CityConfig;
  business: BusinessData;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
    ogImage?: string;
  };
  schema: unknown[];
  content: {
    heroHeadline: string;
    localDescription: string;
    testimonials: Array<{
      quote: string;
      name: string;
      location: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    serviceAreas: string[];
  };
}

export interface CityGenerationOptions {
  includeSchema: boolean;
  includeTestimonials: boolean;
  includeFAQs: boolean;
  includeServiceAreas: boolean;
  maxKeywords: number;
}

export interface BuildValidationResult {
  isValid: boolean;
  errors: Array<{
    city: string;
    type: 'error' | 'warning';
    message: string;
  }>;
  summary: {
    totalCities: number;
    validCities: number;
    totalErrors: number;
    totalWarnings: number;
  };
}

export interface SiteMapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface PageFeatures {
  hero: boolean;
  testimonials: boolean;
  gallery: boolean;
  calculator: boolean;
  faq: boolean;
  serviceAreas: boolean;
  pricing: boolean;
  contact: boolean;
  booking: boolean;
}