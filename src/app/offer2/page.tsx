"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import logo from "../../../public/Logo2.png";
import GlassCard from "../../components/ui/GlassCard";
import PastelBlob from "../../components/ui/PastelBlob";
import PillButton from "../../components/ui/PillButton";
// Swiper - dynamically imported for performance
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
// Defer Aurora to idle
const DynamicAurora = dynamic(() => import("../../components/ui/ParallaxAurora"), { ssr: false });

// QuickEstimateForm is SSR to avoid layout shifts
const QuickEstimateForm = dynamic(() => import("../../components/QuickEstimateForm"), { ssr: false });
const ScrollPopupForm = dynamic(() => import("../../components/ScrollPopupForm"), { ssr: false });

// Review images - Both mobile and desktop use reviews2
const reviewImages = [
    'Allen.webp', 'Andrea.webp', 'Cristina.webp', 'Daniela.webp', 'DanielR.webp',
    'Deja.webp', 'Hani.webp', 'Jackie.webp', 'Kenneth.webp', 'Kia.webp',
    'Latrell.webp', 'lauren.webp', 'Madeline.webp', 'Marlaren.webp', 'Martiza.webp',
    'Meghan.webp', 'Nathan.webp', 'Nikolas.webp', 'Rachel.webp', 'Trey.webp'
].map(name => `/Gallery/reviews2/${name}`);

