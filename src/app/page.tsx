"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";
import logo from "../../public/Logo2.png";
import GlassCard from "../components/ui/GlassCard";
import PastelBlob from "../components/ui/PastelBlob";
import PillButton from "../components/ui/PillButton";
import CircleIconButton from "../components/ui/CircleIconButton";
import QuickEstimateForm from "../components/QuickEstimateForm";
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

export default function Home() {

	// Initialize Cal.com calendar widget (defer to idle)
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const w = window as Window & { Cal?: unknown; requestIdleCallback?: (cb: () => void) => number };
		if (typeof w.Cal !== 'undefined') return;
		const load = () => {
			const script = document.createElement('script');
			script.innerHTML = `
				(function (C, A, L) { 
					let p = function (a, ar) { a.q.push(ar); }; 
					let d = C.document; 
					C.Cal = C.Cal || function () { 
						let cal = C.Cal; 
						let ar = arguments; 
						if (!cal.loaded) { 
							cal.ns = {}; 
							cal.q = cal.q || []; 
							d.head.appendChild(d.createElement("script")).src = A; 
							cal.loaded = true; 
						} 
						if (ar[0] === L) { 
							const api = function () { p(api, arguments); }; 
							const namespace = ar[1]; 
							api.q = api.q || []; 
							if(typeof namespace === "string"){
								cal.ns[namespace] = cal.ns[namespace] || api;
								p(cal.ns[namespace], ar);
								p(cal, ["initNamespace", namespace]);
							} else {
								p(cal, ar);
							} 
							return;
						} 
						p(cal, ar); 
					}; 
				})(window, "https://app.cal.com/embed/embed.js", "init");
				
				Cal("init", "firstclean", {origin:"https://app.cal.com"});
				Cal.ns.firstclean("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
			`;
			document.head.appendChild(script);
		};
		if (w.requestIdleCallback) {
			w.requestIdleCallback(load);
		} else {
			setTimeout(load, 1);
		}
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


	const prefersReducedMotion = usePrefersReducedMotion();

	// TESTIMONIALS SECTION - Using CSS animations for better performance

	// Removed unused mobile detection code

	// Dynamically load gallery images and spread team images evenly through cleans
	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			try {
				const [cleansRes, teamRes] = await Promise.all([
					fetch('/api/gallery?album=cleans', { cache: 'no-store' }),
					fetch('/api/gallery?album=team', { cache: 'no-store' })
				]);
				const cleansJson = await cleansRes.json().catch(() => ({ images: [] }));
				const teamJson = await teamRes.json().catch(() => ({ images: [] }));
				const cleanImages: string[] = Array.isArray(cleansJson?.images) ? cleansJson.images : [];
				const teamImages: string[] = Array.isArray(teamJson?.images) ? teamJson.images : [];

				const distributed: string[] = [];
				let ti = 0, ci = 0;
				const total = teamImages.length + cleanImages.length;
				for (let i = 0; i < total; i++) {
					const placeTeam = Math.floor((i + 1) * teamImages.length / total) > Math.floor(i * teamImages.length / total);
					if (placeTeam && ti < teamImages.length) {
						distributed.push(teamImages[ti++]);
					} else if (ci < cleanImages.length) {
						distributed.push(cleanImages[ci++]);
					} else if (ti < teamImages.length) {
						distributed.push(teamImages[ti++]);
					}
				}
				if (!cancelled) setGalleryImages(Array.from(new Set(distributed)));
			} catch {
				// Ignore errors; leave gallery empty
			}
		};
		load();
		return () => { cancelled = true };
	}, []);
	// Smooth CSS-based gallery animation - no JavaScript intervals or state updates needed

	// Stabilize gallery track widths to prevent CLS
	const gapPx = 16; // tailwind gap-4
	const desktopSlideWidth = 450;
	const mobileSlideWidth = 220;
	const desktopSlidesCount = galleryImages.length * 2;
	const mobileSubset = galleryImages; // show all images on mobile too
	const mobileSlidesCount = mobileSubset.length * 2;
	const mobileTrackWidthPx = mobileSlidesCount > 0 ? (mobileSlidesCount * mobileSlideWidth + (mobileSlidesCount - 1) * gapPx) : 0;
	const desktopTrackWidthPx = desktopSlidesCount > 0 ? (desktopSlidesCount * desktopSlideWidth + (desktopSlidesCount - 1) * gapPx) : 0;

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
								<Image src={logo} alt="Curated Cleanings" width={128} height={32} style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
							</div>
							<div className="flex-1" />
							{/* Right: call pill */}
							<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-2 py-[2px] text-[10px]">CALL NOW</PillButton>
						</div>

						{/* Desktop header */}
						<div className="hidden sm:flex items-center justify-between">
							<div className="flex justify-start items-center">
								<Image src={logo} alt="Curated Cleanings" width={192} height={48} style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
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

						{/* Main Sections - Desktop: Left Photo Gallery, Right Form | Mobile: Form Center */}
						<div className="flex flex-row gap-8 mb-8 max-md:flex-col justify-center items-start">
							{/* Left Section - Photo Gallery (Desktop only) */}
							<div className="hidden md:flex flex-1 max-w-2xl">
								<GlassCard className="relative w-full h-[500px] overflow-hidden p-0 pane-glass" withShadow withEdgeGlow>
									<div className="relative w-full h-full">
										<div 
											className="gallery-slider flex h-full items-center gap-4 absolute"
											style={{
												width: `${desktopTrackWidthPx}px`,
												animation: prefersReducedMotion || galleryImages.length === 0 ? 'none' : `slideGallery ${galleryImages.length * 2.5}s linear infinite`,
												transform: 'translate3d(0, 0, 0)',
												willChange: 'transform'
											}}
										>
											{[...galleryImages, ...galleryImages].map((src, i) => (
												<div key={i} className="relative min-w-[450px] max-w-md rounded-2xl overflow-hidden shadow-lg h-full flex items-center justify-center border border-white/10 bg-transparent">
													<Image 
														src={src} 
														alt={`Gallery photo ${(i % galleryImages.length) + 1}`} 
														width={450}
														height={420}
														quality={60}
														sizes="(max-width: 768px) 90vw, 450px"
														loading="eager"
														style={{ objectFit: 'cover', width: '100%', height: '100%' }}
														onError={(e) => {
															const img = e.currentTarget as HTMLImageElement;
															if (img.src.endsWith('.webp')) {
																img.src = img.src.replace('.webp', '.jpg');
															} else {
																img.style.display = 'none';
															}
														}}
													/>
												</div>
											))}
										</div>
										<div className="noise-overlay" />
										<div className="pane-inner-frame" />
										<div className="pane-glare" />
										<div className="pane-bottom-highlight" />
									</div>
								</GlassCard>
							</div>

							{/* Right Section - Lead Form wrapped in glass */}
							<div className="flex-1 max-w-lg mx-auto md:mx-0 relative">
								<PastelBlob className="w-[520px] h-[420px]" style={{ left: "-10%", top: "-10%" }} />
								<GlassCard className="p-6 sm:p-8 min-h-[420px]">
									<QuickEstimateForm />
								</GlassCard>
							</div>
						</div>

						{/* Mobile Photo Gallery Section */}
						<section className="py-2 flex flex-col items-center bg-transparent md:hidden">
							<GlassCard className="relative w-full max-w-6xl h-60 overflow-hidden p-0 pane-glass" withShadow withEdgeGlow>
								<div className="relative w-full h-full">
									<div 
										className="gallery-slider flex h-full items-center gap-4 absolute"
										style={{
											width: `${mobileTrackWidthPx}px`,
											animation: prefersReducedMotion || mobileSubset.length === 0 ? 'none' : `slideGalleryMobile ${mobileSubset.length * 1.75}s linear infinite`,
											transform: 'translate3d(0, 0, 0)',
											willChange: 'transform'
										}}
									>
										{[...mobileSubset, ...mobileSubset].map((src, i) => (
											<div key={i} className="relative min-w-[220px] max-w-sm rounded-3xl overflow-hidden shadow-lg h-60 flex items-center justify-center border border-white/10 bg-transparent">
												<Image 
													src={src} 
													alt={`Gallery photo ${(i % mobileSubset.length) + 1}`} 
													width={220}
													height={240}
													quality={60}
													sizes="220px"
													loading="eager"
													style={{ objectFit: 'cover', width: '100%', height: '100%' }}
													onError={(e) => {
														const img = e.currentTarget as HTMLImageElement;
														if (img.src.endsWith('.webp')) {
															img.src = img.src.replace('.webp', '.jpg');
														} else {
															img.style.display = 'none';
														}
													}}
												/>
											</div>
										))}
									</div>
									<div className="noise-overlay" />
									<div className="pane-inner-frame" />
									<div className="pane-glare" />
									<div className="pane-bottom-highlight" />
								</div>
							</GlassCard>
						</section>
					</div>
				</section>
				{/* Wide Video Window (hidden on desktop) */}
				<section className="py-4 sm:py-8 lg:hidden">
					<div className="max-w-7xl mx-auto px-8">
						<GlassCard className="relative overflow-hidden p-0 rounded-3xl" withShadow withEdgeGlow>
							<video
								src="/Wide2.mov"
								playsInline
								autoPlay
								loop
								muted
								className="w-full h-auto block"
								style={{ display: 'block' }}
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
						{/* Reviews Image Grid - 2x2 on mobile, 4x4 on desktop */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							{reviewImages.map((imageSrc, i) => (
								<div key={i} className="relative py-2">
									<Image 
										src={imageSrc} 
										alt={`Customer review ${i + 1}`} 
										width={800}
										height={800}
										sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
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

			{/* Hidden Cal.com trigger button */}
			<button
				id="cal-trigger-button"
				data-cal-link="curatedcleanings/firstclean"
				data-cal-namespace="firstclean"
				data-cal-config='{"layout":"month_view","theme":"light"}'
				style={{ display: 'none' }}
				aria-hidden="true"
			>
				Hidden Cal Trigger
			</button>

		</div>
	);
}
