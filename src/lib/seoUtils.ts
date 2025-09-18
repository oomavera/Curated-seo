/**
 * SEO Utilities
 * Helper functions for generating SEO metadata and schema markup
 */

import { CityConfig, BusinessData } from '../types/city';
import { Metadata } from 'next';

/**
 * Generates Next.js metadata for a city page
 */
export function generateCityMetadata(cityData: CityConfig, businessData: BusinessData): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curatedcleanings.com";
  
  return {
    metadataBase: new URL(siteUrl),
    title: cityData.seo.title,
    description: cityData.seo.description,
    keywords: cityData.seo.keywords.join(', '),
    
    openGraph: {
      title: cityData.seo.title,
      description: cityData.seo.description,
      type: "website",
      locale: "en_US",
      siteName: businessData.name,
      url: cityData.seo.canonicalUrl,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${businessData.name} - Professional House Cleaning Services ${cityData.name} ${cityData.state}`
        }
      ]
    },
    
    twitter: {
      card: "summary_large_image",
      title: cityData.seo.title,
      description: cityData.seo.description,
      images: ["/og.png"]
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    alternates: {
      canonical: cityData.seo.canonicalUrl
    },
    
    icons: {
      icon: [
        { url: "/NewestFavicon.png", type: "image/png" },
        { url: "/NewestFavicon.png", sizes: "32x32", type: "image/png" },
        { url: "/NewestFavicon.png", sizes: "192x192", type: "image/png" }
      ],
      shortcut: "/NewestFavicon.png",
      apple: "/NewestFavicon.png"
    }
  };
}

/**
 * Generates LocalBusiness schema markup for a city
 */
export function generateLocalBusinessSchema(cityData: CityConfig, businessData: BusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${cityData.seo.canonicalUrl}/#business`,
    "name": businessData.name,
    "alternateName": `${businessData.name} House Cleaning Services`,
    "description": `Professional house cleaning services in ${cityData.name}, ${cityData.state}. ${cityData.localDescription}`,
    "url": cityData.seo.canonicalUrl,
    "telephone": businessData.phone,
    "email": businessData.email,
    
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "US",
      "postalCode": cityData.zipCodes[0] // Use first ZIP code
    },
    
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cityData.coordinates.latitude.toString(),
      "longitude": cityData.coordinates.longitude.toString()
    },
    
    "areaServed": cityData.serviceAreas.map(area => ({
      "@type": "City",
      "name": area,
      "sameAs": `https://en.wikipedia.org/wiki/${area.replace(/\s+/g, '_')},_Florida`
    })),
    
    "serviceType": businessData.serviceTypes,
    "priceRange": businessData.priceRange,
    "paymentAccepted": ["Cash", "Check", "Credit Card"],
    "currenciesAccepted": "USD",
    "openingHours": businessData.hours,
    
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    
    "review": (cityData.testimonials || []).slice(0, 2).map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": testimonial.quote
    })),
    
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Cleaning",
            "description": "A thorough clean including dusting, vacuuming, mopping, bathroom cleaning, and kitchen cleaning. Perfect for regular maintenance."
          },
          "price": "125",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Deep Cleaning",
            "description": "Comprehensive deep scrubbing including everything in standard cleaning plus baseboards, inside microwave, and cabinet exteriors."
          },
          "price": "150",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  };
}

/**
 * Generates FAQ schema markup
 */
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generates Service schema markup
 */
export function generateServiceSchema(cityData: CityConfig, businessData: BusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `House Cleaning Services in ${cityData.name}, ${cityData.state}`,
    "description": cityData.localDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": businessData.name,
      "telephone": businessData.phone,
      "email": businessData.email
    },
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "US"
    },
    "offers": {
      "@type": "Offer",
      "price": cityData.pricing.averageVisit.toString(),
      "priceCurrency": "USD",
      "description": `Professional house cleaning services starting at $${cityData.pricing.range.min}`
    }
  };
}/**

 * Generates complete schema markup for city page
 */
export function generateCityPageSchema(cityData: CityConfig, businessData: BusinessData, faqs?: Array<{question: string, answer: string}>) {
  const schemas: unknown[] = [
    generateLocalBusinessSchema(cityData, businessData),
    generateServiceSchema(cityData, businessData)
  ];
  
  if (faqs && faqs.length > 0) {
    const faqSchema = generateFAQSchema(faqs);
    if (faqSchema) schemas.push(faqSchema);
  }
  
  return schemas;
}

/**
 * Generates breadcrumb schema markup
 */
export function generateBreadcrumbSchema(cityData: CityConfig) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curatedcleanings.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${cityData.name} House Cleaning`,
        "item": cityData.seo.canonicalUrl
      }
    ]
  };
}

/**
 * Generates offer schema markup for free voucher
 */
export function generateOfferSchema(cityData: CityConfig, businessData: BusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": `Free Cleaning Voucher - ${cityData.name}`,
    "description": `Claim your FREE cleaning voucher for professional house cleaning services in ${cityData.name}, ${cityData.state}`,
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    "seller": {
      "@type": "LocalBusiness",
      "name": businessData.name,
      "telephone": businessData.phone,
      "email": businessData.email
    },
    "eligibleRegion": {
      "@type": "City",
      "name": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "US"
    }
  };
}

/**
 * Generates organization schema markup
 */
export function generateOrganizationSchema(businessData: BusinessData) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curatedcleanings.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": businessData.name,
    "url": siteUrl,
    "telephone": businessData.phone,
    "email": businessData.email,
    "logo": `${siteUrl}/Logo2.png`,
    "sameAs": [
      // Add social media URLs here when available
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": businessData.phone,
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };
}

/**
 * Validates schema markup
 */
export function validateSchema(schema: unknown): boolean {
  try {
    // Basic validation - check required fields
    const schemaObj = schema as Record<string, unknown>;
    if (!schemaObj["@context"] || !schemaObj["@type"]) {
      return false;
    }
    
    // Ensure it's valid JSON
    JSON.stringify(schema);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates robots meta tag content
 */
export function generateRobotsContent(index: boolean = true, follow: boolean = true): string {
  const indexValue = index ? 'index' : 'noindex';
  const followValue = follow ? 'follow' : 'nofollow';
  return `${indexValue}, ${followValue}`;
}