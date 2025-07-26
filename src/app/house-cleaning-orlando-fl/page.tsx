"use client";
/* eslint-disable react/no-unescaped-entities */

import CityPageLayout from '../../components/CityPageLayout';

export default function OrlandoHouseCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Curated Cleanings",
            "url": "https://curatedcleanings.com/house-cleaning-orlando-fl",
            "image": "https://curatedcleanings.com/images/orlando-hero.jpg",
            "telephone": "+1-407-270-0379",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Orlando",
              "addressRegion": "FL",
              "postalCode": "32801",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": "Orlando" },
              { "@type": "City", "name": "Baldwin Park" },
              { "@type": "City", "name": "College Park" }
            ],
            "serviceType": "House cleaning",
            "makesOffer": {
              "@type": "Offer",
              "name": "Orlando First-Clean Discount",
              "price": "188",
              "priceCurrency": "USD",
              "description": "$25 off your first Orlando cleaning",
              "eligibleRegion": { "@type": "City", "name": "Orlando" }
            },
            "hasFAQPage": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Do you bring supplies and equipment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Our team provides everything, including eco-friendly alternatives upon request."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do you ensure quality every visit?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cleaners upload room-by-room photos; a manager reviews them within hours to ensure consistency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I request the same cleaners each time?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We strive for team consistency and store your preferences to keep results uniform."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if I need to reschedule or cancel?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Provide 48 hours' notice to avoid fees; we're flexible when life happens."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you handle post-construction or heavy restoration cleans?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We assess on a case-by-case basis. Share your scope and we'll quote or refer as needed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are your products safe for pets and kids?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes—our default products are safe, and we can go fragrance-free or eco-only on request."
                  }
                }
              ]
            }
          })
        }}
      />
      <CityPageLayout
        title="House Cleaning Orlando FL"
        subtitle="Licensed, insured cleaners serving downtown Orlando, Baldwin Park, College Park, and surrounding areas - book in 60 seconds"
      >

        {/* Intro Section */}
        <section className="mb-12 max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            Your time in Orlando shouldn't be spent scrubbing when you could be enjoying Lake Eola or catching a show at Dr. Phillips Center. Curated Cleanings delivers meticulous house cleaning Orlando FL residents rely on—tailored to busy professionals downtown, families in Baldwin Park, and creative types in Thornton Park. Our flat-rate model (average visit: $188) ends surprise bills, and every clean is verified with room-by-room photo QA. Prefer greener products? Just ask—eco-friendly is built into our workflow. Book now to claim $25 off your first Orlando cleaning and experience the difference of a local team that actually documents quality.
          </p>
        </section>

        {/* Quick Answer Box */}
        <section className="mb-12 bg-blue-50 p-6 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Quick Answer: Who's the best choice for house cleaning Orlando FL?</h2>
          <p className="text-lg text-gray-700">
            Curated Cleanings offers flat-rate pricing (avg $188), eco-friendly options, and photo-verified quality checks—perfect for Orlando's busy urban lifestyle. New clients save $25 on their first clean. Book online in minutes for a guaranteed, locally trusted service.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Curated Cleanings in Orlando</h2>
          <p className="text-lg text-gray-700 mb-4">
            Orlando homes vary—from downtown high-rises to suburban Baldwin Park houses to historic College Park bungalows—so your cleaning plan can't be cookie-cutter. Here's how we adapt:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Trusted by Orlando families, professionals, and businesses:</strong> Background-checked, trained cleaners who understand city living demands.</li>
            <li><strong>Flexible scheduling for busy city lifestyles:</strong> Weekly, bi-weekly, or monthly plans to match your urban rhythm.</li>
            <li><strong>Eco-friendly cleaning options:</strong> Request green products without sacrificing sparkle—perfect for health-conscious city dwellers.</li>
            <li><strong>Flat-rate transparency:</strong> Typical visits average $188, so you know the cost before we arrive.</li>
            <li><strong>Proof, not promises:</strong> Our cleaners upload room-level photos; managers review the same day.</li>
            <li><strong>A real local voice:</strong> "Curated Cleanings made my downtown apartment feel brand new. Highly recommend for anyone in Orlando!" says Patrick.</li>
          </ul>
        </section>

        {/* Services */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our House Cleaning Services in Orlando</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Recurring (Weekly/Bi-Weekly/Monthly)</h3>
              <p className="text-gray-700">
                Stop spending weekends cleaning when you could be exploring the city. Lock in a cadence that fits your lifestyle. We strive to send the same team so they learn your preferences—from condo-specific needs to pet-friendly products.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Deep & First-Time Cleans</h3>
              <p className="text-gray-700">
                If it's been a while since a thorough scrub—or you're onboarding with us—our deep clean hits baseboards, vents, blinds, and grime magnets most "standard cleans" ignore. Ideal before hosting events or seasonal refreshes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Move-In/Move-Out Cleaning</h3>
              <p className="text-gray-700">
                Switching apartments in downtown or moving to the suburbs in Lake Eola Heights? We handle inside cabinets, appliances (by request), and fixtures so you get deposits back and new spaces shine. Need proof for landlords? Our photo QA doubles as documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Much Does House Cleaning Cost in Orlando?</h2>
          <p className="text-lg text-gray-700">
            Most Orlando homes fall between $160–$220 per visit, averaging $188. Pricing depends on size, condition, and extras (e.g., ovens, fridges, baseboard detailing). Unlike hourly surprises, our flat-rate model keeps budgeting simple for recurring schedules. Use our online estimate form—no phone tag—to get a locked quote. If you prefer à la carte add-ons (inside oven, inside fridge), just toggle them on in the form.
          </p>
        </section>

        {/* Service Areas */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Areas We Serve in Orlando</h2>
          <p className="text-lg text-gray-700 mb-4">
            We regularly clean across ZIP codes 32801, 32803, 32804, 32806, and 32814, plus neighborhoods like Downtown Orlando, Baldwin Park, College Park, Lake Eola Heights, and Thornton Park. Need service beyond central Orlando? Check out our dedicated pages for{' '}
            <a href="/house-cleaning-lake-mary-fl" className="text-blue-600 hover:text-blue-800 underline">Lake Mary house cleaning</a> and{' '}
            <a href="/house-cleaning-winter-park-fl" className="text-blue-600 hover:text-blue-800 underline">Winter Park maid service</a>.
          </p>
          <p className="text-lg text-gray-700">
            Landmarks we know and love: Lake Eola Park, Amway Center, Orlando Science Center, Dr. Phillips Center for the Performing Arts—yes, we've cleaned homes and apartments all around them.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Do you bring supplies and equipment?</h3>
              <p>Yes. Our team provides everything, including eco-friendly alternatives if requested. No last-minute "Can you supply a vacuum?" texts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">How do you ensure quality every visit?</h3>
              <p>Cleaners snap room-by-room photos; a manager reviews within hours. If anything's off, we fix it fast—just let us know within one business day.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Can I request the same cleaners each time?</h3>
              <p>We prioritize consistency. When schedules shift, your preferences live in our system so any team can deliver the same result.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">What if I need to reschedule or cancel?</h3>
              <p>Give us at least 48 hours' notice to avoid fees. We know city life is unpredictable—just communicate early.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Do you handle post-construction or heavy restoration cleans?</h3>
              <p>Case-by-case. Tell us the scope (dust, debris, paint splatter) in your request, and we'll quote accordingly or refer you to a specialist if it's outside our lane.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Are your products safe for pets and kids?</h3>
              <p>Yes. We default to safe, effective products, and can go fragrance-free or eco-only if you note it in your profile.</p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="mb-12 max-w-4xl mx-auto">
          <div className="bg-blue-100 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Get $25 Off Your First Orlando Clean</h3>
            <p className="text-blue-800 mb-4">Flat-rate pricing, eco-friendly options, photo-verified quality.</p>
            <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Start Your Free Estimate</a>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Spend evenings at Lake Eola—not cleaning.</h3>
            <p className="text-green-800 mb-4">Lock in your recurring slot today and save $25.</p>
            <a href="#" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Claim your discount →</a>
          </div>
        </section>
      </CityPageLayout>
    </>
  );
}