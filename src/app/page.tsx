"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import QuickEstimateForm from "../components/QuickEstimateForm";
import LazyVideo from "../components/LazyVideo";
import logo from "../../public/Logo2.png";
import GlassCard from "../components/ui/GlassCard";
import PastelBlob from "../components/ui/PastelBlob";
import PillButton from "../components/ui/PillButton";
import CircleIconButton from "../components/ui/CircleIconButton";
// Swiper - dynamically imported for performance
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
const ReviewsGridHome = dynamic(() => import("../components/ReviewsGridHome"), { ssr: false, loading: () => <div style={{height: 320}} aria-hidden /> });
// Defer Aurora to idle
const DynamicAurora = dynamic(() => import("../components/ui/ParallaxAurora"), { ssr: false });

// QuickEstimateForm is SSR to avoid layout shifts
const ScrollPopupForm = dynamic(() => import("../components/ScrollPopupForm"), { ssr: false });

// Generate array of review image paths in a stable order to prevent hydration mismatch
// Use actual filenames from /public/Gallery/reviews2
const reviewImages = [
    'Allen.webp', 'Andrea.webp', 'Cristina.webp', 'Daniela.webp', 'DanielR.webp',
    'Deja.webp', 'Hani.webp', 'Jackie.webp', 'Kenneth.webp', 'Kia.webp',
    'Latrell.webp', 'lauren.webp', 'Madeline.webp', 'Marlaren.webp', 'Martiza.webp',
    'Meghan.webp', 'Nathan.webp', 'Nikolas.webp', 'Rachel.webp', 'Trey.webp'
].map(name => `/Gallery/reviews2/${name}`);

// Photo gallery images for hero slideshow
const galleryImages = [
	'/Gallery/top10/IMG_1378.webp',
	'/Gallery/top10/IMG_2360.webp',
	'/Gallery/top10/IMG_2479.webp',
	'/Gallery/top10/IMG_2647.webp',
	'/Gallery/top10/IMG_2727.webp',
	'/Gallery/top10/IMG_2780.webp',
	'/Gallery/top10/IMG_3035.webp',
	'/Gallery/top10/IMG_3091.webp',
	'/Gallery/top10/IMG_7136.webp',
	'/Gallery/top10/IMG_7143.webp',
	'/Gallery/top10/IMG_7663.webp',
	'/Gallery/top10/IMG_7667.webp',
];

