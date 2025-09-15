"use client";

import CityPageLayout from '../../components/CityPageLayout';
import GlassCard from '../../components/ui/GlassCard';
import PillButton from '../../components/ui/PillButton';

export default function WinterParkHouseCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Curated Cleanings",
            "url": "https://curatedcleanings.com/house-cleaning-winter-park-fl",
            "image": "https://curatedcleanings.com/Gallery/cleans/IMG_0935.webp",
            "telephone": "+1-407-470-1780",
            "priceRange": "$$"
          })
        }}
      />

      <CityPageLayout
        title="House Cleaning Winter Park FL"
        subtitle="Historic charm and lakefront living deserve more than a rushed wipe-down. Curated Cleanings delivers meticulous house cleaning Winter Park FL residents rely on—whether you're in Olde Winter Park's historic homes, a Windsong estate, or a condo near Rollins College. Our flat-rate model (average visit: $218) keeps budgeting simple, and every clean is verified with room-by-room photo QA. Prefer eco-friendly products? Just say the word. Lock in flexible recurring service, or book a one-time deep clean before guests arrive. Claim $25 off your first Winter Park cleaning and spend Saturday at the Farmers' Market—not scrubbing baseboards."
      >

        {/* Intro Section */}
        <section className="mb-12 max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            Historic charm and lakefront living deserve more than a rushed wipe-down. Curated Cleanings delivers meticulous house cleaning Winter Park FL residents rely on—whether you’re in Olde Winter Park’s historic homes, a Windsong estate, or a condo near Rollins College. Our flat-rate model (average visit: $218) keeps budgeting simple, and every clean is verified with room-by-room photo QA. Prefer eco-friendly products? Just say the word. Lock in flexible recurring service, or book a one-time deep clean before guests arrive. Claim $25 off your first Winter Park cleaning and spend Saturday at the Farmers’ Market—not scrubbing baseboards.
          </p>
        </section>

        {/* Quick Answer Box */}
        <section className="mb-12 max-w-4xl mx-auto">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Answer: Who’s the best choice for house cleaning Winter Park FL?</h2>
            <p className="text-lg text-gray-700">
              Curated Cleanings specializes in luxury and historic homes, uses eco-friendly products on request, and backs every visit with photo-verified QA. Flat-rate pricing averages $218, and new Winter Park clients get $25 off the first clean. Book online in minutes for a guaranteed, detail-obsessed service.
            </p>
          </GlassCard>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Curated Cleanings in Winter Park</h2>
          <p className="text-lg text-gray-700 mb-4">
            Winter Park properties range from century-old bungalows to modern lakefront builds—each with different surfaces, finishes, and expectations. Here’s how we meet them:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Trusted by Winter Park families and professionals:</strong> Background-checked, trained cleaners who respect antiques, art, and delicate finishes.</li>
            <li><strong>Attention to historic homes & luxury details:</strong> We follow surface-specific protocols (no harsh abrasives on original wood, careful polishing on fixtures).</li>
            <li><strong>Eco-friendly and fragrance-free options:</strong> Request greener products or low-VOC solutions without sacrificing results.</li>
            <li><strong>Flat-rate transparency:</strong> Typical visit averages $218; no surprise add-ons after we arrive.</li>
            <li><strong>Proof over promises:</strong> Cleaners upload room-level photos; managers review the same day.</li>
            <li><strong>Real feedback:</strong> “The team at Curated Cleanings is always on time and leaves my home spotless. I love their attention to detail!” — Ki Alexis, Winter Park.</li>
          </ul>
        </section>

        {/* Services */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our House Cleaning Services in Winter Park</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Recurring (Weekly/Bi-Weekly/Monthly)</h3>
              <p className="text-gray-700">Stop juggling chores between meetings and school runs. Choose a cadence that fits your household—weekly, bi-weekly, or monthly. We aim to assign the same team so they learn your preferences (e.g., how you want marble counters wiped or which rooms are off-limits).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Deep & First-Time Cleans</h3>
              <p className="text-gray-700">First service with us or haven’t had a professional clean in a while? Our deep clean hits baseboards, vents, blinds, grout edges, and the “out-of-sight, out-of-mind” zones. Great before parties, holidays, or a seasonal refresh.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Move-In/Move-Out Cleaning</h3>
              <p className="text-gray-700">Switching homes near Lake Killarney or prepping a listing in Winter Park Pines? We’ll scrub cabinets, appliances (upon request), and fixtures so buyers, landlords, or new tenants are impressed. Need documentation? Our photo QA doubles as proof-of-condition.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Much Does House Cleaning Cost in Winter Park?</h2>
          <p className="text-lg text-gray-700">Most Winter Park homes fall between $180–$260 per visit, with an average of $218. Price depends on square footage, current condition, and add-ons like interior ovens or inside-fridge cleaning. We use a flat-rate model for recurring plans to avoid hourly creep. Start with our online quote form—answer a few questions, pick add-ons, and get a locked estimate (no sales calls unless you ask).</p>
        </section>

        {/* Service Areas */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Areas We Serve Near Winter Park</h2>
          <p className="text-lg text-gray-700 mb-4"><strong>All of Seminole County:</strong> Altamonte Springs, Casselberry, Lake Mary, Longwood, Oviedo, Sanford, Winter Springs, Heathrow, Wekiwa Springs, Fern Park, Chuluota, Geneva, Goldenrod, Midway, Black Hammock.</p>
          <p className="text-lg text-gray-700 mb-4">We routinely clean across ZIP codes 32789 and 32792, including neighborhoods like Olde Winter Park, Windsong, Winter Park Pines, Lake Killarney, and Orwin Manor. Just outside the city? See our pages for <a href="/house-cleaning-oviedo-fl" className="text-brand hover:opacity-80 underline">Oviedo house cleaning</a> and <a href="/house-cleaning-lake-mary-fl" className="text-brand hover:opacity-80 underline">Lake Mary maid service</a>.</p>
          <p className="text-lg text-gray-700">Landmarks we know well: Rollins College, Central Park, Mead Botanical Garden, Winter Park Farmers’ Market. We respect community schedules (hello, Saturday market traffic) and plan accordingly.</p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 max-w-4xl mx.auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-xl font-semibold mb-2">Do you bring supplies and equipment?</h3><p>Yes. We provide professional-grade supplies and can switch to eco-friendly or fragrance-free products—just let us know in advance.</p></div>
            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-xl font-semibold mb-2">Can you handle delicate or historic surfaces?</h3><p>Absolutely. We note surface sensitivities (original wood floors, marble, antique fixtures) in your profile and train cleaners accordingly.</p></div>
            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-xl font-semibold mb-2">Will I get the same cleaners each visit?</h3><p>We prioritize consistency. When schedules shift, we share your preference notes internally so any team maintains your standards.</p></div>
            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-xl font-semibold mb-2">What if you’re not satisfied with a clean?</h3><p>Report any issue within one business day. We’ll re-clean the missed area or credit your account.</p></div>
            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-xl font-semibold mb-2">How far in advance should I book?</h3><p>Recurring clients usually book 1–2 weeks out for prime slots. Need a last-minute deep clean before guests? Message us—cancellations happen and we can often fit you in.</p></div>
            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-xl font-semibold mb-2">Do you handle post-renovation or heavy construction dust?</h3><p>Case-by-case. Share details (drywall dust, paint overspray) and we’ll quote accordingly or refer a specialist if needed.</p></div>
          </div>
        </section>

        {/* CTAs */}
        <section className="mb-12 max-w-4xl mx-auto">
          <GlassCard className="p-6 mb-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Get $25 Off Your First Winter Park Clean</h3>
            <p className="text-blue-800 mb-4">Flat-rate pricing, eco-friendly options, photo-verified quality.</p>
            <PillButton>Start Your Free Estimate</PillButton>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Spend Sundays in Central Park—not cleaning.</h3>
            <p className="text-green-800 mb-4">Reserve your recurring slot today and save $25.</p>
            <PillButton>Claim your discount →</PillButton>
          </GlassCard>
        </section>
      </CityPageLayout>
    </>
  );
} 