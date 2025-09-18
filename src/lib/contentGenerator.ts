/**
 * Content Generation Utilities
 * Functions for generating dynamic content from city data
 */

import { CityConfig } from '../types/city';
import { commonFAQs } from './cityUtils';

/**
 * Generates FAQ data for a city page
 */
export function generateCityFAQs(cityData: CityConfig): Array<{question: string, answer: string}> {
  // Use common FAQs and customize some answers for the city
  return commonFAQs.map(faq => {
    let customizedAnswer = faq.answer;
    
    // Customize specific answers with city name
    if (faq.question.includes('reschedule') || faq.question.includes('cancel')) {
      customizedAnswer = faq.answer.replace('life happens', `${cityData.name} life is unpredictable`);
    }
    
    return {
      question: faq.question,
      answer: customizedAnswer
    };
  });
}

/**
 * Generates service descriptions with city-specific content
 */
export function generateCityServices(cityData: CityConfig): {
  recurring: { title: string; description: string };
  deep: { title: string; description: string };
  moveInOut: { title: string; description: string };
} {
  return {
    recurring: {
      title: "Recurring (Weekly/Bi-Weekly/Monthly)",
      description: `Stop cleaning on weekends in ${cityData.name}. Lock in a cadence that fits your family's schedule. We strive to send the same team so they learn your preferences—from sensitive surfaces to pet-friendly areas.`
    },
    deep: {
      title: "Deep & First-Time Cleans", 
      description: `If it's been a while since a thorough scrub in your ${cityData.name} home—or you're onboarding with us—our deep clean hits baseboards, vents, blinds, and grime magnets most "standard cleans" ignore. Ideal before holidays, parties, or seasonal resets.`
    },
    moveInOut: {
      title: "Move-In/Move-Out Cleaning",
      description: `Moving in ${cityData.name}? We handle inside cabinets, appliances (by request), and fixtures so you get deposits back and buyers impressed. Need proof for landlords? Our photo QA doubles as documentation.`
    }
  };
}

/**
 * Generates pricing content with city-specific information
 */
export function generatePricingContent(cityData: CityConfig): {
  title: string;
  description: string;
  averagePrice: string;
  priceRange: string;
} {
  const { averageVisit, range } = cityData.pricing;
  
  return {
    title: `How Much Does House Cleaning Cost in ${cityData.name}?`,
    description: `Most ${cityData.name} homes fall between $${range.min}–$${range.max} per visit, averaging $${averageVisit}. Pricing depends on size, condition, and extras (e.g., ovens, fridges, baseboard detailing). Unlike hourly surprises, our flat-rate model keeps budgeting simple for recurring schedules. Use our online estimate form—no phone tag—to get a locked quote.`,
    averagePrice: `$${averageVisit}`,
    priceRange: `$${range.min}–$${range.max}`
  };
}

/**
 * Generates service areas content with city highlighting
 */
export function generateServiceAreasContent(cityData: CityConfig): {
  title: string;
  primaryDescription: string;
  neighborhoodsDescription: string;
  landmarksDescription: string;
} {
  const neighborhoodsList = cityData.neighborhoods.join(', ');
  const landmarksList = cityData.landmarks.join(', ');
  const zipCodesList = cityData.zipCodes.join(' and ');
  
  return {
    title: `Areas We Serve Near ${cityData.name}`,
    primaryDescription: `We regularly clean across ZIP code${cityData.zipCodes.length > 1 ? 's' : ''} ${zipCodesList}, plus neighborhoods like ${neighborhoodsList}.`,
    neighborhoodsDescription: `Our ${cityData.name} service area includes: ${neighborhoodsList}`,
    landmarksDescription: `Landmarks we know and love: ${landmarksList}—yes, we've cleaned homes all around them.`
  };
}

/**
 * Generates call-to-action content with city-specific messaging
 */
export function generateCTAContent(cityData: CityConfig): {
  primary: { title: string; description: string; buttonText: string };
  secondary: { title: string; description: string; buttonText: string };
} {
  const localAttraction = cityData.landmarks[0] || `${cityData.name} attractions`;
  
  return {
    primary: {
      title: `Get $25 Off Your First ${cityData.name} Clean`,
      description: "Flat-rate pricing, eco-friendly options, photo-verified quality.",
      buttonText: "Start Your Free Estimate"
    },
    secondary: {
      title: `Spend weekends at ${localAttraction}—not cleaning.`,
      description: "Lock in your recurring slot today and save $25.",
      buttonText: "Claim your discount →"
    }
  };
}