export default function Offer2Page() {

	// Removed Cal.com

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

	// Photo gallery images
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

	

	// TESTIMONIALS SECTION - Using CSS animations for better performance

	// Removed unused mobile detection code


// Randomize reviews order client-side after mount to avoid hydration mismatch
const [shuffledReviewImages, setShuffledReviewImages] = useState<string[] | null>(null);
	useEffect(() => {
		// Shuffle all reviews from reviews2
		const shuffled = [...reviewImages];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		setShuffledReviewImages(shuffled);
	}, []);

	// Lazy-render: only mount the reviews grid when the section is near viewport
	const [reviewsVisible, setReviewsVisible] = useState(false);
	const reviewsRef = useRef<HTMLElement | null>(null);
	useEffect(() => {
		if (reviewsVisible) return;
		const el = reviewsRef.current ?? document.getElementById('reviews');
		if (!el) return;
		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach(e => {
				if (e.isIntersecting) { setReviewsVisible(true); obs.disconnect(); }
			});
		}, { root: null, rootMargin: '200px 0px', threshold: 0.1 });
		io.observe(el);
		return () => io.disconnect();
	}, [reviewsVisible]);

    // Removed wide video window to improve performance

	return (
		<div id="main-content" className="min-h-screen w-full font-nhd text-midnight">
			{/* ABOVE THE FOLD + HERO AREA (white background) */}
			<div className="bg-white text-midnight">
				{/* HERO SECTION - ABOVE THE FOLD */}
				<section className="relative bg-white min-h-screen lg:min-h-0 flex flex-col overflow-visible lg:pt-2">
				{showAurora && <DynamicAurora />}
					{/* Header */}
					<header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-3">
						{/* Mobile header (centered logo) */}
						<div className="flex items-center justify-center sm:hidden">
							<Image src={logo} alt="Curated Cleanings" width={128} height={32} style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
						</div>

						{/* Desktop header (centered logo) */}
						<div className="hidden sm:flex items-center justify-center">
							<Image src={logo} alt="Curated Cleanings" width={192} height={48} style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
						</div>
					</header>

				{/* Main Content */}
			<div className="flex-1 flex flex-col justify-center lg:justify-start px-8 max-w-7xl mx-auto w-full mt-1 sm:mt-6 lg:mt-2">
					{/* Hero Text */}
				<div className="relative z-20 text-center mb-3 sm:mb-6 lg:mb-4 no-blend">
						<h1 className="font-hero text-2xl xs:text-3xl md:text-4xl xl:text-5xl mb-1 leading-tight text-midnight">
							 Seminole County Homeowners: Get your FREE cleaning Voucher now!
						</h1>
					</div>


					{/* Logos Section */}
				<div className="flex flex-col justify-center items-center gap-2 mb-4 sm:mb-6 lg:mb-4">
						<div className="flex items-center gap-3 sm:gap-4">
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
								<QuickEstimateForm title="Claim Your Free Voucher" submitLabel="Get Free Cleaning Voucher" showEmail={true} openCalendarOnSuccess={false} page="offer2" />
							</GlassCard>
						</div>
					</div>
                    {/* Wide video window removed */}
					</div>
					</section>

					{/* Scroll-triggered Lead Form Popup */}
					<ScrollPopupForm triggerElement="#reviews" callout="Wait! Get your FREE cleaning voucher!" buttonClassName="bg-black text-white" page="offer2" />
			</div>

			{/* BELOW: Pure white from reviews to footer */}
			<div className="bg-white text-midnight">
					{/* Customer Reviews Grid Section */}
				<section id="reviews" ref={reviewsRef as React.RefObject<HTMLElement>} className="py-4 sm:py-8 lg:py-4 relative z-10">
						<div className="max-w-7xl mx-auto px-4">
						{/* Mobile grid - shuffled */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:hidden">
							{reviewsVisible && (shuffledReviewImages ?? reviewImages).map((imageSrc) => (
								<div key={imageSrc} className="relative py-2">
									<Image
										src={imageSrc}
										alt="Customer review"
										width={512}
										height={512}
										sizes="(max-width: 640px) 45vw, (max-width: 1024px) 24vw, 18vw"
										quality={60}
										className="w-full h-auto"
										style={{
											filter: 'none',
											mixBlendMode: 'normal',
											opacity: 1,
											backdropFilter: 'none'
										}}
									/>
								</div>
							))}
						</div>

						{/* Desktop grid - ordered */}
						<div className="hidden lg:grid grid-cols-4 gap-4">
							{reviewsVisible && reviewImages.map((imageSrc, i) => (
								<div key={i} className="relative py-2">
									<Image
										src={imageSrc}
										alt={`Customer review ${i + 1}`}
										width={800}
										height={800}
										sizes="22vw"
										quality={95}
										className="w-full h-auto"
										style={{
											filter: 'none',
											mixBlendMode: 'normal',
											opacity: 1,
											backdropFilter: 'none'
										}}
									/>
								</div>
							))}
						</div>

						</div>
					</section>

				{/* LARGE CALL TO ACTION SECTION */}
					<section className="py-6 sm:py-8 text-center">
						<button 
							onClick={() => window.dispatchEvent(new Event("open-lead-popup"))}
							className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-midnight px-14 py-10 rounded-full text-3xl sm:text-4xl font-extrabold shadow-lg hover:bg-white/30 border-brand/30 hover:border-brand/50 hover:text-brand transform scale-120 hover:scale-125 transition-all duration-300"
						>
							<span>CLAIM FREE VOUCHER!</span>
						</button>
					</section>

				{/* SERVICE AREA SECTION - moved below CTA and styled like cards */}
				<section className="py-12 flex flex-col items-center">
					<GlassCard className="mb-12 w-full max-w-4xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h3 className="font-hero-sub text-3xl mb-6 text-midnight text-center">Serving All of Seminole County</h3>
						<p className="text-lg text-mountain mb-8 font-light leading-relaxed text-center">
							We proudly serve every city and community in Seminole County. If you live in Seminole, you&apos;re covered.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base text-midnight">
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 col-span-2 md:col-span-3 text-center">
								<strong>All of Seminole County</strong>
									</div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Altamonte Springs, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Casselberry, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Lake Mary, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Longwood, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Oviedo, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Sanford, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Winter Springs, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Heathrow, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Wekiwa Springs, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Fern Park, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Chuluota, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Geneva, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Goldenrod, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Midway, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Black Hammock, FL</strong></div>
						</div>
					</GlassCard>
					</section>

				{/* COMPANY DESCRIPTION SECTION - moved to bottom */}

					{/* PACKAGES SECTION */}
					<section id="packages" className="py-12 flex flex-col items-center">
						{/* Standard Cleaning Card */}
						<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
							<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">STANDARD HOUSE CLEANING</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dusting all surfaces (furniture, shelves)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Vacuuming carpets and rugs</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Sweeping and mopping floors</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Emptying trash bins and replacing liners</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Making beds (not changing linens)</span></li>
							</ul>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
						<PillButton onClick={() => window.dispatchEvent(new Event("open-lead-popup"))}>Get Free Voucher Now</PillButton>
						</div>
						</GlassCard>
						{/* Deep Clean Card */}
						<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
							<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">DEEP CLEANING SERVICES</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">+</span><span className="text-black">All Standard Services plus</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Microwave</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Exterior of Kitchen Cabinets</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dust Very High / Cluttered Shelves</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Change Bed Linens</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Fridge</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Oven</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Ceiling Fans</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Interior Windows</span></li>
							</ul>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
						<PillButton onClick={() => window.dispatchEvent(new Event("open-lead-popup"))}>Get Free Voucher Now</PillButton>
						</div>
						</GlassCard>
						{/* Add-ons Card */}
						<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
							<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">ADD-ONS</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="text-black">Laundry</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Spot Cleaning Walls</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Hand Scrubbing</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Vacuum Dusting</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Eco-friendly Consumables</span></li>
							<li className="flex items-start gap-3"><span className="text-black">QC Photos</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Air Freshener</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Reset Fridge</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Deodorizer</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Paper Towel Reset</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Swap Sponges</span></li>
							</ul>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
						<PillButton onClick={() => window.dispatchEvent(new Event("open-lead-popup"))}>Get Free Voucher Now</PillButton>
						</div>
						</GlassCard>

					{/* WITHOUT US / WITH US SECTION REMOVED */}
					</section>

				{/* SERVICE AREA SECTION */}
				{/* Moved above; original removed to avoid duplicate */}

					{/* ESTIMATE SECTION REMOVED TO REDUCE CLUTTER */}

					{/* CONTACT & FOOTER SECTION - simplified */}
					<footer className="flex flex-col items-center gap-4 py-8 border-t border-gray-200 mt-12">
						<button 
							onClick={() => window.dispatchEvent(new Event("open-lead-popup"))}
							className="px-8 py-4 rounded-full text-lg font-bold bg-midnight text-white hover:bg-black transition-colors"
						>
							CLAIM FREE VOUCHER
						</button>
						<div className="text-xs text-mountain">© Curated Cleanings</div>
					</footer>
				</div>

					{/* Cal.com removed */}

		</div>
	);
}


