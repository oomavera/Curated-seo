"use client";

import CityPageLayout from '../../components/CityPageLayout';
import GlassCard from '../../components/ui/GlassCard';
import PillButton from '../../components/ui/PillButton';

export default function OviedoHouseCleaningPage() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "LocalBusiness",
						"name": "Curated Cleanings",
						"url": "https://curatedcleanings.com/house-cleaning-oviedo-fl",
						"image": "https://curatedcleanings.com/images/oviedo-hero.jpg",
						"telephone": "+1-407-470-1780",
						"priceRange": "$$",
						"address": {
							"@type": "PostalAddress",
							"addressLocality": "Oviedo",
							"addressRegion": "FL",
							"postalCode": "32765",
							"addressCountry": "US"
						},
						"areaServed": [
							{ "@type": "City", "name": "Oviedo" },
							{ "@type": "City", "name": "Winter Park" },
							{ "@type": "City", "name": "Lake Mary" }
						],
						"serviceType": "House cleaning",
						"makesOffer": {
							"@type": "Offer",
							"name": "Oviedo First-Clean Discount",
							"price": "205",
							"priceCurrency": "USD",
							"description": "$25 off your first Oviedo cleaning",
							"eligibleRegion": { "@type": "City", "name": "Oviedo" }
						},
						"hasFAQPage": {
							"@type": "FAQPage",
							"mainEntity": [
								{ "@type": "Question", "name": "Do you bring supplies and equipment?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our team provides everything, including eco-friendly alternatives upon request." } },
								{ "@type": "Question", "name": "How do you ensure quality every visit?", "acceptedAnswer": { "@type": "Answer", "text": "Cleaners upload room-by-room photos; a manager reviews them within hours to ensure consistency." } },
								{ "@type": "Question", "name": "Can I request the same cleaners each time?", "acceptedAnswer": { "@type": "Answer", "text": "We strive for team consistency and store your preferences to keep results uniform." } },
								{ "@type": "Question", "name": "What if I need to reschedule or cancel?", "acceptedAnswer": { "@type": "Answer", "text": "Provide 48 hours' notice to avoid fees; we're flexible when life happens." } },
								{ "@type": "Question", "name": "Do you handle post-construction or heavy restoration cleans?", "acceptedAnswer": { "@type": "Answer", "text": "We assess on a case-by-case basis. Share your scope and we'll quote or refer as needed." } },
								{ "@type": "Question", "name": "Are your products safe for pets and kids?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—our default products are safe, and we can go fragrance-free or eco-only on request." } }
							]
						}
					})
				}}
			/>
			<CityPageLayout
				title="House Cleaning Oviedo FL"
				subtitle="Licensed, insured cleaners serving Oviedo and surrounding areas - book in 60 seconds"
			>

				{/* Intro Section */}
				<section className="mb-12 max-w-4xl mx-auto">
					<p className="text-lg text-gray-700 leading-relaxed">
						Your time in Oviedo shouldn&apos;t be spent scrubbing baseboards or fighting Florida dust. Curated Cleanings delivers meticulous house cleaning Oviedo FL homeowners rely on—tailored to busy families in Alafaya Woods, commuters in Kingsbridge East, and nature lovers near Black Hammock Wilderness Area. Our flat-rate model (average visit: $205) ends surprise bills, and every clean is verified with room-by-room photo QA. Prefer greener products? Just ask—eco-friendly is built into our workflow. Book now to claim $25 off your first Oviedo cleaning and experience the difference of a local team that actually documents quality.
					</p>
				</section>

				{/* Quick Answer Box */}
				<section className="mb-12 max-w-4xl mx-auto">
					<GlassCard className="p-6">
						<h2 className="text-2xl font-semibold mb-4">Quick Answer: Who&apos;s the best choice for house cleaning Oviedo FL?</h2>
						<p className="text-lg text-gray-700">
							Curated Cleanings offers flat-rate pricing (avg $205), eco-friendly options, and photo-verified quality checks—perfect for Oviedo&apos;s busy households. New clients save $25 on their first clean. Book online in minutes for a guaranteed, locally trusted service.
						</p>
					</GlassCard>
				</section>

				{/* Why Choose Us */}
				<section className="mb-12 max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Curated Cleanings in Oviedo</h2>
					<p className="text-lg text-gray-700 mb-4">
						Oviedo homes vary—from Twin Rivers two-stories to cozy condos by Oviedo on the Park—so your cleaning plan can&apos;t be cookie-cutter. Here&apos;s how we adapt:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li><strong>Locally trusted, background-checked cleaners:</strong> We live and work here; your trust and security are non-negotiable.</li>
						<li><strong>Flexible scheduling for busy Oviedo families:</strong> Weekly, bi-weekly, or monthly plans to match your rhythm.</li>
						<li><strong>Eco-friendly cleaning options:</strong> Request green products without sacrificing sparkle.</li>
						<li><strong>Flat-rate transparency:</strong> Typical visits average $205, so you know the cost before we arrive.</li>
						<li><strong>Proof, not promises:</strong> Our cleaners upload room-level photos; managers review the same day.</li>
						<li><strong>A real local voice:</strong> &quot;Absolutely amazing service! My home in Alafaya Woods has never looked better,&quot; says Deja J.</li>
					</ul>
				</section>

				{/* Services */}
				<section className="mb-12 max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Our House Cleaning Services in Oviedo</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-2xl font-semibold text-gray-800 mb-2">Recurring (Weekly/Bi-Weekly/Monthly)</h3>
							<p className="text-gray-700">
								Stop cleaning on weekends. Lock in a cadence that fits your family&apos;s schedule. We strive to send the same team so they learn your preferences—from sensitive surfaces to kid clutter triage.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-2xl font-semibold text-gray-800 mb-2">Deep & First-Time Cleans</h3>
							<p className="text-gray-700">
								If it&apos;s been a while since a thorough scrub—or you&apos;re onboarding with us—our deep clean hits baseboards, vents, blinds, and grime magnets most &quot;standard cleans&quot; ignore. Ideal before holidays, parties, or seasonal resets.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow md:col-span-2">
							<h3 className="text-2xl font-semibold text-gray-800 mb-2">Move-In/Move-Out Cleaning</h3>
							<p className="text-gray-700">
								Turning over a lease near Remington Park or selling in Live Oak Reserve? We handle inside cabinets, appliances (by request), and fixtures so you get deposits back and buyers impressed. Need proof for landlords? Our photo QA doubles as documentation.
							</p>
						</div>
					</div>
				</section>

				{/* Pricing */}
				<section className="mb-12 max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">How Much Does House Cleaning Cost in Oviedo?</h2>
					<p className="text-lg text-gray-700">
						Most Oviedo homes fall between $170–$240 per visit, averaging $205. Pricing depends on size, condition, and extras (e.g., ovens, fridges, baseboard detailing). Unlike hourly surprises, our flat-rate model keeps budgeting simple for recurring schedules. Use our online estimate form—no phone tag—to get a locked quote. If you prefer à la carte add-ons (inside oven, inside fridge), just toggle them on in the form.
					</p>
				</section>

				{/* Service Areas */}
				<section className="mb-12 max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Areas We Serve Near Oviedo</h2>
					<p className="text-lg text-gray-700 mb-4">
						We regularly clean across ZIP codes 32765 and 32766, plus neighborhoods like Alafaya Woods, Live Oak Reserve, Twin Rivers, Remington Park, and Kingsbridge East. Need service just beyond Oviedo? Check out our dedicated pages for{' '}
						<a href="/winter-park-cleaning-services/" className="text-blue-600 hover:text-blue-800 underline">Winter Park house cleaning</a> and{' '}
						<a href="/lake-mary-cleaning-services/" className="text-blue-600 hover:text-blue-800 underline">Lake Mary maid service</a>.
					</p>
					<p className="text-lg text-gray-700">
						Landmarks we know and love: Oviedo on the Park, Lukas Nursery, Black Hammock Wilderness Area, Oviedo Mall—yes, we&apos;ve cleaned homes all around them.
					</p>
				</section>

				{/* FAQ Section */}
				<section className="mb-12 max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
					<div className="space-y-6">
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">Do you bring supplies and equipment?</h3>
							<p>Yes. Our team provides everything, including eco-friendly alternatives if requested. No last-minute &quot;Can you supply a vacuum?&quot; texts.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">How do you ensure quality every visit?</h3>
							<p>Cleaners snap room-by-room photos; a manager reviews within hours. If anything&apos;s off, we fix it fast—just let us know within one business day.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">Can I request the same cleaners each time?</h3>
							<p>We prioritize consistency. When schedules shift, your preferences live in our system so any team can deliver the same result.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">What if I need to reschedule or cancel?</h3>
							<p>Give us at least 48 hours&apos; notice to avoid fees. We know life happens—just communicate early.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">Do you handle post-construction or heavy restoration cleans?</h3>
							<p>Case-by-case. Tell us the scope (dust, debris, paint splatter) in your request, and we&apos;ll quote accordingly or refer you to a specialist if it&apos;s outside our lane.</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-xl font-semibold mb-2">Are your products safe for pets and kids?</h3>
							<p>Yes. We default to safe, effective products, and can go fragrance-free or eco-only if you note it in your profile.</p>
						</div>
					</div>
				</section>

				{/* CTAs */}
				<section className="mb-12 max-w-4xl mx-auto">
					<GlassCard className="p-6 mb-4">
						<h3 className="text-xl font-semibold text-blue-900 mb-2">Get $25 Off Your First Oviedo Clean</h3>
						<p className="text-blue-800 mb-4">Flat-rate pricing, eco-friendly options, photo-verified quality.</p>
						<PillButton>Start Your Free Estimate</PillButton>
					</GlassCard>
					<GlassCard className="p-6">
						<h3 className="text-xl font-semibold text-green-900 mb-2">Spend weekends at Oviedo on the Park—not cleaning.</h3>
						<p className="text-green-800 mb-4">Lock in your recurring slot today and save $25.</p>
						<PillButton>Claim your discount →</PillButton>
					</GlassCard>
				</section>
			</CityPageLayout>
		</>
	);
} 