/**
 * Generates testimonial content for display
 */
export function generateTestimonialContent(cityData: CityConfig): Array<{
  quote: string;
  author: string;
  location: string;
  rating: number;
}> {
  return (cityData.testimonials || []).map(testimonial => ({
    quote: testimonial.quote,
    author: testimonial.name,
    location: testimonial.location || cityData.name,
    rating: 5 // All testimonials are 5-star
  }));
}

/**
 * Generates breadcrumb data for navigation
 */
export function generateBreadcrumbs(cityData: CityConfig): Array<{
  name: string;
  url: string;
  isActive: boolean;
}> {
  return [
    {
      name: "Home",
      url: "/",
      isActive: false
    },
    {
      name: "House Cleaning Services",
      url: "/services",
      isActive: false
    },
    {
      name: `${cityData.name} House Cleaning`,
      url: `/${cityData.slug}-house-cleaning`,
      isActive: true
    }
  ];
}

/**
 * Generates quick answer box content
 */
export function generateQuickAnswer(cityData: CityConfig): {
  question: string;
  answer: string;
} {
  return {
    question: `Quick Answer: Who's the best choice for house cleaning ${cityData.name} ${cityData.state}?`,
    answer: `Curated Cleanings offers flat-rate pricing (avg $${cityData.pricing.averageVisit}), eco-friendly options, and photo-verified quality checks—perfect for ${cityData.name}'s busy households. New clients save $25 on their first clean. Book online in minutes for a guaranteed, locally trusted service.`
  };
}

/**
 * Generates intro paragraph with local context
 */
export function generateIntroContent(cityData: CityConfig): string {
  const localContext = cityData.landmarks.length > 0 
    ? ` when you could be enjoying ${cityData.landmarks.slice(0, 2).join(' or ')}`
    : '';
    
  return `${cityData.localDescription} Curated Cleanings delivers meticulous house cleaning ${cityData.name} ${cityData.state} homeowners rely on—tailored to busy families in ${cityData.neighborhoods[0] || cityData.name}, professionals throughout the area, and nature lovers${localContext}. Our flat-rate model (average visit: $${cityData.pricing.averageVisit}) ends surprise bills, and every clean is verified with room-by-room photo QA. Prefer greener products? Just ask—eco-friendly is built into our workflow. Book now to claim $25 off your first ${cityData.name} cleaning and experience the difference of a local team that actually documents quality.`;
}

/**
 * Generates "Why Choose Us" content with local benefits
 */
export function generateWhyChooseUsContent(cityData: CityConfig): {
  title: string;
  intro: string;
  benefits: Array<{ title: string; description: string }>;
} {
  const localTestimonial = cityData.testimonials?.[0];
  
  return {
    title: `Why Choose Curated Cleanings in ${cityData.name}`,
    intro: `${cityData.name} homes vary—from ${cityData.neighborhoods[0] || 'residential areas'} to ${cityData.neighborhoods[1] || 'local communities'}—so your cleaning plan can't be cookie-cutter. Here's how we adapt:`,
    benefits: [
      {
        title: `Trusted by ${cityData.name} families and professionals`,
        description: "Background-checked, trained cleaners who respect your home and schedule."
      },
      {
        title: `Flexible scheduling for busy ${cityData.name} lifestyles`,
        description: "Weekly, bi-weekly, or monthly plans to match your rhythm."
      },
      {
        title: "Eco-friendly cleaning options",
        description: "Request green products without sacrificing sparkle—perfect for health-conscious families."
      },
      {
        title: "Flat-rate transparency",
        description: `Typical visits average $${cityData.pricing.averageVisit}, so you know the cost before we arrive.`
      },
      {
        title: "Proof, not promises",
        description: "Our cleaners upload room-level photos; managers review the same day."
      },
      {
        title: "A real local voice",
        description: localTestimonial ? `"${localTestimonial.quote}" says ${localTestimonial.name}.` : "Trusted by local residents throughout the area."
      }
    ]
  };
}