export default function Home() {

	// Initialize Cal.com calendar widget (defer to idle)
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const w = window as Window & { Cal?: unknown; requestIdleCallback?: (cb: () => void) => number };
		if (typeof w.Cal !== 'undefined') return;
    // removed Cal.com
  }, []);

	// Idle-mount ParallaxAurora
	const [showAurora, setShowAurora] = useState(false);
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const cb = () => setShowAurora(true);
		const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
		if (w.requestIdleCallback) {
			w.requestIdleCallback(cb);
		} else {
			setTimeout(cb, 1);
		}
	}, []);

	// Preload first gallery image for LCP optimization
	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = galleryImages[0];
		document.head.appendChild(link);
		return () => {
			document.head.removeChild(link);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="main-content" className="min-h-screen w-full font-nhd text-midnight">
			{/* ABOVE THE FOLD (white) */}
			<div className="bg-white text-midnight">
				{/* HERO SECTION - ABOVE THE FOLD */}
				<section className="relative bg-white min-h-screen lg:min-h-0 flex flex-col overflow-visible lg:pt-2">
					{showAurora && <DynamicAurora />}
					{/* Header */}
					<header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-6">
						{/* Mobile header (Apple-like) */}
					<div className="flex items-center justify-between sm:hidden">
							{/* Left: logo */}
							<div className="flex items-center">
							<Image src={logo} alt="Curated Cleanings" width={128} height={32} priority fetchPriority="high" sizes="128px" decoding="async" style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
							</div>
							<div className="flex-1" />
							{/* Right: call pill */}
							<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-2 py-[2px] text-[10px]">CALL NOW</PillButton>
						</div>

						{/* Desktop header */}
						<div className="hidden sm:flex items-center justify-between">
							<div className="flex justify-start items-center">
								<Image src={logo} alt="Curated Cleanings" width={192} height={48} priority fetchPriority="high" sizes="192px" decoding="async" style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
							</div>
							<div className="flex-1" />
							<div className="flex items-center justify-end">
								<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-4 py-1.5 text-sm">CALL NOW</PillButton>
							</div>
						</div>
					</header>

					{/* Main Content */}
					<div className="flex-1 flex flex-col justify-center lg:justify-start px-8 max-w-7xl mx-auto w-full mt-4 sm:mt-12 lg:mt-2">
						{/* Hero Text */}
						<div className="relative z-20 text-center mb-3 sm:mb-8 lg:mb-4 no-blend">
							<h1 className="font-hero text-2xl xs:text-3xl md:text-4xl xl:text-5xl mb-2 leading-tight text-midnight">
								Trusted House Cleaning in Seminole County
							</h1>
							<div className="font-hero-sub text-base xs:text-lg md:text-xl text-mountain">
								Book your first clean, get your second 50% off!
							</div>
						</div>

						{/* Logos Section */}
						<div className="flex flex-col justify-center items-center gap-3 mb-4 sm:mb-6 lg:mb-4">
                            <div className="flex items-center gap-4 sm:gap-6">
								<Image 
									src="/Gallery/logos/Google-Logo-PNG.png" 
									alt="Google Reviews" 
									width={80}
									height={80}
									className="w-12 sm:w-16 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
								/>
								<Image 
									src="/Gallery/logos/Yelp_Logo.png" 
									alt="Yelp Reviews" 
									width={80}
									height={80}
									className="w-12 sm:w-16 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
								/>
								<Image 
									src="/Gallery/logos/png-transparent-thumbtack-horizontal-logo-review-platforms-logos.png" 
									alt="Thumbtack Reviews" 
									width={120}
									height={80}
									className="w-16 sm:w-20 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
								/>
							</div>
							{/* Partner badge removed for compactness */}
						</div>

					{/* Main Sections */}
					<div className="flex flex-col md:flex-row gap-6 mb-6 justify-center items-center md:items-start">
						{/* Photo Gallery - Desktop: Left, Mobile: Below form */}
						<div className="order-2 md:order-1 w-full md:w-[420px]">
							<div className="aspect-square overflow-hidden rounded-2xl shadow-lg relative bg-white">
								<Swiper
									modules={[Autoplay, EffectFade]}
									effect="fade"
									autoplay={{
										delay: 800,
										disableOnInteraction: false,
									}}
									loop={true}
									speed={600}
									className="w-full h-full"
									aria-label="Photo gallery showcasing our professional cleaning services"
								>
									{galleryImages.map((img, index) => (
										<SwiperSlide key={index}>
											<Image
												src={img}
												alt={`Professional cleaning service result ${index + 1}`}
												width={420}
												height={420}
												quality={75}
												priority={index === 0}
												className="w-full h-full object-cover"
												sizes="(max-width: 768px) 100vw, 420px"
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>

						{/* Lead Form - Desktop: Right, Mobile: Above photo */}
						<div className="order-1 md:order-2 w-full md:flex-1 max-w-lg relative mt-0">
							<PastelBlob className="w-[520px] h-[420px]" style={{ left: "-10%", top: "-10%" }} />
							<GlassCard className="p-5 sm:p-6 min-h-[420px]">
								<QuickEstimateForm />
							</GlassCard>
						</div>
					</div>
				</div>
				</section>
                {/* Wide Video Window (hidden on desktop) */}
                <section className="py-4 sm:py-8 lg:hidden">
                    <div className="max-w-7xl mx-auto px-8">
                        <GlassCard className="relative overflow-hidden p-0 rounded-3xl" withShadow withEdgeGlow>
                            <LazyVideo
                                src="/CleanVid2.mp4"
                                poster="/og.png"
                                className="w-full h-auto block"
                            />
                            <div className="pane-inner-frame" />
                            <div className="pane-glare" />
                        </GlassCard>
                    </div>
                </section>
			</div>

			{/* BELOW (pure white) */}
			<div className="bg-white text-midnight">
				{/* Scroll-triggered Lead Form Popup */}
				<ScrollPopupForm triggerElement="#reviews" callout="Wait! Get Your 50% Off House Cleaning" />
				{/* Customer Reviews Grid Section */}
				<section id="reviews" className="py-4 sm:py-8 lg:py-4 relative z-10">
					<div className="max-w-7xl mx-auto px-4">
                        {/* Reviews Image Grid - dynamically hydrated to reduce main-thread work */}
                        <ReviewsGridHome images={reviewImages} />
						
					</div>
				</section>

				{/* LARGE CALL TO ACTION SECTION */}
				<section className="py-6 sm:py-8 text-center">
					<a 
						href="tel:+14074701780" 
						className="inline-flex items-center gap-5 bg-white/20 backdrop-blur-md border border-white/30 text-midnight px-14 py-10 rounded-full text-3xl sm:text-4xl font-bold shadow-lg hover:bg-white/30 border-brand/30 hover:border-brand/50 hover:text-brand transform scale-120 hover:scale-125 transition-all duration-300"
					>
						<FaPhone className="text-4xl text-brand" />
						<span>CALL NOW</span>
					</a>
				</section>

				{/* PACKAGES SECTION */}
				<section id="packages" className="py-12 flex flex-col items-center">
					{/* Standard Cleaning Card */}
					<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">STANDARD HOUSE CLEANING</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dusting all surfaces (furniture, shelves)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Vacuuming carpets and rugs</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Sweeping and mopping floors</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Emptying trash bins and replacing liners</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Making beds (not changing linens)</span></li>
						</ul>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
							<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>GET ESTIMATE</PillButton>
							<CircleIconButton />
						</div>
					</GlassCard>
					{/* Deep Clean Card */}
					<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">DEEP CLEANING SERVICES</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">+</span><span className="text-black">All Standard Services plus</span></li>
							
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Microwave</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Exterior of Kitchen Cabinets</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dust Very High / Cluttered Shelves</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Change Bed Linens</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Fridge</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Oven</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Ceiling Fans</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Interior Windows</span></li>
						</ul>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
							<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>GET ESTIMATE</PillButton>
							<CircleIconButton />
						</div>
					</GlassCard>
					{/* Add-ons Card */}
					<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">ADD-ONS</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="text-black">Laundry</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Spot Cleaning Walls</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Hand Scrubbing Baseboards</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Vacuum Dusting Baseboards</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Eco-friendly Consumables</span></li>
							<li className="flex items-start gap-3"><span className="text-black">QC Photos</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Air Freshener</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Reset Fridge</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Deodorizer</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Paper Towel Reset</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Swap Sponges</span></li>
						</ul>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
							<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>GET ESTIMATE</PillButton>
							<CircleIconButton />
						</div>
					</GlassCard>
				</section>

				{/* SERVICE AREA SECTION */}
				<section className="py-12 flex flex-col items-center bg-white">
					<div className="max-w-4xl text-center">
						<h3 className="font-hero-sub text-3xl mb-6 text-midnight">Serving All of Seminole County</h3>
						<p className="text-lg text-mountain mb-8 font-light leading-relaxed">
							We proudly serve every city and community in Seminole County. If you live in Seminole, you&apos;re covered.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base text-midnight">
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 col-span-2 md:col-span-3">
								<strong>All of Seminole County</strong>
							</div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Altamonte Springs, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Casselberry, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Lake Mary, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Longwood, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Oviedo, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Sanford, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Winter Springs, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Heathrow, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Wekiwa Springs, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Fern Park, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Chuluota, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Geneva, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Goldenrod, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Midway, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Black Hammock, FL</strong></div>
						</div>
					</div>
				</section>

				{/* ESTIMATE SECTION */}
				<section id="estimate" className="py-24 flex flex-col items-center">
					<div className="text-center text-base text-black mb-8">Call or text us to schedule your free estimate and receive a detailed cleaning proposal</div>
					
					<div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
						<a href="tel:+14074701780" className="flex items-center gap-4 text-xl text-black hover:text-gray-700 transition-colors">
							<FaPhone className="text-2xl" />
							<span>407-470-1780</span>
						</a>
						<a href="mailto:admin@curatedcleanings.com" className="flex items-center gap-4 text-xl text-black hover:text-gray-700 transition-colors">
							<FaEnvelope className="text-2xl" />
							<span>admin@curatedcleanings.com</span>
						</a>
					</div>

					<div className="max-w-2xl text-center text-lg text-black mb-8">
						<strong>Service Hours:</strong> Monday - Saturday, 8:00 AM - 6:00 PM<br />
						<strong>Response Time:</strong> We typically respond within 2 hours during business hours
					</div>

					<div className="text-center text-base text-black">
						Available for residential and commercial cleaning throughout Central Florida
					</div>
				</section>

				{/* COMPANY DESCRIPTION SECTION - moved bottom */}
				<section className="py-8 sm:py-12 relative lg:hidden">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<GlassCard className="p-12 sm:p-16 lg:p-20 transition-transform duration-300 hover:scale-[1.005] overflow-hidden">
							<div className="relative z-10 text-left text-lg sm:text-xl text-black font-light leading-relaxed max-w-5xl mx-auto">
								<div className="mb-12 sm:mb-16 text-center">
									<h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 sm:mb-10 text-black tracking-tight">Without Us</h2>
									<p className="text-black text-lg sm:text-xl leading-relaxed">After a 10-hour shift, you&apos;re still brushing, scrubbing, and mopping. On your knees cleaning toilets, wiping mirrors that never come streak-free, sneezing from dust, sick from fumes. Hours gone—time stolen from family, rest, or building your future. Or worse: you hire a cleaner who shows up late, rushes, leaves the job half-done, and never comes back. Guests notice. Family judges. And you&apos;re stuck in the same cycle: tired, behind, frustrated.</p>
								</div>
								<div className="mb-8 text-center">
									<h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 sm:mb-10 text-black tracking-tight">With Curated Cleanings</h2>
									<p className="text-black text-lg sm:text-xl leading-relaxed">Instead, imagine walking in the door to a spotless, fresh, perfectly organized home—without lifting a finger. One call, and your home stays effortlessly clean. You gain back hours every week. You relax with family. You focus on what matters. Guests are impressed. Your kids learn order. Your health improves in a disinfected, clutter-free space. Even your relationships thrive when the stress of cleaning is gone.</p>
								</div>
							</div>
							<div className="pane-inner-frame" />
							<div className="pane-glare" />
							<div className="pane-bottom-line" />
						</GlassCard>
					</div>
				</section>

				{/* CONTACT & FOOTER SECTION */}
				<footer className="flex flex-col items-center gap-4 py-8 border-t border-gray-200 mt-12">
					<div className="text-center text-sm text-midnight font-light">
						Curated Cleanings provides trusted house cleaning and maid services in Oviedo, Winter Park, Lake Mary, and surrounding Central Florida areas. Licensed, insured, and 5-star rated. Call (407) 470-1780 or email admin@curatedcleanings.com for a free estimate.
					</div>
					<div className="flex gap-6 text-base mt-2">
						<a href="mailto:admin@curatedcleanings.com" aria-label="Email" className="hover:text-blue-600 transition-colors flex items-center gap-2">
							<FaEnvelope /> admin@curatedcleanings.com
						</a>
						<a href="tel:+14074701780" aria-label="Phone" className="hover:text-blue-600 transition-colors flex items-center gap-2">
							<FaPhone /> 407-470-1780
						</a>
					</div>
					<div className="text-xs text-mountain mt-2">© Curated Cleanings. All rights reserved.</div>
				</footer>
			</div>

            {/* Cal.com removed */}

		</div>
	);
}
